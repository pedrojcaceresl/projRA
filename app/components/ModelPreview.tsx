"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

interface ModelPreviewProps {
  modelId: string
}

export default function ModelPreview({ modelId }: ModelPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(160, 160)
    containerRef.current.appendChild(renderer.domElement)

    const geometry = getGeometryForModel(modelId)
    const material = getMaterialForModel(modelId)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    camera.position.z = 5

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.25
    controls.enableZoom = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 1

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 0.5)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      renderer.dispose()
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [modelId])

  return <div ref={containerRef} className="w-40 h-40" />
}

function getGeometryForModel(modelId: string): THREE.BufferGeometry {
  switch (modelId) {
    case "brain":
      return new THREE.SphereGeometry(2, 32, 32)
    case "heart":
      return new THREE.TorusGeometry(1.5, 0.7, 16, 100)
    case "lungs":
      return new THREE.CylinderGeometry(1, 1, 3, 32)
    case "dna":
      return new THREE.TorusKnotGeometry(1, 0.4, 100, 16)
    case "cell":
      return new THREE.IcosahedronGeometry(2, 0)
    default:
      return new THREE.BoxGeometry(2, 2, 2)
  }
}

function getMaterialForModel(modelId: string): THREE.Material {
  switch (modelId) {
    case "brain":
      return new THREE.MeshPhongMaterial({ color: 0xff9a8b, shininess: 100 })
    case "heart":
      return new THREE.MeshPhongMaterial({ color: 0xe53935, shininess: 100 })
    case "lungs":
      return new THREE.MeshPhongMaterial({ color: 0x81d4fa, shininess: 100 })
    case "dna":
      return new THREE.MeshPhongMaterial({ color: 0x66bb6a, shininess: 100 })
    case "cell":
      return new THREE.MeshPhongMaterial({ color: 0x9575cd, shininess: 100, transparent: true, opacity: 0.8 })
    default:
      return new THREE.MeshPhongMaterial({ color: 0xcccccc, shininess: 100 })
  }
}

