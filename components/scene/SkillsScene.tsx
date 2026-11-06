"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { skillTiers, type SkillTier } from "@/content/skills";

type TierId = SkillTier["id"] | "all";

type Node = {
  name: string;
  tier: SkillTier["id"];
  position: [number, number, number];
  size: number;
  color: string;
};

const TIER_COLORS: Record<SkillTier["id"], string> = {
  core: "#8FB0FF",
  applied: "#B49CFF",
  working: "#8A93A6",
};

const RADII: Record<SkillTier["id"], number> = {
  core: 1.38,
  applied: 2.18,
  working: 2.78,
};

const SHORT: Record<string, string> = {
  "Digital Adoption Platforms": "Digital Adoption",
  "Support Vector Machines": "SVM",
  "K-Nearest Neighbours": "KNN",
  "K-Means Clustering": "K-Means",
  "Principal Component Analysis": "PCA",
  "Logistic Regression": "Logistic Reg.",
  "Decision Trees": "Decision Trees",
};

function buildNodes(tiers: SkillTier[]): Node[] {
  const nodes: Node[] = [];
  const offsets: Record<SkillTier["id"], number> = {
    core: 0.4,
    applied: 1.15,
    working: 2.05,
  };

  tiers.forEach((tier) => {
    const count = tier.skills.length;
    tier.skills.forEach((skill, index) => {
      const angle = (index / count) * Math.PI * 2 + offsets[tier.id];
      const radius = RADII[tier.id];
      const y = Math.sin(index * 1.9 + offsets[tier.id]) * (tier.id === "core" ? 0.18 : 0.3);
      nodes.push({
        name: skill.name,
        tier: tier.id,
        position: [Math.cos(angle) * radius, y, Math.sin(angle) * radius],
        size: tier.id === "core" ? 0.062 : tier.id === "applied" ? 0.042 : 0.032,
        color: TIER_COLORS[tier.id],
      });
    });
  });

  return nodes;
}

function NodePoint({
  node,
  activeTier,
  selected,
  onSelect,
  motionOn,
}: {
  node: Node;
  activeTier: TierId;
  selected: string | null;
  onSelect: (name: string) => void;
  motionOn: boolean;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const dimmed = activeTier !== "all" && activeTier !== node.tier;
  const isSelected = selected === node.name;
  const highlighted = hovered || isSelected;

  useEffect(() => {
    if (!hovered) return;
    const previous = document.body.style.cursor;
    document.body.style.cursor = "pointer";
    return () => {
      document.body.style.cursor = previous;
    };
  }, [hovered]);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    const target = highlighted ? 1.9 : 1;
    const next = THREE.MathUtils.damp(mesh.current.scale.x, target, 8, delta);
    mesh.current.scale.setScalar(next);
    if (motionOn) {
      mesh.current.position.y =
        node.position[1] + Math.sin(state.clock.elapsedTime * 0.9 + node.position[0]) * 0.02;
    }
  });

  return (
    <group position={node.position}>
      <mesh
        ref={mesh}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        onClick={(event) => {
          event.stopPropagation();
          onSelect(node.name);
        }}
      >
        <sphereGeometry args={[node.size, 18, 18]} />
        <meshBasicMaterial
          color={node.color}
          transparent
          opacity={dimmed ? 0.14 : highlighted ? 1 : 0.82}
        />
      </mesh>

      <mesh scale={2.4}>
        <sphereGeometry args={[node.size, 12, 12]} />
        <meshBasicMaterial
          color={node.color}
          transparent
          opacity={dimmed ? 0.02 : highlighted ? 0.16 : 0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <Html
        center
        zIndexRange={[20, 0]}
        style={{ pointerEvents: "none", userSelect: "none" }}
        className="whitespace-nowrap"
      >
        <span
          className={
            node.tier === "core"
              ? "text-[10px] font-medium tracking-[0.02em] text-white/80"
              : node.tier === "applied"
                ? "text-[9px] text-white/50"
                : "text-[8px] text-white/30"
          }
          style={{
            opacity: dimmed ? 0.25 : highlighted ? 1 : undefined,
            textShadow: "0 1px 12px rgba(0,0,0,0.9)",
          }}
        >
          {SHORT[node.name] ?? node.name}
        </span>
      </Html>
    </group>
  );
}

function Constellation({
  activeTier,
  selected,
  onSelect,
  motionOn,
}: {
  activeTier: TierId;
  selected: string | null;
  onSelect: (name: string) => void;
  motionOn: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const nodes = useMemo(() => buildNodes(skillTiers), []);

  useFrame((state, delta) => {
    if (!group.current || !motionOn) return;
    group.current.rotation.y += delta * 0.045;
    group.current.rotation.x = 0.42 + Math.sin(state.clock.elapsedTime * 0.08) * 0.03;
  });

  return (
    <group ref={group} rotation={[0.42, 0, -0.08]}>
      {(["core", "applied", "working"] as const).map((tier) => (
        <mesh key={tier} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[RADII[tier], 0.0035, 6, 180]} />
          <meshBasicMaterial
            color={TIER_COLORS[tier]}
            transparent
            opacity={activeTier === "all" || activeTier === tier ? 0.18 : 0.05}
          />
        </mesh>
      ))}

      <mesh>
        <icosahedronGeometry args={[3.25, 1]} />
        <meshBasicMaterial color="#7FA2FF" wireframe transparent opacity={0.035} />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.09, 24, 24]} />
        <meshBasicMaterial color="#DCE6FF" transparent opacity={0.9} />
      </mesh>
      <mesh scale={2.2}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial
          color="#5B8CFF"
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {nodes.map((node) => (
        <NodePoint
          key={`${node.tier}-${node.name}`}
          node={node}
          activeTier={activeTier}
          selected={selected}
          onSelect={onSelect}
          motionOn={motionOn}
        />
      ))}
    </group>
  );
}

export default function SkillsScene({
  activeTier,
  selected,
  onSelect,
  motionOn,
}: {
  activeTier: TierId;
  selected: string | null;
  onSelect: (name: string) => void;
  motionOn: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.4], fov: 42 }}
      dpr={[1, 1.6]}
      frameloop={motionOn ? "always" : "demand"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ touchAction: "pan-y" }}
    >
      <Constellation
        activeTier={activeTier}
        selected={selected}
        onSelect={onSelect}
        motionOn={motionOn}
      />
    </Canvas>
  );
}
