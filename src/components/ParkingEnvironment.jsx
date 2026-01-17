import { useRef } from 'react'
import { useScroll, useTexture, Html, Text } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { ParkingGate } from './City'

// Parking Spaces Sign Component
const ParkingSpacesSign = ({ position = [0, 0, 0], rotation = [0, Math.PI, 0] }) => {
    return (
        <group position={position} rotation={rotation}>
            {/* Mounting Posts - shorter and behind sign */}
            <mesh position={[-0.4, 1.2, -0.05]} castShadow>
                <boxGeometry args={[0.15, 1.5, 0.15]} />
                <meshStandardMaterial color="#1e293b" />
            </mesh>
            <mesh position={[0.4, 1.2, -0.05]} castShadow>
                <boxGeometry args={[0.15, 1.5, 0.15]} />
                <meshStandardMaterial color="#1e293b" />
            </mesh>

            {/* Main Sign Frame */}
            <group position={[0, 3, 0]}>
                {/* Black Background - wider box */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[1.8, 3.5, 0.1]} />
                    <meshStandardMaterial color="#000000" />
                </mesh>

                {/* "AVAILABLE SPACES" Header - White Bold */}
                <Text
                    position={[-0.7, 1.4, 0.06]}
                    fontSize={0.14}
                    color="#ffffff"
                    anchorX="left"
                    anchorY="middle"
                    fontWeight="bold"
                >
                    AVAILABLE SPACES
                </Text>

                {/* Level Listings - White Bold Text (4 floors only) */}
                {[
                    { level: "LEVEL 4", spaces: 160, y: 0.9 },
                    { level: "LEVEL 3", spaces: 173, y: 0.4 },
                    { level: "LEVEL 2", spaces: 134, y: -0.1 },
                    { level: "LEVEL 1", spaces: 80, y: -0.6 },
                ].map((item, i) => (
                    <group key={i} position={[0, item.y, 0.06]}>
                        {/* Level Label - White Bold */}
                        <Text
                            position={[-0.7, 0, 0.01]}
                            fontSize={0.12}
                            color="#ffffff"
                            anchorX="left"
                            anchorY="middle"
                            fontWeight="bold"
                        >
                            {item.level}
                        </Text>

                        {/* Blue Line */}
                        <mesh position={[0.1, 0, 0]}>
                            <boxGeometry args={[0.4, 0.01, 0.01]} />
                            <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.5} />
                        </mesh>

                        {/* Spaces Number - White Bold */}
                        <Text
                            position={[0.7, 0, 0.01]}
                            fontSize={0.16}
                            color="#ffffff"
                            anchorX="right"
                            anchorY="middle"
                            fontWeight="bold"
                        >
                            {item.spaces}
                        </Text>
                    </group>
                ))}
            </group>
        </group>
    )
}

