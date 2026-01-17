import { useRef, forwardRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll, useGLTF, Trail } from "@react-three/drei";
import * as THREE from "three";

// Spiral curve definition - positioned to the right and visible from start
const RADIUS = 4;
const HEIGHT = 18;
const TURNS = 3;
const START_X = 8; // Offset to the right
const START_Z = 0;

export const spiralCurve = new THREE.CatmullRomCurve3(
    new Array(100).fill(0).map((_, i) => {
        const t = i / 99;
        const angle = t * Math.PI * 2 * TURNS;
        return new THREE.Vector3(
            START_X + Math.cos(angle) * RADIUS,
            11.1 - t * HEIGHT,
            START_Z + Math.sin(angle) * RADIUS
        );
    })
);

// Load GLB model and find tail lamps
function LuxurySedanModel({ onTailLampsFound }) {
    const { scene } = useGLTF("/mersedes-benz_s-class_w223_brabus_850.glb");
    const groupRef = useRef(null);

    useEffect(() => {
        if (!groupRef.current) return;

        const clonedScene = scene.clone();
        const toRemove = [];

        // Traverse and optimize meshes
        clonedScene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.frustumCulled = true;

                // Identify and remove internal components
                const name = child.name.toLowerCase();
                if (name.includes("interior") ||
                    name.includes("inside") ||
                    name.includes("seat") ||
                    name.includes("dashboard") ||
                    name.includes("steering") ||
                    name.includes("engine") ||
                    name.includes("glass_inner") ||
                    (name.includes("under") && !name.includes("underbody"))) {
                    toRemove.push(child);
                    return;
                }

                // Optimize materials
                if (child.material) {
                    const materials = Array.isArray(child.material) ? child.material : [child.material];
                    materials.forEach((mat) => {
                        mat.precision = "lowp";
                        if (mat.metalness > 0.8) mat.metalness = 0.8;
                        if (mat.roughness < 0.2) mat.roughness = 0.2;
                        mat.envMapIntensity = 0.5;
                    });
                }
            }
        });

        // Purge nodes
        toRemove.forEach(child => {
            if (child.parent) child.parent.remove(child);
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
                const materials = Array.isArray(child.material) ? child.material : [child.material];
                materials.forEach(m => m.dispose());
            }
        });

        // Calculate bounding box to center and scale the model
        const box = new THREE.Box3().setFromObject(clonedScene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Center the model
        clonedScene.position.x = -center.x;
        clonedScene.position.y = -center.y;
        clonedScene.position.z = -center.z;

        // Rotate the model to face forward (along Z-axis)
        clonedScene.rotation.y = 0; // -90 degrees rotation

        // Scale the model to be larger (3.5 units in length)
        const targetLength = 3.5;
        const scaleFactor = targetLength / Math.max(size.x, size.y, size.z);
        clonedScene.scale.setScalar(scaleFactor);

        // Find tail lamp meshes (now only on remaining nodes)
        const tailLamps = [];
        clonedScene.traverse((child) => {
            if (child instanceof THREE.Mesh && !toRemove.includes(child)) {
                const name = child.name.toLowerCase();
                if (
                    name.includes("tail") ||
                    name.includes("lamp") ||
                    name.includes("light") ||
                    name.includes("rear") ||
                    name.includes("brake") ||
                    (name.includes("red") &&
                        (name.includes("light") || name.includes("lamp")))
                ) {
                    tailLamps.push(child);
                }
            }
        });

        // If no tail lamps found by name, find meshes at the rear of the car
        if (tailLamps.length === 0) {
            const rearMeshes = [];
            clonedScene.traverse((child) => {
                if (child instanceof THREE.Mesh && !toRemove.includes(child)) {
                    // Get world position after transformations
                    const worldPos = new THREE.Vector3();
                    child.getWorldPosition(worldPos);
                    // After rotation, rear is in negative Z direction
                    if (worldPos.z < center.z - size.z * 0.3) {
                        rearMeshes.push({ mesh: child, z: worldPos.z });
                    }
                }
            });
            // Sort by Z position (most rear first) and take the 2 most rear meshes
            rearMeshes.sort((a, b) => a.z - b.z);
            tailLamps.push(...rearMeshes.slice(0, 2).map((item) => item.mesh));
        }

        // Add cloned scene to group
        groupRef.current.add(clonedScene);

        // Notify parent component of found tail lamps
        if (tailLamps.length > 0) {
            onTailLampsFound(tailLamps);
        }
    }, [scene, onTailLampsFound]);

    return <group ref={groupRef} />;
}

