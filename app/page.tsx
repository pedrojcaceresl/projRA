import Link from "next/link";
import ModelPreview from "./components/ModelPreview";

// Importamos los nuevos iconos semánticos
import {
	FaBalanceScale, // báscula → cerebelo
	FaFlask, // matraz   → diencéfalo
	FaLightbulb, // bombilla → lóbulo frontal
	FaEye, // ojo      → lóbulo occipital
	FaHandPaper, // mano     → lóbulo parietal
	FaHeartbeat, // pulso    → tallo cerebral
	FaTint, // gota     → sistema ventricular
	FaAssistiveListeningSystems, // ← icono de “oreja”
} from "react-icons/fa";

export default function HomePage() {
	const models = [
		{
			id: "cerebellum",
			name: "Cerebelo",
			description:
				"Región encargada de la coordinación motora y el equilibrio",
			path: "models/ZCerebellum_high.fbx",
			icon: <FaBalanceScale className="w-12 h-12 mb-2 text-indigo-600" />,
		},
		{
			id: "diencefalo",
			name: "Diencéfalo",
			description:
				"Incluye tálamo e hipotálamo, clave en procesamiento sensorial y regulación hormonal",
			path: "models/Zdiecefalo_high.fbx",
			icon: <FaFlask className="w-12 h-12 mb-2 text-yellow-600" />,
		},
		{
			id: "frontal",
			name: "Lóbulo Frontal",
			description:
				"Responsable del razonamiento, la planificación y el control motor voluntario",
			path: "models/Zfrontal_high.fbx",
			icon: <FaLightbulb className="w-12 h-12 mb-2 text-green-600" />,
		},
		{
			id: "occipital",
			name: "Lóbulo Occipital",
			description:
				"Centro principal de procesamiento de la información visual",
			path: "models/ZOccipital_high.fbx",
			icon: <FaEye className="w-12 h-12 mb-2 text-blue-600" />,
		},
		{
			id: "parietal",
			name: "Lóbulo Parietal",
			description:
				"Integra información táctil, espacial y somatosensorial",
			path: "models/ZParietal_high.fbx",
			icon: <FaHandPaper className="w-12 h-12 mb-2 text-teal-600" />,
		},
		{
			id: "tallo",
			name: "Tallo Cerebral",
			description:
				"Conecta el cerebro con la médula espinal y regula funciones vitales como la respiración",
			path: "models/Ztallo_high.fbx",
			icon: <FaHeartbeat className="w-12 h-12 mb-2 text-red-600" />,
		},
		{
			id: "temporal",
			name: "Lóbulo Temporal",
			description:
				"Involucrado en la memoria, el lenguaje y el procesamiento auditivo",
			path: "models/ZTemporal_high.fbx",
			icon: (
				<FaAssistiveListeningSystems className="w-12 h-12 mb-2 text-purple-600" />
			),
		},
		{
			id: "ventricular",
			name: "Sistema Ventricular",
			description:
				"Cavidades cerebrales que contienen líquido cefalorraquídeo",
			path: "models/ZVentricular_high.fbx",
			icon: <FaTint className="w-12 h-12 mb-2 text-cyan-600" />,
		},
	];

	return (
		<main className="container mx-auto px-4 py-8">
			<header className="mb-10 text-center">
				<h1 className="text-3xl font-bold mb-2">
					Explorador de Modelos 3D Educativos
				</h1>
				<p className="text-gray-600 max-w-2xl mx-auto">
					Selecciona un modelo para explorarlo en 3D o visualizarlo en
					realidad aumentada
				</p>
			</header>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{models.map((model) => (
					<Link
						href={`/model/${model.id}`}
						key={model.id}
						className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
					>
						<div className="p-4 text-center">
							<div className="flex justify-center">
								{model.icon}
							</div>
							<h2 className="text-xl font-semibold mb-2">
								{model.name}
							</h2>
							<p className="text-gray-600 text-sm mb-4">
								{model.description}
							</p>
							<div className="h-40 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
								<img
									src={`/assets/models_img/${model.id}.png`}
									alt=""
								/>
							</div>
						</div>
					</Link>
				))}
			</div>
		</main>
	);
}
