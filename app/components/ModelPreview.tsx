"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

interface ModelPreviewProps {
  modelId: string
}

export default function ModelPreview({ modelId }: ModelPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
		if (!containerRef.current) return;

		const scene = new THREE.Scene();

		// Configuración de cámara
		const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
		camera.position.z = 5;

		// Configuración de renderizado
		const renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
		});
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(160, 160);
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		containerRef.current.appendChild(renderer.domElement);

		let model: THREE.Object3D;

		const pivot = new THREE.Group();
		scene.add(pivot);

		// 2) Desactiva la rotación automática de OrbitControls
		const controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.dampingFactor = 0.25;
		controls.enableZoom = true;
		controls.autoRotate = true; // ¡OJO!
		controls.enableRotate = true; // permitir drag manual (si lo quieres)

		// Iluminación de la escena
		scene.add(new THREE.AmbientLight(0xffffff, 0.8)); // Luz ambiental
		const directional = new THREE.DirectionalLight(0xffffff, 1); // Luz direccional
		directional.position.set(3, 10, 2);
		scene.add(directional);

		scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 0.6)); // Luz hemisférica

		// Cargar el modelo 3D
		const loader = new GLTFLoader();

		loader.load(
			`/models/${modelId}.glb`,
			(gltf) => {
				model = gltf.scene;

				// Reemplazar material con un color específico
				model.traverse((child) => {
					if ((child as THREE.Mesh).isMesh) {
						const mesh = child as THREE.Mesh;
						mesh.material = new THREE.MeshStandardMaterial({
							color: "#aa6f52", // Color personalizado
							metalness: 0.3,
							roughness: 0.7,
						});
						mesh.castShadow = true;
						mesh.receiveShadow = true;
					}
				});

        const box = new THREE.Box3().setFromObject(model);
		    const center = box.getCenter(new THREE.Vector3());
	    	model.position.sub(center); // ahora el “centro geométrico” está en (0,0,0)
  		  model.scale.setScalar(5 / box.getSize(new THREE.Vector3()).length());
        
			
        
        scene.add(new THREE.AmbientLight(0xffffff, 0.8));
				const directional = new THREE.DirectionalLight(0xffffff, 1);
				directional.position.set(3, 10, 2);
				scene.add(directional);

				scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 0.6));
				const pointLight = new THREE.PointLight(0xff0000, 1, 10); // Reducida a 1 para una iluminación más suave
				pointLight.position.set(0, 5, 5);
				scene.add(pointLight);

				// scene.add(model)
				pivot.add(model);
				controls.target.set(0, 0, 0);
			},
			undefined,
			(error) => {
				console.error("Error cargando el modelo:", error);
			}
		);

		// Animación
		const animate = () => {
			requestAnimationFrame(animate);

			pivot.rotation.y += 0.01;

			controls.update();
			renderer.render(scene, camera);
		};
		animate();

		// Cleanup
		return () => {
			renderer.dispose();
			if (containerRef.current) {
				containerRef.current.removeChild(renderer.domElement);
			}
		};
  }, [modelId])

  return <div ref={containerRef} className="w-40 h-40" />
}