// Wrapper component for tail lamp mesh to use with Trail
function TailLampWrapper({ mesh, xOffset = 0 }) {
    const groupRef = useRef(null);

    useFrame(() => {
        if (groupRef.current && mesh) {
            // Get world position of the tail lamp mesh
            const worldPos = new THREE.Vector3();
            mesh.getWorldPosition(worldPos);
            // Move down a bit to better align with tail lamps
            worldPos.y -= 0.2;
            // Add horizontal offset to increase spacing
            worldPos.x += xOffset;
            groupRef.current.position.copy(worldPos);
        }
    });

    // Create a small invisible mesh that follows the tail lamp position
    return (
        <group ref={groupRef}>
            <mesh visible={false}>
                <boxGeometry args={[0.01, 0.01, 0.01]} />
                <meshBasicMaterial transparent opacity={0} />
            </mesh>
        </group>
    );
}

// Preload the model
useGLTF.preload("/mersedes-benz_s-class_w223_brabus_850.glb");

// Pure Visual Component
export const CarModel = forwardRef((props, ref) => {
    const [tailLamps, setTailLamps] = useState([]);

    const handleTailLampsFound = (lamps) => {
        setTailLamps(lamps);
    };

    return (
        <group ref={ref} {...props} dispose={null}>
            {/* Headlights Spotlights - Yellow */}
            <spotLight
                position={[0.4, 0.5, 2.0]}
                angle={0.4}
                penumbra={0.5}
                intensity={50}
                color="#ffeb3b"
                distance={12}
                target-position={[0.4, 0, 8]}
            />
            <spotLight
                position={[-0.4, 0.5, 2.0]}
                angle={0.4}
                penumbra={0.5}
                intensity={50}
                color="#ffeb3b"
                distance={12}
                target-position={[-0.4, 0, 8]}
            />

            {/* GLB Model */}
            <LuxurySedanModel onTailLampsFound={handleTailLampsFound} />

            {/* Taillights with Trails - Attached to actual tail lamp meshes */}
            {tailLamps.length >= 2 && (
                <>
                    <Trail
                        width={0.4}
                        length={4}
                        color="#FF0000"
                        attenuation={(t) => t * t}
                    >
                        <TailLampWrapper mesh={tailLamps[0]} xOffset={0.5} />
                    </Trail>
                    <Trail
                        width={0.4}
                        length={4}
                        color="#FF0000"
                        attenuation={(t) => t * t}
                    >
                        <TailLampWrapper mesh={tailLamps[1]} xOffset={-0.5} />
                    </Trail>
                </>
            )}
            {/* Fallback: if no tail lamps found, use default position */}
            {tailLamps.length < 2 && (
                <group position={[0, 0.06, -1.65]}>
                    <Trail
                        width={0.4}
                        length={4}
                        color="#FF0000"
                        attenuation={(t) => t * t}
                    >
                        <mesh position={[0.5, 0, 0]}>
                            <boxGeometry args={[0.2, 0.05, 0.1]} />
                            <meshStandardMaterial
                                color="#ff0000"
                                emissive="#ff0000"
                                emissiveIntensity={2}
                                toneMapped={false}
                            />
                        </mesh>
                    </Trail>
                    <Trail
                        width={0.4}
                        length={4}
                        color="#FF0000"
                        attenuation={(t) => t * t}
                    >
                        <mesh position={[-0.5, 0, 0]}>
                            <boxGeometry args={[0.2, 0.05, 0.1]} />
                            <meshStandardMaterial
                                color="#ff0000"
                                emissive="#ff0000"
                                emissiveIntensity={2}
                                toneMapped={false}
                            />
                        </mesh>
                    </Trail>
                </group>
            )}
        </group>
    );
});

// Original Spiral Car Component
export function Car() {
    const scroll = useScroll();
    const carRef = useRef(null);
    const startOffset = 0.13; // Start animation at 25% along the spiral when scroll is 0

    useFrame((state, delta) => {
        if (!carRef.current) return;

        const rawT = scroll.offset;
        // Map scroll range [0, 1] to spiral range [startOffset, 1]
        const adjustedT = startOffset + rawT * (1 - startOffset);
        const t = adjustedT * adjustedT * (3 - 2 * adjustedT);

        const point = spiralCurve.getPointAt(t);
        const tangent = spiralCurve.getTangentAt(t).normalize();

        // Position car lifted above the ramp
        carRef.current.position.copy(point);
        carRef.current.position.y += 0.59; // Lift car higher above the ramp
        // Rotate car to face along the tangent
        const lookAt = point.clone().add(tangent);
        lookAt.y = point.y + 0.35;
        carRef.current.lookAt(lookAt);
    });

    return <CarModel ref={carRef} />;
}
