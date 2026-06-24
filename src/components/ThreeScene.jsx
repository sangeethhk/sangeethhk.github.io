import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function CyberTorus() {
  const meshRef = useRef()

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.15
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.25
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={1.8}>
        <torusKnotGeometry args={[1, 0.35, 180, 24]} />
        <MeshDistortMaterial
          color="#00ff41"
          emissive="#00ff41"
          emissiveIntensity={0.25}
          roughness={0.2}
          metalness={0.8}
          distort={0.15}
          speed={2}
          wireframe={false}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  )
}

function Particles() {
  const count = 800
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [])

  const ref = useRef()

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.02
      ref.current.rotation.x = clock.getElapsedTime() * 0.01
    }
  })

  return (
    <points ref={ref} position={[0, 0, -2]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#00ff41"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function GridFloor() {
  return (
    <gridHelper
      args={[12, 20, '#00ff41', '#00ff41']}
      position={[0, -2.5, 0]}
      rotation={[0, 0, 0]}
    />
  )
}

export default function ThreeScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00ff41" />
        <pointLight position={[-10, -5, -10]} intensity={0.5} color="#00f0ff" />
        <CyberTorus />
        <Particles />
        <GridFloor />
      </Canvas>
    </div>
  )
}
