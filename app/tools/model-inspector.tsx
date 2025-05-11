"use client"

import { useState, useRef } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"
import type * as THREE from "three"

export default function ModelInspector() {
  const [coordinates, setCoordinates] = useState<THREE.Vector3 | null>(null)
  const [points, setPoints] = useState<THREE.Vector3[]>([])
  const [pointLabels, setPointLabels] = useState<string[]>([])
  const [currentLabel, setCurrentLabel] = useState<string>("")

  const handleAddPoint = () => {
    if (coordinates && currentLabel) {
      setPoints([...points, coordinates])
      setPointLabels([...pointLabels, currentLabel])
      setCurrentLabel("")
    }
  }

  const handleExportPoints = () => {
    const pointsData = points.map((point, index) => ({
      id: pointLabels[index] || `point_${index}`,
      position: [point.x, point.y, point.z],
    }))

    const jsonData = JSON.stringify(pointsData, null, 2)
    const blob = new Blob([jsonData], { type: "application/json" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "brain_points.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-white p-4 border-b">
        <h1 className="text-xl font-bold mb-2">Herramienta de Inspección de Modelo 3D</h1>
        <p className="text-gray-600 mb-4">
          Haz clic en cualquier parte del modelo para obtener sus coordenadas. Agrega un nombre y guarda el punto.
        </p>

        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Coordenadas actuales:</label>
            <div className="p-2 bg-gray-100 rounded min-w-[200px]">
              {coordinates ? (
                <span>
                  X: {coordinates.x.toFixed(3)}, Y: {coordinates.y.toFixed(3)}, Z: {coordinates.z.toFixed(3)}
                </span>
              ) : (
                <span className="text-gray-500">Haz clic en el modelo</span>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="pointLabel" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del punto:
            </label>
            <input
              id="pointLabel"
              type="text"
              value={currentLabel}
              onChange={(e) => setCurrentLabel(e.target.value)}
              className="p-2 border rounded"
              placeholder="ej. frontal_lobe"
            />
          </div>

          <button
            onClick={handleAddPoint}
            disabled={!coordinates || !currentLabel}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
          >
            Agregar Punto
          </button>

          <button
            onClick={handleExportPoints}
            disabled={points.length === 0}
            className="px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-400"
          >
            Exportar Puntos
          </button>
        </div>
      </div>

      <div className="flex-1 bg-gray-100">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <ModelWithClickDetection setCoordinates={setCoordinates} />

          {/* Visualizar los puntos guardados */}
          {points.map((point, index) => (
            <group key={index} position={point}>
              <mesh>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshStandardMaterial color="red" />
              </mesh>
              <Html position={[0, 0.1, 0]}>
                <div className="bg-black text-white px-2 py-1 rounded text-xs">{pointLabels[index]}</div>
              </Html>
            </group>
          ))}

          <OrbitControls />
        </Canvas>
      </div>

      {points.length > 0 && (
        <div className="bg-white p-4 border-t max-h-[200px] overflow-auto">
          <h2 className="font-bold mb-2">Puntos guardados:</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Nombre</th>
                <th className="p-2 text-left">X</th>
                <th className="p-2 text-left">Y</th>
                <th className="p-2 text-left">Z</th>
              </tr>
            </thead>
            <tbody>
              {points.map((point, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{pointLabels[index]}</td>
                  <td className="p-2">{point.x.toFixed(3)}</td>
                  <td className="p-2">{point.y.toFixed(3)}</td>
                  <td className="p-2">{point.z.toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// Componente para el modelo con detección de clics
function ModelWithClickDetection({ setCoordinates }) {
  const { scene } = useGLTF("/assets/models/brain2.glb") // Reemplaza con tu modelo
  const { raycaster, camera, scene: threeScene } = useThree()

  // Referencia al grupo que contiene el modelo
  const groupRef = useRef()

  // Función para manejar clics en el modelo
  const handleClick = (event) => {
    // Prevenir que el evento se propague
    event.stopPropagation()

    // Obtener el punto de intersección en coordenadas del mundo
    if (event.intersections.length > 0) {
      const point = event.intersections[0].point
      setCoordinates(point.clone())
    }
  }

  return (
    <group ref={groupRef} onClick={handleClick}>
      <primitive object={scene.clone()} />
    </group>
  )
}

// Importar el componente Html de drei
import { Html } from "@react-three/drei"

