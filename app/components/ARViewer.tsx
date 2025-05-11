import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ARButton } from "three/examples/jsm/webxr/ARButton.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

interface ARViewerProps {
	modelId: string; // Identificador para seleccionar la ruta
	getModelPath: (id: string) => string; // Función que devuelve la ruta .fbx según el id
}

export default function ARViewer({ modelId, getModelPath }: ARViewerProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const experienceRef = useRef<any>(null);

	useEffect(() => {
		const exp: any = {};
		exp.container = document.createElement("div");

		// Cámara y escena
		exp.camera = new THREE.PerspectiveCamera(
			60,
			window.innerWidth / window.innerHeight,
			0.1,
			100
		);
		exp.camera.position.set(0, 1, 8);
		exp.scene = new THREE.Scene();

		// Iluminación
		exp.scene.add(new THREE.AmbientLight(0xffffff, 0.6));
		const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
		dirLight.position.set(5, 10, 2);
		dirLight.castShadow = true;
		exp.scene.add(dirLight);
		const point = new THREE.PointLight(0xffffff, 0.4, 10);
		point.position.set(-3, 2, 1);
		exp.scene.add(point);
		exp.scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1));

		// Renderer
		exp.renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
		});
		exp.renderer.setPixelRatio(window.devicePixelRatio);
		exp.renderer.setSize(window.innerWidth, window.innerHeight);
		exp.renderer.xr.enabled = true;
		exp.container.appendChild(exp.renderer.domElement);

		// Loader FBX
		exp.loader = new FBXLoader();

		// Inicializa escena y modelo
		exp.initScene = () => {
			if (!containerRef.current) return;
			containerRef.current.appendChild(exp.container);

			const path = getModelPath(modelId);
			exp.loader.load(
				path,
				(object) => {
					object.scale.set(0.01, 0.01, 0.01);
					exp.model = object;
					exp.scene.add(exp.model);
				},
				(xhr) =>
					console.log(
						`Cargando modelo ${modelId}: ${(
							(xhr.loaded / xhr.total) *
							100
						).toFixed(1)}%`
					),
				(err) => console.error("Error cargando FBX:", err)
			);
		};

		// Configura AR
		exp.setupARExperience = () => {
			const controller = exp.renderer.xr.getController(0);
			exp.scene.add(controller);
			controller.addEventListener("select", () => {
				if (exp.model) {
					exp.model.position
						.set(0, 0, -0.5)
						.applyMatrix4(controller.matrixWorld);
					exp.model.quaternion.setFromRotationMatrix(
						controller.matrixWorld
					);
				}
			});
			exp.container.appendChild(ARButton.createButton(exp.renderer));
			exp.renderer.setAnimationLoop(exp.render);
		};

		// Ajuste de tamaño
		exp.resize = () => {
			if (!containerRef.current) return;
			const { clientWidth: w, clientHeight: h } = containerRef.current;
			exp.renderer.setSize(w, h);
			exp.camera.aspect = w / h;
			exp.camera.updateProjectionMatrix();
		};

		// Render loop
		exp.render = () => exp.renderer.render(exp.scene, exp.camera);

		// Limpieza
		exp.cleanUp = () => {
			exp.scene.traverse((obj: any) => {
				obj.geometry?.dispose();
				if (obj.material) {
					Array.isArray(obj.material)
						? obj.material.forEach((m: any) => m.dispose())
						: obj.material.dispose();
				}
			});
			exp.renderer.dispose();
			if (containerRef.current) {
				containerRef.current.removeChild(exp.container);
			}
			window.removeEventListener("resize", exp.resize);
		};

		experienceRef.current = exp;
		exp.initScene();
		exp.setupARExperience();
		window.addEventListener("resize", exp.resize);

		return () => {
			exp.cleanUp();
		};
	}, [modelId, getModelPath]);

	return <div ref={containerRef} className="container3D w-full h-full" />;
}
