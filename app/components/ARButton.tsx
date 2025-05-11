"use client";

import { useXR } from "@react-three/xr";
import { useEffect, useState } from "react";

export function ARButton({ children, className = "", sessionInit = {} }) {
	const { isPresenting, toggleSession } = useXR();
	const [isSupported, setIsSupported] = useState(false);

	useEffect(() => {
		if (typeof navigator !== "undefined" && navigator.xr) {
			navigator.xr
				.isSessionSupported("immersive-ar")
				.then((supported) => {
					setIsSupported(supported);
				});
		}
	}, []);

	if (!isSupported) return null;

	return (
		<button
			className={className}
			onClick={() => toggleSession()}
			aria-label={isPresenting ? "Exit AR" : "Enter AR"}
		>
			{children}
		</button>
	);
}
