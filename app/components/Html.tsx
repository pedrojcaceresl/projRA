"use client";

import { useRef, useState, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Html({
	children,
	position = [0, 0, 0],
	center = false,
	distanceFactor = 10,
	...props
}) {
	const { camera, scene } = useThree();
	const ref = useRef();
	const [isOccluded, setOccluded] = useState(false);
	const [isInFrustum, setFrustum] = useState(true);
	const [calculatedPosition] = useState(() => new THREE.Vector3());
	const [target] = useState(() => new THREE.Vector3());
	const [xAxis] = useState(() => new THREE.Vector3());
	const [yAxis] = useState(() => new THREE.Vector3());
	const [size] = useState(() => new THREE.Vector2());

	const vec = calculatedPosition.set(...position);
	const frameLoop = useFrame(() => {
		if (!ref.current) return;

		// Check if in frustum
		if (calculatedPosition.distanceToSquared(camera.position) > 100) {
			if (isInFrustum) setFrustum(false);
		} else if (!isInFrustum) setFrustum(true);

		// Get camera position
		camera.updateMatrixWorld();
		vec.copy(position);
		vec.applyMatrix4(ref.current.parent.matrixWorld);
		vec.project(camera);

		// Set position
		const widthHalf = size.x / 2;
		const heightHalf = size.y / 2;
		target.set(
			vec.x * widthHalf + widthHalf,
			-(vec.y * heightHalf) + heightHalf,
			0
		);

		// Adjust distance
		const factor = distanceFactor / vec.z;
		if (ref.current) {
			ref.current.style.transform = `translate3d(${target.x}px,${
				target.y
			}px,0) scale(${factor < 0 ? 0 : factor})`;
			ref.current.style.display =
				isInFrustum && !isOccluded ? "block" : "none";
		}
	});

	useEffect(() => {
		if (typeof document !== "undefined") {
			const { current } = ref;
			if (current) {
				current.style.position = "absolute";
				current.style.transform = `translate3d(0,0,0)`;
				current.style.transformStyle = "preserve-3d";
				if (center) {
					current.style.left = "50%";
					current.style.top = "50%";
					current.style.transform = `translate3d(-50%,-50%,0)`;
				}
			}
		}
	}, [center]);

	useEffect(() => {
		if (typeof document !== "undefined") {
			size.set(window.innerWidth, window.innerHeight);
			window.addEventListener("resize", () =>
				size.set(window.innerWidth, window.innerHeight)
			);
		}
		return () => {
			if (typeof document !== "undefined") {
				window.removeEventListener("resize", () =>
					size.set(window.innerWidth, window.innerHeight)
				);
			}
		};
	}, [size]);

	return (
		<group {...props} ref={ref}>
			<div className="html-content">{children}</div>
		</group>
	);
}
