import { useMemo, useRef } from "react";
import * as THREE from "three";
import { spiralCurve } from "./Car";
import { useFrame } from "@react-three/fiber";

export function Ramp() {
    const roadThickness = 0.3; // Thickness of the ramp

    const roadGeometry = useMemo(() => {
        // Create a flat road that follows the spiral curve
        const points = [];
        const segments = 200;
        const roadWidth = 5; // Width of the road

        // Generate vertices for a ribbon following the spiral
        for (let i = 0; i <= segments; i++) {
            const t = i / segments;
            const point = spiralCurve.getPointAt(t);
            const tangent = spiralCurve.getTangentAt(t).normalize();

            // Calculate right perpendicular vector (for road width)
            const up = new THREE.Vector3(0, 1, 0);
            const right = new THREE.Vector3().crossVectors(tangent, up).normalize();

            // Left edge of road
            points.push(point.clone().addScaledVector(right, -roadWidth / 2));
            // Right edge of road
            points.push(point.clone().addScaledVector(right, roadWidth / 2));
        }

        // Create geometry from points
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(
                new Float32Array(points.flatMap((p) => [p.x, p.y, p.z])),
                3
            )
        );

        // Create indices for triangles
        const indices = [];
        for (let i = 0; i < segments; i++) {
            const a = i * 2;
            const b = i * 2 + 1;
            const c = (i + 1) * 2;
            const d = (i + 1) * 2 + 1;

            // Two triangles per segment
            indices.push(a, c, b);
            indices.push(b, c, d);
        }

        geometry.setIndex(new THREE.BufferAttribute(new Uint32Array(indices), 1));
        geometry.computeVertexNormals();

        return geometry;
    }, []);

    // Create side wall geometry for thickness
    const sideWallGeometry = useMemo(() => {
        const points = [];
        const segments = 200;
        const roadWidth = 6;

        for (let i = 0; i <= segments; i++) {
            const t = i / segments;
            const point = spiralCurve.getPointAt(t);
            const tangent = spiralCurve.getTangentAt(t).normalize();
            const up = new THREE.Vector3(0, 1, 0);
            const right = new THREE.Vector3().crossVectors(tangent, up).normalize();

            // Left edge - top and bottom
            const leftTop = point.clone().addScaledVector(right, -roadWidth / 2);
            const leftBottom = leftTop
                .clone()
                .addScaledVector(new THREE.Vector3(0, -1, 0), roadThickness);
            points.push(leftTop, leftBottom);

            // Right edge - top and bottom
            const rightTop = point.clone().addScaledVector(right, roadWidth / 2);
            const rightBottom = rightTop
                .clone()
                .addScaledVector(new THREE.Vector3(0, -1, 0), roadThickness);
            points.push(rightTop, rightBottom);
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(
                new Float32Array(points.flatMap((p) => [p.x, p.y, p.z])),
                3
            )
        );

        const indices = [];
        for (let i = 0; i < segments; i++) {
            const base = i * 4;
            // Left wall - connect left edge top and bottom points
            // Triangle 1: leftTop[i], leftTop[i+1], leftBottom[i]
            indices.push(base, base + 4, base + 1);
            // Triangle 2: leftBottom[i], leftTop[i+1], leftBottom[i+1]
            indices.push(base + 1, base + 4, base + 5);

            // Right wall - connect right edge top and bottom points
            // Triangle 1: rightTop[i], rightBottom[i], rightTop[i+1]
            indices.push(base + 2, base + 3, base + 6);
            // Triangle 2: rightBottom[i], rightBottom[i+1], rightTop[i+1]
            indices.push(base + 3, base + 7, base + 6);
        }

        geometry.setIndex(new THREE.BufferAttribute(new Uint32Array(indices), 1));
        geometry.computeVertexNormals();

        return geometry;
    }, []);

    // Create bottom surface geometry
    const bottomGeometry = useMemo(() => {
        const points = [];
        const segments = 200;
        const roadWidth = 6;

        for (let i = 0; i <= segments; i++) {
            const t = i / segments;
            const point = spiralCurve.getPointAt(t);
            const tangent = spiralCurve.getTangentAt(t).normalize();
            const up = new THREE.Vector3(0, 1, 0);
            const right = new THREE.Vector3().crossVectors(tangent, up).normalize();

            // Bottom surface - left and right edges (lowered by roadThickness)
            const leftBottom = point
                .clone()
                .addScaledVector(right, -roadWidth / 2)
                .addScaledVector(new THREE.Vector3(0, -1, 0), roadThickness);
            const rightBottom = point
                .clone()
                .addScaledVector(right, roadWidth / 2)
                .addScaledVector(new THREE.Vector3(0, -1, 0), roadThickness);

            points.push(leftBottom, rightBottom);
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(
                new Float32Array(points.flatMap((p) => [p.x, p.y, p.z])),
                3
            )
        );

        const indices = [];
        for (let i = 0; i < segments; i++) {
            const a = i * 2;
            const b = i * 2 + 1;
            const c = (i + 1) * 2;
            const d = (i + 1) * 2 + 1;

            indices.push(a, c, b);
            indices.push(b, c, d);
        }

        geometry.setIndex(new THREE.BufferAttribute(new Uint32Array(indices), 1));
        geometry.computeVertexNormals();

        return geometry;
    }, []);

    // Create front and back end caps to close the ramp
    const endCapsGeometry = useMemo(() => {
        const segments = 200;
        const roadWidth = 6;
        const points = [];
        const indices = [];

        // Front end cap (start of spiral)
        const tStart = 0;
        const pointStart = spiralCurve.getPointAt(tStart);
        const tangentStart = spiralCurve.getTangentAt(tStart).normalize();
        const up = new THREE.Vector3(0, 1, 0);
        const rightStart = new THREE.Vector3()
            .crossVectors(tangentStart, up)
            .normalize();

        const frontLeftTop = pointStart
            .clone()
            .addScaledVector(rightStart, -roadWidth / 2);
        const frontRightTop = pointStart
            .clone()
            .addScaledVector(rightStart, roadWidth / 2);
        const frontLeftBottom = frontLeftTop
            .clone()
            .addScaledVector(new THREE.Vector3(0, -1, 0), roadThickness);
        const frontRightBottom = frontRightTop
            .clone()
            .addScaledVector(new THREE.Vector3(0, -1, 0), roadThickness);

        // Back end cap (end of spiral)
        const tEnd = 1;
        const pointEnd = spiralCurve.getPointAt(tEnd);
        const tangentEnd = spiralCurve.getTangentAt(tEnd).normalize();
        const rightEnd = new THREE.Vector3()
            .crossVectors(tangentEnd, up)
            .normalize();

        const backLeftTop = pointEnd
            .clone()
            .addScaledVector(rightEnd, -roadWidth / 2);
        const backRightTop = pointEnd
            .clone()
            .addScaledVector(rightEnd, roadWidth / 2);
        const backLeftBottom = backLeftTop
            .clone()
            .addScaledVector(new THREE.Vector3(0, -1, 0), roadThickness);
        const backRightBottom = backRightTop
            .clone()
            .addScaledVector(new THREE.Vector3(0, -1, 0), roadThickness);

        // Front cap vertices (4 vertices)
        points.push(frontLeftTop, frontRightTop, frontLeftBottom, frontRightBottom);
        // Front cap indices (2 triangles)
        indices.push(0, 1, 2);
        indices.push(2, 1, 3);

        // Back cap vertices (4 vertices, starting at index 4)
        points.push(backLeftTop, backRightTop, backLeftBottom, backRightBottom);
        // Back cap indices (2 triangles)
        indices.push(4, 6, 5);
        indices.push(5, 6, 7);

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(
                new Float32Array(points.flatMap((p) => [p.x, p.y, p.z])),
                3
            )
        );
        geometry.setIndex(new THREE.BufferAttribute(new Uint32Array(indices), 1));
        geometry.computeVertexNormals();

        return geometry;
    }, []);

    const material = new THREE.MeshStandardMaterial({
        color: "#d1d5db", // Light grey road
        roughness: 0.7,
        metalness: 0.1,
        side: THREE.DoubleSide,
    });

    const sideMaterial = new THREE.MeshStandardMaterial({
        color: "#9ca3af", // Slightly darker for sides
        roughness: 0.7,
        metalness: 0.1,
        side: THREE.DoubleSide,
    });

    return (
        <group>
            {/* The Road Surface */}
            <mesh
                geometry={roadGeometry}
                material={material}
                receiveShadow
                castShadow
            />

            {/* Road Edge Lines for visual clarity */}
            <mesh geometry={roadGeometry}>
                <meshStandardMaterial
                    color="#888888"
                    wireframe={false}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Side Walls for thickness */}
            <mesh
                geometry={sideWallGeometry}
                material={sideMaterial}
                receiveShadow
                castShadow
            />

            {/* Bottom Surface */}
            <mesh
                geometry={bottomGeometry}
                material={sideMaterial}
                receiveShadow
                castShadow
            />

            {/* Front and Back End Caps */}
            <mesh
                geometry={endCapsGeometry}
                material={sideMaterial}
                receiveShadow
                castShadow
            />

            <Plants />
            <StreetLights />
        </group>
    );
}

