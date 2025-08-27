"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ARButton } from "three/examples/jsm/webxr/ARButton.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

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
		arButton.style.cssText = "";
		arButton.className = "";

		arButton.className =
			"px-4 text-sm bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition h-12";
		arButton.textContent = "Ver en AR";
		arButton.innerHTML = "Vern en AR";
		arButton.innerText = "Ver en AR";

		arButton.style.setProperty("background-color", "#2563eb", "important");
		arButton.style.setProperty("color", "#fff", "important");
		arButton.style.setProperty("height", "2.7rem", "important");

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

		loader.load(`/models/${modelId}_draco.glb`, (gltf) => {
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
		let initialPinchDistance = 0;
		let initialScale = 1;

		const onTouchStart = (e: TouchEvent) => {
			if (e.touches.length === 2 && modelRef.current) {
				// arrancamos un pinch
				const dx = e.touches[0].clientX - e.touches[1].clientX;
				const dy = e.touches[0].clientY - e.touches[1].clientY;
				initialPinchDistance = Math.hypot(dx, dy);
				// guardamos la escala actual
				initialScale = modelRef.current.scale.x;
			} else if (e.touches.length === 1) {
				// arrancamos rotación
				lastX = e.touches[0].clientX;
			}
		};
		const onTouchMove = (e: TouchEvent) => {
			if (!modelRef.current) return;

			if (e.touches.length === 2) {
				// pinch-to-zoom
				const dx = e.touches[0].clientX - e.touches[1].clientX;
				const dy = e.touches[0].clientY - e.touches[1].clientY;
				const distance = Math.hypot(dx, dy);
				const scaleFactor = distance / initialPinchDistance;
				modelRef.current.scale.setScalar(initialScale * scaleFactor);
			} else if (e.touches.length === 1) {
				// rotación horizontal
				const deltaX = e.touches[0].clientX - lastX;
				modelRef.current.rotation.y += deltaX * 0.01;
				lastX = e.touches[0].clientX;
			}
		};

		window.addEventListener("touchstart", onTouchStart);
		window.addEventListener("touchmove", onTouchMove);

		renderer.setAnimationLoop(() => {
			renderer.render(scene, camera);
		});

		return () => {
			window.removeEventListener("touchstart", onTouchStart);
			window.removeEventListener("touchmove", onTouchMove);
			renderer.dispose();
			if (containerRef.current?.firstChild) {
				containerRef.current.removeChild(renderer.domElement);
			}
		};
	}, [modelId]);

	return (
		<button className="px-4 relative py-2 w-1/3 flex items-end justify-end">
			{/* <Camera className="mr-2" size={16} /> */}
			<div
				ref={arButtonRef}
				className="absolute bottom-0 translate-y-3"
			/>
		</button>
	);
}
