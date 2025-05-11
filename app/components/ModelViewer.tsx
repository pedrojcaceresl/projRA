"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment, Html } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface ModelViewerProps {
	modelId: string;
	onSelectPart: (partId: string) => void;
}

export function BrainModel({
	onSelectPart,
	modelId,
}: {
	onSelectPart: (partId: string) => void;
	modelId: string;
}) {
	const gltf = useLoader(GLTFLoader, `/models/${modelId}.glb`);
	const modelRef = useRef<THREE.Group>(null);

	// 🚨 Ajusta esta escala para modelos pequeños. Prueba valores como 10, 20, 50 según el caso
	const SCALE = 750;

	useEffect(() => {
		gltf.scene.traverse((node: any) => {
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
	}, [gltf]);

	useFrame((state) => {
		if (modelRef.current) {
			modelRef.current.rotation.y =
				Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
		}
	});

	return (
		<group
			ref={modelRef}
			position={[0, 0, 0]}
			scale={[SCALE, SCALE, SCALE]}
		>
			<primitive object={gltf.scene} />

			{/* Hotspot: Cerebellum */}
			{/* <Html position={[-0.5, 1, 0]}>
				<div
					className="w-6 h-6 rounded-full bg-green-500 cursor-pointer flex items-center justify-center text-white text-xs font-bold border-2 border-white"
					onClick={() => onSelectPart("cerebellum")}
				>
					Cerebellum
				</div>
			</Html> */}

			{/* Hotspot: Cross Section X */}
			{/* <Html position={[0.4, 1.2, 0]}>
				<div
					className="w-3 h-3 rounded-full bg-red-500 cursor-pointer flex items-center justify-center text-white text-xs font-bold border-2 border-white"
					onClick={() => onSelectPart("parietal")}
				>
					X
				</div>
			</Html> */}
		</group>
	);
}

export default function ModelViewer({
	modelId,
	onSelectPart,
}: ModelViewerProps) {
	return (
		<Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
			<ambientLight intensity={1.2} />
			<spotLight
				intensity={1}
				position={[10, 10, 10]}
				angle={0.3}
				penumbra={0.2}
				castShadow
			/>
			<pointLight position={[-10, -10, -10]} />
			{/* <color attach="background" args={["gray"]} /> */}

			<BrainModel onSelectPart={onSelectPart} modelId={modelId} />

			<OrbitControls
				enablePan
				enableZoom
				enableRotate
				minDistance={0.1}
				maxDistance={20}
			/>
			<Environment preset="sunset" />
		</Canvas>
	);
}
