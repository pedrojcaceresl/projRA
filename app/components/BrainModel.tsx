"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"

interface BrainModelProps {
  onSelectPart: (partId: string) => void
}

export default function BrainModel({ onSelectPart }: BrainModelProps) {
  const { scene, nodes, materials, userData } = useGLTF("/assets/models/brain2.glb") // Assuming you have a brain2.glb model

  const group = useRef<THREE.Group>(null)

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.005 // subtle rotation
    }
  })

  const handlePartClick = (objectName: string) => {
    onSelectPart(objectName)
  }

  return (
    <group ref={group} dispose={null} scale={10}>
      <primitive object={scene} />
      {Object.keys(nodes).map((nodeName) => {
        const node = nodes[nodeName] as THREE.Mesh
        if (node.isMesh) {
          return (
				<mesh
					key={node.name}
					geometry={node.geometry}
					material={node.material}
					position={node.position}
					rotation={node.rotation}
					scale={node.scale}
					onClick={() => handlePartClick(node.name)}
				>
				</mesh>
			);
        }
        return null
      })}
    </group>
  )
}

useGLTF.preload("/assets/models/brain2.glb");

