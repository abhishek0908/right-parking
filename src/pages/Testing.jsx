import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, useScroll, ContactShadows } from "@react-three/drei";
import { TestingOverlay } from "../components/TestingOverlay";
import { Suspense } from "react";
import { Car } from "../components/canvas/Car";
import { Ramp } from "../components/canvas/Ramp";
import * as THREE from "three";

function Rig() {
    const scroll = useScroll();

    useFrame((state) => {
        const offset = scroll.offset;

        // Camera positioned closer to the ramp from the beginning
        const angle = offset * Math.PI * 0.5;

        // Camera orbits closer to the scene
        const targetX = -5 + Math.sin(angle) * 8;
        const targetZ = 12 - offset * 8 + Math.cos(angle) * 6;
        // Camera descends as user scrolls
        const targetY = 11.1 - offset * 12;

        state.camera.position.lerp(
            new THREE.Vector3(targetX, targetY, targetZ),
            0.08
        );
        state.camera.lookAt(8, targetY - 1.9, 0);
    });

    return null;
}

export const Testing = () => {
    return (
        <div style={{ width: "100vw", height: "100vh" }} className="bg-[var(--bg-home)]">
            <Canvas
                shadows
                camera={{ position: [-5, 8, 12], fov: 50 }}
                style={{ width: "100%", height: "100%" }}
            >
                <color attach="background" args={["#09090b"]} />
                <fog attach="fog" args={["#09090b", 10, 50]} />
                <ambientLight intensity={0.6} />
                <directionalLight
                    position={[15, 20, 10]}
                    intensity={1.2}
                    castShadow
                    shadow-mapSize={[1024, 1024]}
                />

                <Suspense fallback={null}>
                    <ScrollControls pages={4} damping={0.3}>
                        <Rig />
                        <Car />
                        <Ramp />
                        <TestingOverlay />
                    </ScrollControls>

                    <ContactShadows
                        position={[8, -3, 0]}
                        opacity={0.3}
                        scale={40}
                        blur={2}
                        far={10}
                        resolution={256}
                        color="#000000"
                    />
                </Suspense>
            </Canvas>
        </div>
    );
};