// Parking Sensor Component
const ParkingSensor = ({ position = [0, 0, 0], carPosition }) => {
    const sensorRef = useRef()
    const lightRef = useRef()
    const glowMaterialRef = useRef()
    const bottomMaterialRef = useRef()
    const topMaterialRef = useRef()
    const baseY = position[1]

    useFrame((state) => {
        // Subtle floating animation
        if (sensorRef.current) {
            sensorRef.current.position.y = baseY + Math.sin(state.clock.elapsedTime * 1.5) * 0.1
        }

        // Check if car is parked at this specific sensor's position
        const isParked = carPosition &&
            Math.abs(carPosition.x - position[0]) < 1.0 &&
            Math.abs(carPosition.z - position[2]) < 1.0

        const glowColor = isParked ? "#ef4444" : "#4ade80" // Red when parked, green otherwise

        // Update light color
        if (lightRef.current) {
            lightRef.current.color.set(glowColor)
        }

        // Update emissive material color
        if (glowMaterialRef.current) {
            glowMaterialRef.current.color.set(glowColor)
            glowMaterialRef.current.emissive.set(glowColor)
        }

        // Update bottom section color
        if (bottomMaterialRef.current) {
            bottomMaterialRef.current.color.set(glowColor)
        }

        // Update top section glow color
        if (topMaterialRef.current) {
            topMaterialRef.current.emissive.set(glowColor)
            topMaterialRef.current.emissiveIntensity = isParked ? 0.6 : 0.4
        }
    })

    return (
        <group ref={sensorRef} position={[position[0], baseY, position[2]]}>
            {/* Main white circular body with glowing top */}
            <mesh position={[0, 0.15, 0]} castShadow>
                <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
                <meshStandardMaterial
                    ref={topMaterialRef}
                    color="#1e293b"
                    roughness={0.3}
                    metalness={0.1}
                    emissive="#4ade80"
                    emissiveIntensity={0.4}
                />
            </mesh>

            {/* Translucent bottom section (green/red) */}
            <mesh position={[0, 0.05, 0]}>
                <cylinderGeometry args={[0.4, 0.4, 0.1, 32]} />
                <meshPhysicalMaterial
                    ref={bottomMaterialRef}
                    color="#4ade80"
                    transmission={0.8}
                    thickness={0.1}
                    roughness={0.1}
                    metalness={0.0}
                />
            </mesh>

            {/* Small circular sensor elements on sides */}
            {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, i) => (
                <mesh
                    key={i}
                    position={[
                        Math.cos(angle) * 0.35,
                        0.15,
                        Math.sin(angle) * 0.35
                    ]}
                >
                    <cylinderGeometry args={[0.03, 0.03, 0.05, 16]} />
                    <meshStandardMaterial color="#1e293b" />
                </mesh>
            ))}

            {/* Brand text (simplified as a small disc) */}
            <mesh position={[0, 0.32, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[0.25, 32]} />
                <meshStandardMaterial color="#334155" roughness={0.5} />
            </mesh>

            {/* Glow from sensor (green/red) */}
            <pointLight
                ref={lightRef}
                position={[0, 0.1, 0]}
                intensity={2}
                distance={5}
                color="#4ade80"
            />
            {/* Additional glow effect with emissive material */}
            <mesh position={[0, 0.05, 0]}>
                <cylinderGeometry args={[0.45, 0.45, 0.12, 32]} />
                <meshStandardMaterial
                    ref={glowMaterialRef}
                    color="#4ade80"
                    emissive="#4ade80"
                    emissiveIntensity={0.8}
                />
            </mesh>
        </group>
    )
}

/**
 * EV Charging Station Component
 */
export const ChargingStation = ({ position, rotation = [0, 0, 0] }) => {
    return (
        <group position={position} rotation={rotation}>
            {/* Main Body - Scaled up */}
            <mesh position={[0, 1.75, 0]}>
                <boxGeometry args={[0.8, 3.5, 0.6]} />
                <meshStandardMaterial color="#27272a" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Screen Area - Larger */}
            <mesh position={[0, 2.6, 0.31]}>
                <planeGeometry args={[0.5, 0.8]} />
                <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={3} />
            </mesh>
            {/* Status Light */}
            <mesh position={[0, 3.2, 0.31]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={5} />
            </mesh>
            {/* Cable/Plug Detail */}
            <mesh position={[0.42, 1.75, 0]}>
                <boxGeometry args={[0.1, 1.5, 0.2]} />
                <meshStandardMaterial color="#111" />
            </mesh>
            <pointLight position={[0, 2.6, 0.5]} intensity={2} color="#3b82f6" distance={5} />
        </group>
    )
}

/**
 * Simple Security Camera
 */
