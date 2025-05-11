"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ARButton } from "three/examples/jsm/webxr/ARButton.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { Camera } from "lucide-react";

export default function ARCube({ modelId }: { modelId: string }) {
	const containerRef = useRef<HTMLDivElement>(null);
	const modelRef = useRef<THREE.Group | null>(null);

	const arButtonRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			70,
			window.innerWidth / window.innerHeight,
			0.01,
			20
		);


		const renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
		});
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.xr.enabled = true;

		if (containerRef.current) {
			containerRef.current.appendChild(renderer.domElement);
		}

		// ✅ Crear y personalizar el botón AR
		const arButton = ARButton.createButton(renderer, {
			requiredFeatures: ["hit-test"],
		});
		arButton.className =
			"px-6 py-2 bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition";
		arButton.textContent = "Ver en AR";

		// Lo insertamos donde tú controlas
		if (arButtonRef.current) {
			arButtonRef.current.innerHTML = ""; // por si se remonta
			arButtonRef.current.appendChild(arButton);
		}

		// Luces
		scene.add(new THREE.AmbientLight(0xffffff, 0.8));

		const directional = new THREE.DirectionalLight(0xffffff, 1);
		directional.position.set(3, 10, 2);
		scene.add(directional);

		scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 0.6));

		// Load modelo
		const loader = new GLTFLoader();
		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath(
			"https://www.gstatic.com/draco/versioned/decoders/1.5.7/"
		);
		loader.setDRACOLoader(dracoLoader);

		loader.load(`/models/${modelId}.glb`, (gltf) => {
			const model = gltf.scene;

			modelRef.current = model;

			// 🔍 Calcular tamaño del modelo
			const bbox = new THREE.Box3().setFromObject(model);
			const size = new THREE.Vector3();
			bbox.getSize(size);

			// 📐 Escala uniforme
			const maxDim = Math.max(size.x, size.y, size.z);
			const desiredSize = 1;
			const scaleFactor = desiredSize / maxDim;
			model.scale.setScalar(scaleFactor);

			// 📏 Volver a calcular bbox ya escalado
			bbox.setFromObject(model);

			// 🧱 Ajustar altura para que la base quede en Y=0
			const yOffset = bbox.min.y;
			model.position.set(0, -yOffset, -0.9); // Y corregido, Z hacia cámara

			// 🎨 Material personalizado
			model.traverse((node: any) => {
				if (node.isMesh) {
					node.geometry.computeVertexNormals();
					node.material = new THREE.MeshPhysicalMaterial({
						color: new THREE.Color("#aa6f52"),
						emissive: new THREE.Color("#33060b"),
						emissiveIntensity: 0.2,
						metalness: 0.2,
						roughness: 0.5,
						clearcoat: 0.2,
						clearcoatRoughness: 0.1,
						transmission: 0.4,
						thickness: 0.5,
						ior: 1.3,
						specularIntensity: 1.0,
						specularColor: new THREE.Color("#ffffff"),
					});
					node.castShadow = true;
					node.receiveShadow = true;
				}
			});

			scene.add(model);
		});


		// 📱 Rotación touch
		let lastX = 0;
		const onTouchStart = (e: TouchEvent) => {
			lastX = e.touches[0].clientX;
		};
		const onTouchMove = (e: TouchEvent) => {
			if (!modelRef.current) return;
			const deltaX = e.touches[0].clientX - lastX;
			modelRef.current.rotation.y += deltaX * 0.005;
			lastX = e.touches[0].clientX;
		};

		window.addEventListener("touchstart", onTouchStart);
		window.addEventListener("touchmove", onTouchMove);

		renderer.setAnimationLoop(() => {
			renderer.render(scene, camera);
		});

		return () => {
			renderer.dispose();
			if (containerRef.current?.firstChild) {
				containerRef.current.removeChild(renderer.domElement);
			}
		};
	}, [modelId]);

	return (
		<button className="px-4 relative py-2 w-1/3 flex items-end justify-end">
			<Camera className="mr-2" size={16} />
			<div
				ref={arButtonRef}
				className="absolute bottom-0 left-1/2 translate-y-5"
			/>
		</button>
	);
}
