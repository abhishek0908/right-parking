import { useRef, useState } from 'react';
import { Text, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const RobotCamera = ({ position, showDisplay = false, ...props }) => {
    const groupRef = useRef();
    const textRef = useRef();
    const scroll = useScroll();
    const [status, setStatus] = useState("SCANNING...");

    useFrame((state) => {
        if (groupRef.current) {
            // Subtle floating movement
            const time = state.clock.getElapsedTime();
            groupRef.current.position.y = position[1] + Math.sin(time * 1.5) * 0.1;
            // Scan towards the left side
            groupRef.current.rotation.y = -Math.abs(Math.sin(time * 0.5)) * 0.3;
        }

        // Reactive Text Update
        if (showDisplay && scroll) {
            const currentStatus = scroll.offset < 0.1 ? "SCANNING CAR..." : "KA016556";
            if (status !== currentStatus) {
                setStatus(currentStatus);
            }
        }
    });

    return (
        <group ref={groupRef} position={position} {...props}>
            {/* Main body - spherical */}
            <mesh castShadow>
                <sphereGeometry args={[0.4, 24, 24]} />
                <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.4} />
            </mesh>

            {/* Eye/Lens area */}
            <group position={[0, 0, 0.5]} rotation={[0, -0.4, 0]}>
                <mesh>
                    <sphereGeometry args={[0.22, 20, 20]} />
                    <meshStandardMaterial color="#0a1628" metalness={0.9} roughness={0.1} />
                </mesh>
                {/* Inner lens highlight */}
                <mesh position={[0, 0, 0.1]}>
                    <sphereGeometry args={[0.12, 16, 16]} />
                    <meshStandardMaterial
                        color="#4da6ff"
                        emissive="#4da6ff"
                        emissiveIntensity={0.5}
                        metalness={0.8}
                        roughness={0.1}
                    />
                </mesh>
            </group>

            {/* Antenna */}
            <mesh position={[0, 0.45, -0.1]} castShadow>
                <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh position={[0, 0.62, -0.1]}>
                <sphereGeometry args={[0.05, 12, 12]} />
                <meshStandardMaterial
                    color="#ff4444"
                    emissive="#ff4444"
                    emissiveIntensity={0.8}
                />
            </mesh>

            {/* Display above */}
            <group position={[0, 0.9, 0]}>
                <mesh>
                    <boxGeometry args={[1.2, 0.25, 0.1]} />
                    <meshStandardMaterial color="#1a1a2e" metalness={0.5} roughness={0.3} />
                </mesh>
                {showDisplay && (
                    <Text
                        ref={textRef}
                        position={[0, 0, 0.06]}
                        fontSize={0.1}
                        color={status === "SCANNING CAR..." ? "#ffcc00" : "#00ff88"}
                        anchorX="center"
                        anchorY="middle"
                    >
                        {status}
                    </Text>
                )}
            </group>
        </group>
    );
};
