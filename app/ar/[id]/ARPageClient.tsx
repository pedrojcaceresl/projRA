// app/ar/[id]/ARPageClient.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "@google/model-viewer"; // registra el web component en cliente
import { ArrowLeft } from "lucide-react";

interface ARPageClientProps {
	id: string;
}

export default function ARPageClient({ id }: ARPageClientProps) {
	const [cameraPermission, setCameraPermission] = useState<boolean | null>(
		null
	);
	const [isLoading, setIsLoading] = useState(true);
	const modelSrc = `/models/${id}.fbx`;

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
			navigator.mediaDevices
				.getUserMedia({ video: true })
				.then(() => setCameraPermission(true))
				.catch(() => setCameraPermission(false));
		}, 1500);
		return () => clearTimeout(timer);
	}, []);

	return (
		<main className="h-screen w-screen flex flex-col bg-black">
			{/* Header */}
			<div className="bg-black bg-opacity-50 p-4 flex justify-between items-center z-10">
				<Link
					href={`/model/${id}`}
					className="text-white flex items-center"
				>
					<ArrowLeft className="mr-2" size={20} />
					<span>Salir de AR</span>
				</Link>
				<div className="text-white font-medium">Modo AR</div>
			</div>

			<div className="flex-1 relative">
				{isLoading && (
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="text-white text-center">
							<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mb-4" />
							<p>Cargando experiencia AR...</p>
						</div>
					</div>
				)}

				{cameraPermission === false && !isLoading && (
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="text-white text-center p-6 bg-red-900 bg-opacity-80 rounded-lg max-w-md">
							<p className="mb-4">
								Se requiere acceso a la cámara para la
								experiencia AR.
							</p>
							<button
								className="px-4 py-2 bg-white text-red-900 rounded-md font-medium"
								onClick={() => window.location.reload()}
							>
								Reintentar
							</button>
						</div>
					</div>
				)}

				{cameraPermission === true && !isLoading && (
					<model-viewer
						src={modelSrc}
						alt="Modelo 3D para AR"
						ar
						ar-modes="webxr scene-viewer quick-look"
						camera-controls
						auto-rotate
						style={{ width: "100%", height: "100%" }}
					>
						<div className="absolute inset-0 flex items-center justify-center text-white">
							Tu navegador no soporta AR.
						</div>
					</model-viewer>
				)}

				{cameraPermission === null && !isLoading && (
					<div className="absolute inset-0 flex items-center justify-center">
						<p className="text-white">
							Solicitando permiso de cámara...
						</p>
					</div>
				)}
			</div>
		</main>
	);
}
