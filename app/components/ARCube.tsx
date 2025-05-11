"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ARButton } from "three/examples/jsm/webxr/ARButton.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

export default function ARCube({ modelId: string}: { modelId: string}) {
	const containerRef = useRef<HTMLDivElement>(null);

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

		// Add AR Button
		document.body.appendChild(
			ARButton.createButton(renderer, { requiredFeatures: ["hit-test"] })
		);

		// Add a simple cube
		const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
		const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
		const cube = new THREE.Mesh(geometry, material);
		cube.position.set(0, 0, -0.5); // half meter in front
		// scene.add(cube);

		// Light

		const ambient = new THREE.AmbientLight(0xffffff, 1.2);
		scene.add(ambient);

		const spotLight = new THREE.SpotLight(0x771a44, 1, 0.6, 0.3, 0.2);
		scene.add(spotLight);

		const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
		dirLight.position.set(5, 10, 2);
		dirLight.castShadow = true;
		scene.add(dirLight);

		const point = new THREE.PointLight(0xffffff, 0.4, 10);
		point.position.set(-3, 2, 1);
		scene.add(point);

		const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
		scene.add(hemiLight);

		// Crear el loader GLTF y asignar el DRACOLoader
		const loader = new GLTFLoader();

		// Crear el loader de Draco
		const dracoLoader = new DRACOLoader();
		// Establecer la ruta a los decodificadores Draco (usa los oficiales de Three.js o los tuyos)
		dracoLoader.setDecoderPath(
			"https://www.gstatic.com/draco/versioned/decoders/1.5.7/"
		);

		loader.setDRACOLoader(dracoLoader);

		loader.load("/models/cerebellum.glb", (gltf) => {
			const model = gltf.scene;
			model.scale.set(118, 118, 118); // Ajusta según el modelo
			model.position.set(0, 0, -0.5);
			scene.add(model);
		});

		// Animate
		const animate = () => {
			renderer.setAnimationLoop(() => {
				cube.rotation.y += 0.01;
				renderer.render(scene, camera);
			});
		};

		scene.traverse((node: any) => {
			if (node.isMesh) {
				node.geometry.computeVertexNormals();
				node.material = new THREE.MeshPhysicalMaterial({
					color: new THREE.Color("#aa6f52"), // rosa más saturado
					emissive: new THREE.Color("#33060b"), // leve “brillo interno”
					emissiveIntensity: 0.2,
					metalness: 0.2,
					roughness: 0.5,
					clearcoat: 0.2, // capa de brillo superior
					clearcoatRoughness: 0.1,
					transmission: 0.4, // algo de translucidez
					thickness: 0.5, // grosor para la transmisión
					ior: 1.3, // índice de refracción orgánico
					specularIntensity: 1.0,
					specularColor: new THREE.Color("#ffffff"),
				});
				node.castShadow = true;
				node.receiveShadow = true;
			}
		});

		animate();

		return () => {
			renderer.dispose();
		};
	}, []);

	return <div ref={containerRef} />;
}
