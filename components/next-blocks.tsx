"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

const isMobile = (): boolean => {
  if (typeof window === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

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
);

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
    };
    return shapes[letter] || shapes["A"];
  };

  const letterShape: number[][] = getLetterShape(letter);

  return (
    <group position={position}>
      {letterShape.map((row: number[], i: number) =>
        row.map((cell: number, j: number) =>
          cell ? <BoxWithEdges key={`${i}-${j}`} position={[j * 0.5 - 1, (4 - i) * 0.5 - 1, 0]} /> : null
        )
      )}
    </group>
  );
};

const Scene: React.FC = () => {
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);

  useEffect(() => {
    setIsMobileDevice(isMobile());
  }, []);

  return (
    <>
      <group position={[-1.5, 0, 0]} rotation={[0, Math.PI / 1.8, 0]}>
        {["A", "M", "P", "1", "8"].map((letter, index) => (
          <BoxLetter key={letter} letter={letter} position={[index * 2.5 - 5, 0, 0]} />
        ))}
      </group>
      <OrbitControls autoRotate autoRotateSpeed={1.2} enableZoom={false} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <Environment
        files={
          isMobileDevice
            ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download3-7FArHVIJTFszlXm2045mQDPzsZqAyo.jpg"
            : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dither_it_M3_Drone_Shot_equirectangular-jpg_San_Francisco_Big_City_1287677938_12251179%20(1)-NY2qcmpjkyG6rDp1cPGIdX0bHk3hMR.jpg"
        }
        background
      />
    </>
  );
};

export default function Component() {
  return (
    <div className="w-full h-full bg-gray-900 ">
      <Canvas camera={{ position: [10, 0, -12], fov: 50 }}>
        <Scene />
      </Canvas>
      {/* <div className="absolute bottom-0 left-0 right-0 text-center p-6 bg-black/80 backdrop-blur-md shadow-lg">
        <h1 className="text-2xl font-bold text-white tracking-wide mb-3">AMP18 Events</h1>
        <div className="text-xl font-semibold text-white animate-pulse">
          Coming Soon: <span className="text-red-500">Blinding Nights-Chennai 1.0</span>
        </div>
        <p className="mt-3 text-lg text-gray-300">Get ready for an electrifying experience like never before!</p>
        <button className="mt-4 px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-md transition-all duration-300">
          Stay Notified
        </button>
      </div> */}
    </div>
  );
}
