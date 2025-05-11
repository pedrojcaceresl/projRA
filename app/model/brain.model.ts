import {
	Brain,
	Cpu,
	User,
	Eye,
	Compass,
	Activity,
	Music,
	Droplet,
} from "lucide-react";

const BrainParts = [
	{
		id: "cerebellum",
		name: "Cerebelo",
		description:
			"Región encargada de la coordinación motora y el equilibrio",
		path: "models/ZCerebellum_high.fbx",
		overview: "El cerebelo es la segunda estructura más grande del encéfalo y se sitúa bajo los hemisferios cerebrales.",
		location:
			"Parte posterior e inferior del cráneo, por debajo de los lóbulos occipitales.",
		functions: [
			"Coordinación fina de movimientos voluntarios",
			"Mantener postura y equilibrio",
			"Aprendizaje de patrones motores (memoria motora)",
		],
		anatomy: {
			lobes: [
				"Lóbulo anterior",
				"Lóbulo posterior",
				"Lóbulo floculonodular",
			],
			vermis: "Estructura media que conecta ambos hemisferios cerebelosos",
		},
		clinicalSignificance:
			"Lesiones pueden causar ataxia, temblor intencional y dificultades en el habla (disartria).",
		bloodSupply:
			"Arterias cerebelosas superior, anterior inferior y posterior inferior.",
		furtherReading: [
			{
				title: "Neuroanatomía del Cerebelo",
				url: "https://es.wikipedia.org/wiki/Cerebelo",
			},
		],
	},
	{
		id: "diencefalo",
		name: "Diencéfalo",
		description:
			"Incluye tálamo e hipotálamo, clave en procesamiento sensorial y regulación hormonal",
		path: "models/Zdiecefalo_high.fbx",
		overview:
			"El diencéfalo es la porción central del prosencéfalo, se encuentra entre los hemisferios cerebrales y el tronco encefálico.",
		location: "Profundo en el cerebro, justo encima del tronco cerebral.",
		components: ["Tálamo", "Hipotálamo", "Epitálamo", "Subtálamo"],
		functions: [
			"Relé de señales sensoriales entrantes (tálamo)",
			"Regulación de la temperatura corporal, hambre, sed y ciclo sueño-vigilia (hipotálamo)",
			"Control del sistema endocrino a través de la hipófisis",
		],
		clinicalSignificance:
			"Patologías: síndrome talámico, trastornos endocrinos, problemas de termorregulación.",
		bloodSupply: "Ramas de la arteria cerebral posterior.",
		furtherReading: [
			{
				title: "Diencéfalo y sus funciones",
				url: "https://es.wikipedia.org/wiki/Diencéfalo",
			},
		],
	},
	{
		id: "frontal",
		name: "Lóbulo Frontal",
		description:
			"Responsable del razonamiento, la planificación y el control motor voluntario",
		path: "models/Zfrontal_high.fbx",
		overview:
			"El lóbulo frontal es la región más anterior del cerebro y se asocia a funciones ejecutivas y personalidad.",
		location:
			"Parte anterior de cada hemisferio cerebral, por detrás de la frente.",
		functions: [
			"Toma de decisiones y resolución de problemas",
			"Control inhibitorio y regulación emocional",
			"Planificación y ejecución de movimientos (corteza motora primaria)",
		],
		anatomy: {
			gyri: [
				"Corteza motora primaria",
				"Área prefrontal dorsolateral",
				"Área de Broca",
			],
			sulci: ["Surco central", "Surco frontal superior"],
		},
		clinicalSignificance:
			"Dañ o en esta área causa cambios de personalidad, dificultad para planificar y parálisis motora parcial.",
		bloodSupply: "Arterias cerebrales anterior y media.",
		furtherReading: [
			{
				title: "Lóbulo frontal en neurología",
				url: "https://es.wikipedia.org/wiki/Lóbulo_frontal",
			},
		],
	},
	{
		id: "occipital",
		name: "Lóbulo Occipital",
		description:
			"Centro principal de procesamiento de la información visual",
		path: "models/ZOccipital_high.fbx",
		overview:
			"El lóbulo occipital se sitúa en la parte posterior del cerebro y procesa estímulos visuales.",
		location:
			"Región posterior de cada hemisferio cerebral, cerca de la nuca.",
		functions: [
			"Interpretación de formas, colores y movimiento",
			"Integración de la información visual con otras áreas corticales",
		],
		anatomy: {
			areas: ["Área visual primaria (V1)", "V2, V3, V4 asociativas"],
		},
		clinicalSignificance:
			"Lesiones provocan ceguera cortical, alucinaciones y distorsiones de la percepción visual.",
		bloodSupply: "Arteria cerebral posterior.",
		furtherReading: [
			{
				title: "Procesamiento visual en el lóbulo occipital",
				url: "https://es.wikipedia.org/wiki/Lóbulo_occipital",
			},
		],
	},
	{
		id: "parietal",
		name: "Lóbulo Parietal",
		description: "Integra información táctil, espacial y somatosensorial",
		path: "models/ZParietal_high.fbx",
		overview:
			"El lóbulo parietal se ubica entre los lóbulos frontal y occipital, y procesa sensaciones corporales.",
		location:
			"Parte superior media de cada hemisferio, detrás del surco central.",
		functions: [
			"Percepción táctil y propiocepción",
			"Coordinación ojo-mano",
			"Reconocimiento espacial y orientación",
		],
		anatomy: {
			gyri: [
				"Giro postcentral",
				"Lóbulo parietal superior",
				"Lóbulo parietal inferior",
			],
		},
		clinicalSignificance:
			"Daño produce síndrome de negligencia espacial, apraxia y agnosia táctil.",
		bloodSupply: "Arteria cerebral media.",
		furtherReading: [
			{
				title: "Lóbulo parietal y funciones sensoriales",
				url: "https://es.wikipedia.org/wiki/Lóbulo_parietal",
			},
		],
	},
	{
		id: "tallo",
		name: "Tallo Cerebral",
		description:
			"Conecta el cerebro con la médula espinal y regula funciones vitales como la respiración",
		path: "models/Ztallo_high.fbx",
		overview:
			"El tallo cerebral incluye mesencéfalo, protuberancia y bulbo raquídeo.",
		location: "Base del cráneo, justo debajo del diencéfalo.",
		functions: [
			"Control de la respiración y ritmo cardíaco",
			"Reflejos primitivos (tos, náusea)",
			"Vías de paso para fibras motoras y sensoriales",
		],
		anatomy: {
			parts: ["Mesencéfalo", "Protuberancia anular", "Bulbo raquídeo"],
		},
		clinicalSignificance:
			"Lesiones pueden ser fatales: alteraciones respiratorias, rigidez y coma.",
		bloodSupply: "Arterias vertebrales y basilar.",
		furtherReading: [
			{
				title: "Tallo cerebral en neurología",
				url: "https://es.wikipedia.org/wiki/Tallo_encefálico",
			},
		],
	},
	{
		id: "temporal",
		name: "Lóbulo Temporal",
		description:
			"Involucrado en la memoria, el lenguaje y el procesamiento auditivo",
		path: "models/ZTemporal_high.fbx",
		overview:
			"El lóbulo temporal se sitúa bajo los lóbulos parietal y frontal, cerca de las orejas.",
		location: "Región lateral de cada hemisferio, justo sobre el oído.",
		functions: [
			"Procesamiento de sonidos y comprensión del lenguaje (área de Wernicke)",
			"Formación y recuperación de la memoria (hipocampo)",
			"Reconocimiento de rostros (corteza fusiforme)",
		],
		anatomy: {
			gyri: [
				"Giro temporal superior",
				"Giro temporal medio",
				"Giro temporal inferior",
			],
		},
		clinicalSignificance:
			"Epilepsia del lóbulo temporal, amnesia y afasia de Wernicke.",
		bloodSupply: "Arteria cerebral media (ramas temporales).",
		furtherReading: [
			{
				title: "Funciones del lóbulo temporal",
				url: "https://es.wikipedia.org/wiki/Lóbulo_temporal",
			},
		],
	},
	{
		id: "ventricular",
		name: "Sistema Ventricular",
		description:
			"Cavidades cerebrales que contienen líquido cefalorraquídeo",
		path: "models/ZVentricular_high.fbx",
		overview:
			"Conjunto de ventrículos laterales, tercer y cuarto ventrículo interconectados.",
		location:
			"Distribuidos dentro de ambos hemisferios y el tronco encefálico.",
		functions: [
			"Protección mecánica y amortiguación del encéfalo",
			"Transporte de nutrientes y eliminación de desechos",
			"Mantenimiento de la presión intracraneal",
		],
		anatomy: {
			ventricles: [
				"Ventrículos laterales",
				"Tercer ventrículo",
				"Cuarto ventrículo",
			],
		},
		clinicalSignificance:
			"Hidrocefalia, quistes y hemorragias intraventriculares.",
		bloodSupply: "Plexos coroideos en cada ventrículo.",
		furtherReading: [
			{
				title: "Sistema ventricular del cerebro",
				url: "https://es.wikipedia.org/wiki/Líquido_cefalorraquídeo",
			},
		],
	},
];

export default BrainParts;