function Plants() {
    const meshRef = useRef(null);

    const plantData = useMemo(() => {
        const data = [];
        const count = 40; // 40 plants

        for (let i = 0; i < count; i++) {
            const t = i / count;
            const point = spiralCurve.getPointAt(t);
            const tangent = spiralCurve.getTangentAt(t);
            const normal = new THREE.Vector3(0, 1, 0).cross(tangent).normalize();

            // Random offset from edge
            const offset = 2.5 + Math.random() * 0.5;
            const side = Math.random() > 0.5 ? 1 : -1;

            data.push({
                position: point
                    .clone()
                    .add(normal.clone().multiplyScalar(offset * side))
                    .addScaledVector(new THREE.Vector3(0, 1, 0), 0.5),
                scale: 0.3 + Math.random() * 0.4,
                rotation: new THREE.Euler(
                    Math.random() * 0.5,
                    Math.random() * Math.PI,
                    0
                ),
                phase: Math.random() * Math.PI * 2,
            });
        }
        return data;
    }, []);

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.getElapsedTime();
        const tempObject = new THREE.Object3D();

        plantData.forEach((data, i) => {
            const sway = Math.sin(time * 2 + data.phase) * 0.1;

            tempObject.position.copy(data.position);
            tempObject.scale.setScalar(data.scale);
            tempObject.rotation.copy(data.rotation);
            tempObject.rotation.z += sway;

            tempObject.updateMatrix();
            meshRef.current.setMatrixAt(i, tempObject.matrix);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh
            ref={meshRef}
            args={[undefined, undefined, plantData.length]}
            castShadow
            receiveShadow
        >
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="#4ade80" roughness={0.8} />
        </instancedMesh>
    );
}

function StreetLights() {
    const lightData = useMemo(() => {
        const data = [];
        const totalLights = 20;

        // Keep every 4th light (1, skip 3, 1, skip 3, etc.)
        for (let i = 0; i < totalLights; i++) {
            if (i % 4 === 0) {
                const t = i / totalLights;
                const point = spiralCurve.getPointAt(t);
                const tangent = spiralCurve.getTangentAt(t);
                const normal = new THREE.Vector3(0, 1, 0).cross(tangent).normalize();

                // Alternate sides
                const side = Math.floor(i / 4) % 2 === 0 ? 1 : -1;

                data.push({
                    position: point
                        .clone()
                        .add(normal.clone().multiplyScalar(2.0 * side)),
                    side: side,
                });
            }
        }
        return data;
    }, []);

    return (
        <group>
            {lightData.map((light, i) => (
                <group key={i} position={light.position}>
                    {/* Pole */}
                    <mesh position={[0, 1.5, 0]}>
                        <cylinderGeometry args={[0.08, 0.08, 3, 8]} />
                        <meshStandardMaterial color="#444444" roughness={0.6} />
                    </mesh>

                    {/* Light bulb */}
                    <mesh position={[0, 3.2, 0]}>
                        <sphereGeometry args={[0.2, 16, 16]} />
                        <meshStandardMaterial
                            color="#ffeb3b"
                            emissive="#ffeb3b"
                            emissiveIntensity={6}
                            toneMapped={false}
                        />
                    </mesh>

                    {/* Lamp shade */}
                    <mesh position={[0, 3.1, 0]}>
                        <coneGeometry args={[0.3, 0.3, 16]} />
                        <meshStandardMaterial color="#333333" roughness={0.8} />
                    </mesh>

                    {/* Point light for illumination */}
                    <pointLight
                        position={[0, 3.2, 0]}
                        color="#ffeb3b"
                        intensity={30}
                        distance={12}
                        decay={2}
                    />
                </group>
            ))}
        </group>
    );
}
