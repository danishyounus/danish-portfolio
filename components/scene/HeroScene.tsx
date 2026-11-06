"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type SceneProps = {
  active: boolean;
  motionOn: boolean;
  compact: boolean;
};

function usePointer() {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return pointer;
}

function Dust({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const blue = new THREE.Color("#5B8CFF");
    const violet = new THREE.Color("#A78BFA");
    const white = new THREE.Color("#DCE4FF");

    for (let i = 0; i < count; i += 1) {
      const radius = 3.2 + Math.random() * 7.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.7;
      positions[i * 3 + 2] = radius * Math.cos(phi) * 0.6 - 2;

      const pick = Math.random();
      const color = pick > 0.72 ? white : pick > 0.38 ? blue : violet;
      const intensity = 0.45 + Math.random() * 0.55;
      colors[i * 3] = color.r * intensity;
      colors[i * 3 + 1] = color.g * intensity;
      colors[i * 3 + 2] = color.b * intensity;
    }

    return { positions, colors };
  }, [count]);

  useFrame((_, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.014;
    points.current.rotation.x += delta * 0.004;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Rings({ motionOn }: { motionOn: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    if (motionOn) {
      group.current.rotation.z += delta * 0.02;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.08;
    }
  });

  return (
    <group ref={group} position={[2.15, 0.15, -1.4]} rotation={[Math.PI / 2.35, 0.15, 0]}>
      <mesh>
        <torusGeometry args={[2.45, 0.0035, 8, 220]} />
        <meshBasicMaterial color="#7FA2FF" transparent opacity={0.32} />
      </mesh>
      <mesh rotation={[0.5, 0.2, 0]}>
        <torusGeometry args={[3.05, 0.0025, 8, 220]} />
        <meshBasicMaterial color="#A78BFA" transparent opacity={0.22} />
      </mesh>
      <mesh rotation={[1.1, 0.4, 0]}>
        <torusGeometry args={[3.65, 0.0018, 8, 220]} />
        <meshBasicMaterial color="#67E8F9" transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

function Lattice() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.05;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.02;
  });

  return (
    <mesh ref={mesh} position={[2.6, -0.4, -2.8]}>
      <icosahedronGeometry args={[2.1, 1]} />
      <meshBasicMaterial color="#6E8CFF" wireframe transparent opacity={0.055} />
    </mesh>
  );
}

function Parallax({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const pointer = usePointer();
  const { camera } = useThree();

  useFrame(() => {
    if (!group.current) return;
    const targetX = pointer.current.x * 0.28;
    const targetY = -pointer.current.y * 0.18;
    group.current.position.x += (targetX - group.current.position.x) * 0.035;
    group.current.position.y += (targetY - group.current.position.y) * 0.035;
    camera.position.x += (pointer.current.x * 0.22 - camera.position.x) * 0.02;
    camera.position.y += (-pointer.current.y * 0.14 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  return <group ref={group}>{children}</group>;
}

function Scene({ active, motionOn, compact }: SceneProps) {
  return (
    <>
      <fog attach="fog" args={["#050507", 9, 24]} />
      <ambientLight intensity={0.6} />
      <Parallax>
        <Dust count={compact ? 420 : 1150} />
        <Rings motionOn={motionOn} />
        <Lattice />
      </Parallax>
    </>
  );
}

export default function HeroScene({ active, motionOn, compact }: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 46 }}
      dpr={[1, compact ? 1.25 : 1.6]}
      frameloop={active && motionOn ? "always" : "demand"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    >
      <Scene active={active} motionOn={motionOn} compact={compact} />
    </Canvas>
  );
}
