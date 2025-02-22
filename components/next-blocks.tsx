"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { useState, useEffect } from "react"
import * as THREE from "three"

const isMobile = () => {
  if (typeof window === "undefined") return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}
interface Position {
  position: [number, number, number];
}

const BoxWithEdges: React.FC<Position> = ({ position }) => (
    <group position={position}>
      <mesh>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshPhysicalMaterial
          color="#ff4500"
          roughness={0.2}
          metalness={0.7}
          transparent={true}
          opacity={0.9}
          transmission={0.3}
          clearcoat={1}
        />
      </mesh>
      <lineSegments>
      <edgesGeometry args={[new THREE.BoxGeometry(0.5, 0.5, 0.5)]} />
      <lineBasicMaterial color="#ffa500" linewidth={2} />
    </lineSegments>
    </group>
  )

  interface BoxLetterProps {
    letter: string;
    position: [number, number, number];
  }

const BoxLetter: React.FC<BoxLetterProps> = ({ letter, position }) => {
  const getLetterShape = (letter: string): number[][] => {
    const shapes: Record<string, number[][]> = {
      A: [
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
      ],
      M: [
        [1, 0, 0, 0, 1],
        [1, 1, 0, 1, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
      ],
      P: [
        [1, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
      ],
      1: [
        [0, 0, 1, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0],
      ],
      8: [
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [0, 1, 1, 1, 0],
      ],
    }
    return shapes[letter] || shapes["A"]
  }

  const letterShape = getLetterShape(letter)

  return (
    <group position={position}>
      {letterShape.map((row, i) => row.map((cell, j) => {
        if (cell) {
          const xOffset = j * 0.5 - (letter === "1" ? 0.5 : 1)
          return <BoxWithEdges key={`${i}-${j}`} position={[xOffset, (4 - i) * 0.5 - 1, 0]} />
        }
        return null
      })
      )}
    </group>
  )
}

const Scene = () => {
  
  const [isMobileDevice, setIsMobileDevice] = useState(false)

  useEffect(() => {
    setIsMobileDevice(isMobile())
  }, [])

  return (
    <>
      <group position={[-0.5, 0, 0]} rotation={[0, Math.PI / 1.5, 0]}>
        <BoxLetter letter="A" position={[-4.5, 0, 0]} />
        <BoxLetter letter="M" position={[-2.25, 0, 0]} />
        <BoxLetter letter="P" position={[0, 0, 0]} />
        <BoxLetter letter="1" position={[2.25, 0, 0]} />
        <BoxLetter letter="8" position={[4.5, 0, 0]} />
      </group>
      <OrbitControls
      
        enableZoom
        enablePan
        enableRotate
        autoRotate
        autoRotateSpeed={1.5}
      />

      <ambientLight intensity={0.6} />

      <directionalLight position={[5, 5, 5]} intensity={0.7} color="#ffffff" />

      <Environment
        files={
          isMobileDevice
            ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download3-7FArHVIJTFszlXm2045mQDPzsZqAyo.jpg"
            : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dither_it_M3_Drone_Shot_equirectangular-jpg_San_Francisco_Big_City_1287677938_12251179%20(1)-NY2qcmpjkyG6rDp1cPGIdX0bHk3hMR.jpg"
        }
        background
      />
    </>
  )
}

export default function Component() {
  return (
    <div className="w-full h-screen bg-gray-900 relative">
      <Canvas camera={{ position: [12, 0, -13], fov: 50 }}>
        <Scene />
      </Canvas>
      <div className="absolute bottom-0 left-0 right-0 text-center p-8 bg-gradient-to-t from-black via-black/70 to-transparent backdrop-blur-md shadow-lg">
        <h1 className="text-xl font-bold text-white tracking-wide mb-3 drop-shadow-lg">
          AMP18 Events
        </h1>
        <div className="text-3xl font-semibold text-white drop-shadow-md">
          Coming Soon: <span className="text-red-500">Blinding Nights-Chennai 1.0</span>
        </div>
        <p className="mt-4 text-lg text-gray-300 opacity-80">
          Get ready for an electrifying experience like never before!
        </p>
        <button className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-md transition-all duration-300">
          Stay Notified
        </button>
      </div>
    </div>
  )
}