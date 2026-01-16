import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import { HomeOverlay } from "../components/HomeOverlay";
import { Suspense, useEffect } from "react";
import { Car } from "../components/canvas/Car";
import { Ramp } from "../components/canvas/Ramp";
import { Rig } from "../components/canvas/Rig";
import { ContactShadows } from "@react-three/drei";

export const Home = () => {
    useEffect(() => {
        // Disable body overflow for 3D scroll experience
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

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
                    <ScrollControls pages={5} damping={0.3}>
                        <Rig />
                        <Car />
                        <Ramp />
                        <HomeOverlay />
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