export const SecurityCamera = ({
    position,
    rotation = [0, 1, 0],
    scale = 1.7,
}) => {
    return (
        <group position={position} rotation={rotation} scale={scale}>
            {/* Striped Vertical Support Rod */}
            {Array.from({ length: 8 }).map((_, i) => (
                <mesh key={i} position={[0, -(i * 1 + 0.5), 0]}>
                    <cylinderGeometry args={[0.04, 0.04, 1, 32]} />
                    <meshStandardMaterial
                        color={i % 2 === 0 ? "#2563eb" : "#ffffff"}
                        metalness={0.7}
                        roughness={0.3}
                    />
                </mesh>
            ))}

            {/* Camera body (bullet CCTV style) */}
            <group position={[0, 0.001, 0.26]} rotation={[0.35, 0, 0]} scale={0.7}>
                {/* Main housing - white professional camera */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.14, 0.14, 0.36, 40]} />
                    <meshStandardMaterial
                        color="#0b098fff"
                        metalness={0.4}
                        roughness={0.3}
                    />
                </mesh>

                {/* Dark gray band around body */}
                <mesh position={[0, 0, -0.05]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.145, 0.145, 0.08, 40]} />
                    <meshStandardMaterial
                        color="#404040"
                        metalness={0.6}
                        roughness={0.3}
                    />
                </mesh>

                {/* Front black lens housing */}
                <mesh position={[0, 0, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.13, 0.13, 0.04, 32]} />
                    <meshStandardMaterial
                        color="#0a0a0a"
                        metalness={0.9}
                        roughness={0.1}
                    />
                </mesh>

                {/* Outer lens ring */}
                <mesh position={[0, 0, 0.225]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.09, 0.09, 0.02, 32]} />
                    <meshStandardMaterial
                        color="#1a1a1a"
                        metalness={0.95}
                        roughness={0.05}
                    />
                </mesh>

                {/* Lens glass with reflection */}
                <mesh position={[0, 0, 0.24]}>
                    <circleGeometry args={[0.075, 32]} />
                    <meshStandardMaterial
                        color="#050505"
                        metalness={1}
                        roughness={0.02}
                        emissive="#0d47a1"
                        emissiveIntensity={0.3}
                    />
                </mesh>

                {/* Inner lens element */}
                <mesh position={[0, 0, 0.245]}>
                    <circleGeometry args={[0.045, 32]} />
                    <meshStandardMaterial
                        color="#1e3a8a"
                        metalness={0.9}
                        roughness={0.1}
                        emissive="#1e40af"
                        emissiveIntensity={0.4}
                    />
                </mesh>

                {/* Center lens reflection */}
                <mesh position={[0, 0, 0.25]}>
                    <circleGeometry args={[0.018, 32]} />
                    <meshBasicMaterial color="#3b82f6" opacity={0.8} transparent />
                </mesh>

                {/* Infrared LEDs ring */}
                {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                    const rad = (angle * Math.PI) / 180;
                    const x = Math.cos(rad) * 0.095;
                    const y = Math.sin(rad) * 0.095;
                    return (
                        <mesh key={i} position={[x, y, 0.22]}>
                            <circleGeometry args={[0.012, 16]} />
                            <meshStandardMaterial
                                color="#2d1f1f"
                                emissive="#5c0f0f"
                                emissiveIntensity={0.6}
                            />
                        </mesh>
                    );
                })}

                {/* Status LED - small and realistic */}
                <mesh position={[0.105, 0.02, 0.16]}>
                    <sphereGeometry args={[0.008, 16, 16]} />
                    <meshStandardMaterial
                        color="#10b981"
                        emissive="#10b981"
                        emissiveIntensity={4}
                    />
                </mesh>

                {/* Brand logo area (subtle embossed rectangle) */}
                <mesh position={[0, -0.09, 0.15]}>
                    <boxGeometry args={[0.08, 0.02, 0.001]} />
                    <meshStandardMaterial
                        color="#e5e7eb"
                        metalness={0.3}
                        roughness={0.4}
                    />
                </mesh>

                {/* Cable running down */}
                <mesh position={[0.08, 0, -0.25]} rotation={[0, 0, 0]}>
                    <cylinderGeometry args={[0.008, 0.008, 0.15, 40]} />
                    <meshStandardMaterial
                        color="#0a0a0a"
                        metalness={0.3}
                        roughness={0.7}
                    />
                </mesh>
            </group>
        </group>
    );
};

// Parking Space Component
const ParkingSpace = ({ position, active = false }) => {
    const color = active ? "#10b981" : "#60a5fa"
    const emissiveIntensity = active ? 2 : 0.2

    return (
        <group position={position}>
            {/* Horizontal Side Lines */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -2.5]}>
                <planeGeometry args={[10, 0.08]} />
                <meshStandardMaterial color={color} opacity={0.6} transparent emissive={color} emissiveIntensity={emissiveIntensity} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 2.5]}>
                <planeGeometry args={[10, 0.08]} />
                <meshStandardMaterial color={color} opacity={0.6} transparent emissive={color} emissiveIntensity={emissiveIntensity} />
            </mesh>
            {/* Back Line */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-5, 0, 0]}>
                <planeGeometry args={[0.08, 5.08]} />
                <meshStandardMaterial color={active ? "#34d399" : "#22d3ee"} emissive={active ? "#34d399" : "#22d3ee"} emissiveIntensity={active ? 2 : 0.5} />
            </mesh>
            {/* Ground Decal */}
            <mesh position={[-4, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.8, 1.2]} />
                <meshStandardMaterial color={active ? "#065f46" : "#1e3a8a"} roughness={0.1} metalness={0.5} emissive={active ? "#10b981" : "#000"} emissiveIntensity={active ? 0.5 : 0} />
            </mesh>
            {active && (
                <spotLight
                    position={[0, 10, 0]}
                    angle={0.4}
                    penumbra={1}
                    intensity={20}
                    color="#10b981"
                    castShadow
                />
            )}
        </group>
    )
}

