"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Html } from "@react-three/drei";
import * as THREE from "three";

interface ModelViewerProps {
	modelId: string;
	onSelectPart: (partId: string) => void;
}
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";





const paths: Record<string, string> = {
	cerebellum: "/models/cerebellum.fbx",
	// aquí podrías añadir más rutas:
	// frontal: "/models/Zfrontal_high.fbx",
	// temporal: "/models/ZTemporal_high.fbx",
	// …
};

export function BrainModel({
	onSelectPart,
	modelId,
}: {
	onSelectPart: (partId: string) => void;
	modelId: string;
}) {
	// En un caso real, cargaríamos el modelo GLB del cerebro
	// const { nodes, materials } = useGLTF('/models/brain2.glb')

	// Usamos un modelo de ejemplo para la demostración
	// const { scene } = useGLTF("/assets/models/cerebellum.fbx");
	const brainRef = useRef<THREE.Group>(null);

	// Paleta de rosas suaves
	const pinkTones = [
		new THREE.Color("#ffe4e1"),
		new THREE.Color("#ffc1cc"),
		new THREE.Color("#ff9aa2"),
		new THREE.Color("#ff6f91"),
	];

	console.log("MODEL IDDD", modelId);

	const scene = useLoader(FBXLoader, `/models/${modelId}.fbx`);

	// scene.traverse((node) => {
	// 	if (node.isMesh) {
	// 		 console.log({
	// 				name: node.name,
	// 				position: node.position,
	// 				rotation: node.rotation,
	// 				scale: node.scale,
	// 			});
	// 	}
	// })

	// scene.traverse((node: any) => {
	// 	if (node.isMesh) {
	// 		console.log("mesh:", node.name);
	// 		// recalcula normales
	// 		node.geometry.computeVertexNormals();
	// 		// reemplaza el material por uno estándar
	// 		node.material = new THREE.MeshStandardMaterial({
	// 			map: (node.material as any).map || null,
	// 			envMapIntensity: 1,
	// 			metalness: 0.3,
	// 			roughness: 0.7,
	// 		});
	// 		node.castShadow = true;
	// 		node.receiveShadow = true;
	// 	}
	// });

	useEffect(() => {
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
	}, [scene]);

	// Colores para las diferentes partes del cerebro
	const brainColors = {
		frontal: new THREE.Color("#ff5252"),
		parietal: new THREE.Color("#4caf50"),
		temporal: new THREE.Color("#2196f3"),
		occipital: new THREE.Color("#ff9800"),
		cerebellum: new THREE.Color("#9c27b0"),
	};

	useFrame((state) => {
		if (brainRef.current) {
			// Animación suave de rotación
			brainRef.current.rotation.y =
				Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
		}
	});

	// Simulamos las partes del cerebro con esferas de colores
	return (
		<group ref={brainRef} position={[2, 12, 0]} scale={2}>
			{/* En un caso real, renderizaríamos las partes del modelo del cerebro */}
			{/* Por ahora, usamos el modelo de pato como placeholder */}
			<primitive object={scene} scale={4} position={[0, -5, 0]} />

			{/* Hotspots interactivos para las partes del cerebro */}

			<Html position={[-0.48482662439346313, 0.5995873808860779, 0]}>
				<div
					className="w-6 h-6 rounded-full bg-green-500 cursor-pointer flex items-center justify-center text-white text-xs font-bold border-2 border-white"
					onClick={() => onSelectPart("cerebellum")}
				>
					"Cerebellum"
				</div>
			</Html>

			<Html position={[0.3999999761581421, 0.8499999642372131, 0]}>
				<div
					className="w-3 h-3 rounded-full bg-red-500 cursor-pointer flex items-center justify-center text-white text-xs font-bold border-2 border-white"
					onClick={() => onSelectPart("parietal")}
				>
					""Cross_Section_X""
				</div>
			</Html>
		</group>
	);
}

export default function ModelViewer({
	modelId,
	onSelectPart,
}: ModelViewerProps) {
	return (
		<Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
			<ambientLight intensity={1.2} />
			<spotLight
				intensity={1}
				position={[10, 10, 10]}
				angle={0.3}
				penumbra={0.2}
				castShadow
			/>
			<pointLight position={[-10, -10, -10]} />
			<color attach="background" args={["gray"]} />

			<BrainModel onSelectPart={onSelectPart} modelId={modelId} />

			{/* Otros modelos se renderizarían aquí basados en modelId */}

			<OrbitControls
				enablePan={true}
				enableZoom={true}
				enableRotate={true}
				minDistance={0.1}
				maxDistance={20}
			/>
			<Environment preset="sunset" />
		</Canvas>
	);
}
