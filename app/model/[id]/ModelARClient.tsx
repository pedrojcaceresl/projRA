"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import "@google/model-viewer";
import {
	ArrowLeft,
	Maximize,
	RotateCw,
	ZoomIn,
	ZoomOut,
	Camera,
} from "lucide-react";
import ModelViewer from "@/app/components/ModelViewer";
import ModelInfo from "@/app/components/ModelInfo";

import BrainParts from "../brain.model";
import ARViewer from "@/app/components/ARViewer";
import ARCube from "@/app/components/ARCube";

/**
 * Busca y devuelve el modelo cuyo id coincida.
 * @param id El identificador único del modelo.
 * @returns El objeto Model correspondiente, o undefined si no se encuentra.
 */
export function getModelById(id: string) {
	return BrainParts.find((m) => m.id === id);
}


type Params = { id: string };

export default function ModelARClient({ id }: { id: string }) {

	const [model, setModel] = useState<{}>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setModel(getModelById(id));
		setLoading(false);
	});

	const [selectedPart, setSelectedPart] = useState<string | null>(null);
	const [isARMode, setIsARMode] = useState(false);

	const handlePartSelect = (partId: string) => setSelectedPart(partId);

	return (
		<main className="container mx-auto px-4 py-6">
			{/* Header */}
			<div className="flex items-center mb-6">
				<Link
					href="/"
					className="flex items-center text-indigo-600 hover:text-indigo-800"
				>
					<ArrowLeft className="mr-2" size={20} />
					<span>Volver a la galería</span>
				</Link>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* VISOR 3D / AR */}
				<div className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
					<div className="relative h-[500px] w-full">
						{!isARMode ? (
							// Tu componente R3F normal
							<ModelViewer
								modelId={id}
								onSelectPart={handlePartSelect}
							/>
						) : (
							// model-viewer para AR
							// <model-viewer
							// 	src={src}
							// 	alt="Modelo 3D en AR"
							// 	ar
							// 	ar-modes="webxr scene-viewer quick-look"
							// 	camera-controls
							// 	auto-rotate
							// 	style={{ width: "100%", height: "100%" }}
							// >
							// 	{/* Texto del botón AR */}
							// 	<button
							// 		slot="ar-button-label"
							// 		className="px-4 py-2 bg-indigo-600 text-white rounded"
							// 	>
							// 		Ver en mi espacio
							// 	</button>
							// 	{/* Fallback si no soporta AR */}
							// 	<div className="absolute inset-0 flex items-center justify-center text-white">
							// 		Tu navegador no soporta AR.
							// 	</div>
							// </model-viewer>
							<div></div>

							// <ARViewer modelId={id} getModelPath={getFbxPath} />
						)}
					</div>

					{/* Controles */}
					<div className="p-4 border-t flex flex-wrap justify-between items-center">
						<div className="flex space-x-2 mb-2 sm:mb-0">
							<button className="p-2 rounded-full hover:bg-gray-100">
								<RotateCw size={20} />
							</button>
							<button className="p-2 rounded-full hover:bg-gray-100">
								<ZoomIn size={20} />
							</button>
							<button className="p-2 rounded-full hover:bg-gray-100">
								<ZoomOut size={20} />
							</button>
							<button className="p-2 rounded-full hover:bg-gray-100">
								<Maximize size={20} />
							</button>
						</div>

						<ARCube modelId={id} />
					</div>
				</div>

				{/* PANEL INFO */}
				{!loading && (
					<div className="bg-white rounded-lg shadow-md p-4">
						<h1 className="text-2xl font-bold mb-4">
							{model.name}
						</h1>
						{/* <p className="text-gray-600 mb-6">
							Explora las diferentes partes del cerebro humano.
							Selecciona una región para obtener más información.
						</p> */}

						<p className="text-gray-600">{model.overview}</p>
						<br />
						<h2 className="text-lg font-semibold mb-2">
							Funciones
						</h2>
						<hr />
						<ul className="list-disc">
							{model.functions.map((func) => {
								return (
									<li key={func} className="text-gray-600">{func}</li>
								);
							})}
						</ul>
						<br />
						<h2 className="text-lg font-semibold mb-2">
							Ubicación
						</h2>
						<hr />
						<p className="text-gray-600 mb-6">{model.location}</p>
						{/* <div className="mb-6">
					<h2 className="text-lg font-semibold mb-2">
						Partes Interactivas
					</h2>
					<div className="space-y-2">
						{[
							{ id: "frontal", name: "Lóbulo Frontal" },
							{ id: "parietal", name: "Lóbulo Parietal" },
							{ id: "temporal", name: "Lóbulo Temporal" },
							{ id: "occipital", name: "Lóbulo Occipital" },
							{ id: "cerebellum", name: "Cerebelo" },
						].map((part) => (
							<button
								key={part.id}
								onClick={() => handlePartSelect(part.id)}
								className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
									selectedPart === part.id
										? "bg-indigo-100 text-indigo-700 font-medium"
										: "hover:bg-gray-100"
								}`}
							>
								{part.name}
							</button>
						))}
					</div>
				</div> */}
						{/* {selectedPart && <ModelInfo partId={selectedPart} />} */}
					</div>
				)}
			</div>
		</main>
	);
}