const ParkingRows = ({ type }) => {
    const scroll = useScroll()
    // Trigger green light only when the car is actively within the parked sequence
    const isParked = scroll.offset > 0.78 && scroll.offset < 0.92
    const config = {
        L: { pos: [-15, 0.02, -60], count: 6, gap: 20 },
        R: { pos: [22, 0.02, -60], count: 6, gap: 20 },
        LL: { pos: [-22, 0.02, -40], count: 0, gap: 20 },
        RR: { pos: [29, 0.02, -40], count: 0, gap: 20 },
    }[type]

    return Array.from({ length: config.count }).map((_, i) => {
        const z = config.pos[2] + i * config.gap
        // Only render spots that are BEHIND the gate (gate is at z=110)
        if (z > 105) return null

        // Spot at z=0 in row L is the parking spot
        const isActive = isParked && type === 'L' && z === 0

        return (
            <ParkingSpace
                key={`${type}${i}`}
                position={[config.pos[0], config.pos[1], z]}
                active={isActive}
            />
        )
    })
}

/**
 * Parking Environment - Garage structure with barrier and dashboard
 */
export const ParkingEnvironment = () => {
    const { size } = useThree()
    const isMobile = size.width < 768
    const scroll = useScroll()
    const logoTexture = useTexture('/logo.svg')

    // Create grid of columns/pillars
    const columns = []
    const spacingX = 10
    const spacingZ = 12

    // Create grid of columns
    // Remove every alternate pillar starting from the second pillar
    for (let x = -2; x <= 2; x++) {
        for (let z = -5; z <= 5; z++) {
            if (x !== 0) { // Keep center lane clear
                // Starting from second pillar (z = -4), remove every alternate one
                // Keep: z = -5, -3, -1, 1, 3, 5
                // Remove: z = -4, -2, 0, 2, 4
                const isSecondOrAlternate = (z + 5) % 2 === 1 // z = -4, -2, 0, 2, 4
                if (!isSecondOrAlternate) {
                    // Adjust right side pillars to be equally spaced
                    // Left: x = -2, -1 → positions: -20, -10
                    // Right: x = 1, 2 → adjust to match spacing, move back (further from center)
                    let xPosition = x * spacingX
                    if (x > 0) {
                        // Move right side pillars back by 5 units for equal spacing
                        xPosition = x * spacingX + 5
                    }

                    // Move backside pillars (both sides) further back
                    let zPosition = z * spacingZ
                    // Backside pillars are at z = 3, 5 (the furthest back ones we're keeping)
                    if (z >= 3) {
                        zPosition = z * spacingZ + 8 // Move back by 8 units
                    }

                    columns.push(
                        <group key={`${x}-${z}`} position={[xPosition, 4, zPosition]}>
                            {/* Concrete Pillar - Increased height from 6 to 10 */}
                            <mesh castShadow receiveShadow>
                                <boxGeometry args={[1.5, 10, 1.5]} />
                                <meshStandardMaterial color="#334155" roughness={0.8} />
                            </mesh>
                            {/* LED Strip - Extended to match pillar height */}
                            <mesh position={[0.76, 0, 0]}>
                                <boxGeometry args={[0.05, 9, 0.2]} />
                                <meshBasicMaterial color="#0ea5e9" toneMapped={false} />
                            </mesh>
                            {/* Bay Number */}
                            <Text
                                position={[0.8, 1, 0]}
                                rotation={[0, Math.PI / 2, 0]}
                                fontSize={0.5}
                                color="white"
                                anchorX="center"
                                anchorY="middle"
                            >
                                {`B-${Math.abs(x)}${Math.abs(z)}`}
                            </Text>


                            {/* Charging Station - positioned on floor near pillar */}
                            <ChargingStation
                                position={[x < 0 ? 2 : -2, -4, 0]}
                                rotation={[0, x < 0 ? -Math.PI / 2 : Math.PI / 2, 0]}
                            />
                        </group>
                    )
                }
            }
        }
    }

    return (
        <group position={[0, -0.01, 0]}>
            {/* Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
                <planeGeometry args={[100, 200]} />
                <meshStandardMaterial
                    color="#1e293b"
                    roughness={0.4}
                    metalness={0.5}
                />
            </mesh>

            {/* Grid Lines on Floor */}
            <gridHelper args={[100, 20, 0x38bdf8, 0x334155]} position={[0, 0.01, 0]} />

            {/* Ceiling Lights - moved up to match increased pillar height */}
            <group position={[0, 9.8, 0]}>
                {Array.from({ length: 10 }).map((_, i) => (
                    <mesh key={i} position={[0, 0, (i - 5) * 15]} rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.2, 0.2, 8, 16]} />
                        <meshBasicMaterial color="#f8fafc" toneMapped={false} />
                        <pointLight intensity={0.5} distance={15} color="#f8fafc" />
                    </mesh>
                ))}
            </group>

            {/* Road/Aisle - Keep from City */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3.5, 0.01, 50]}>
                <planeGeometry args={[14, 400]} />
                <meshStandardMaterial color="#121212" roughness={0.5} />
            </mesh>

            {/* Logo in the middle of parking aisle - Keep from City */}
            <group position={[3.5, 0.02, 40]}>
                {/* Outer Glow/Ring */}
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[5, 64]} />
                    <meshStandardMaterial
                        color="#ffffff"
                        emissive="#ffffff"
                        emissiveIntensity={0.2}
                        transparent
                        opacity={0.6}
                    />
                </mesh>
                {/* Logo Texture */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                    <circleGeometry args={[4.8, 64]} />
                    <meshBasicMaterial map={logoTexture} transparent={true} />
                </mesh>
            </group>

            {/* Entry Security Checkpoint - Keep barrier from City */}
            <ParkingGate position={[9.5, 0, 110]} />

            {/* Security Camera near gate */}
            <SecurityCamera position={[9, 5, 112]} rotation={[0.2, -Math.PI / 4, 0]} scale={1.2} />

            {/* Parking Spaces Sign Dashboard - positioned in the middle of barrier area */}
            <ParkingSpacesSign position={[11.5, 0, 110]} rotation={[0, 0, 0]} />

            {/* Columns/Pillars */}
            {columns}

            {/* Parking Rows with Blue Lines */}
            <ParkingRows type="L" />
            <ParkingRows type="R" />
            <ParkingRows type="LL" />
            <ParkingRows type="RR" />

            {/* Green Glow Sensors at All Parking Spots */}
            <ParkingSensors />
        </group>
    )
}

// Sensor wrapper that tracks car position
const SensorWithCarTracking = ({ position }) => {
    const carPosition = useRef(new THREE.Vector3())
    const scroll = useScroll()

    useFrame(() => {
        // Approximate car position based on scroll offset
        if (scroll) {
            const offset = scroll.offset
            if (offset > 0.8) {
                // Car is parked at x: -15, z: 0
                carPosition.current.set(-15, 2, 0)
            } else if (offset > 0.6) {
                // Car is turning/parking
                const t = (offset - 0.6) / 0.2
                const x = THREE.MathUtils.lerp(3.5, -15, t)
                const z = THREE.MathUtils.lerp(10, 0, t)
                carPosition.current.set(x, 2, z)
            } else {
                // Car is driving forward
                const t = offset / 0.6
                const z = 150 - t * 140
                carPosition.current.set(3.5, 2, z)
            }
        }
    })

    return <ParkingSensor position={position} carPosition={carPosition.current} />
}

// Add sensors to all parking slots
const ParkingSensors = () => {
    const scroll = useScroll()
    const carPosition = useRef(new THREE.Vector3())

    useFrame(() => {
        // Track car position for all sensors
        if (scroll) {
            const offset = scroll.offset
            if (offset > 0.8) {
                carPosition.current.set(-15, 2, 0)
            } else if (offset > 0.6) {
                const t = (offset - 0.6) / 0.2
                const x = THREE.MathUtils.lerp(3.5, -15, t)
                const z = THREE.MathUtils.lerp(10, 0, t)
                carPosition.current.set(x, 2, z)
            } else {
                const t = offset / 0.6
                const z = 150 - t * 140
                carPosition.current.set(3.5, 2, z)
            }
        }
    })

    const sensors = []

    // Parking slot configurations (same as ParkingRows)
    const configs = [
        { type: 'L', pos: [-15, 0.15, -60], count: 6, gap: 20 },
        { type: 'R', pos: [22, 0.15, -60], count: 6, gap: 20 },
        { type: 'LL', pos: [-22, 0.15, -40], count: 0, gap: 20 },
        { type: 'RR', pos: [29, 0.15, -40], count: 0, gap: 20 },
    ]

    configs.forEach((config) => {
        for (let i = 0; i < config.count; i++) {
            const z = config.pos[2] + i * config.gap
            // Only render sensors that are BEHIND the gate (gate is at z=110)
            if (z > 105) continue

            sensors.push(
                <ParkingSensor
                    key={`sensor-${config.type}-${i}`}
                    position={[config.pos[0] - 4, config.pos[1], z]}
                    carPosition={carPosition.current}
                />
            )
        }
    })

    return <>{sensors}</>
}
