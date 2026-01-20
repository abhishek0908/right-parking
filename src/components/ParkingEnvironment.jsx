import { useRef, useMemo } from 'react'
import { useScroll, useTexture, Html, Text, Instances, Instance } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { ParkingGate } from './City'

// Shared Optimized Geometries
const pillarGeometry = new THREE.BoxGeometry(1.5, 10, 1.5)
const sensorGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 16)
const sensorGlowGeometry = new THREE.CylinderGeometry(0.45, 0.45, 0.12, 16)

// Parking Spaces Sign Component
const ParkingSpacesSign = ({ position = [0, 0, 0], rotation = [0, Math.PI, 0] }) => {
    return (
        <group position={position} rotation={rotation}>
            <mesh position={[-0.4, 1.2, -0.05]} castShadow>
                <boxGeometry args={[0.15, 1.5, 0.15]} />
                <meshStandardMaterial color="#1e293b" />
            </mesh>
            <mesh position={[0.4, 1.2, -0.05]} castShadow>
                <boxGeometry args={[0.15, 1.5, 0.15]} />
                <meshStandardMaterial color="#1e293b" />
            </mesh>

            <group position={[0, 3, 0]}>
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[1.8, 3.5, 0.1]} />
                    <meshStandardMaterial color="#000000" />
                </mesh>

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

                {[
                    { level: "LEVEL 4", spaces: 160, y: 0.9 },
                    { level: "LEVEL 3", spaces: 173, y: 0.4 },
                    { level: "LEVEL 2", spaces: 134, y: -0.1 },
                    { level: "LEVEL 1", spaces: 80, y: -0.6 },
                ].map((item, i) => (
                    <group key={i} position={[0, item.y, 0.06]}>
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
                        <mesh position={[0.1, 0, 0]}>
                            <boxGeometry args={[0.4, 0.01, 0.01]} />
                            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} />
                        </mesh>
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

/**
 * Centralized Hanging Aisle Sign (Shows both directions)
 */
const CentralAisleSign = ({ position, spacesL = 5, spacesR = 5 }) => {
    return (
        <group position={position}>
            {/* Hanging Support Wires */}
            <mesh position={[-1.5, 1.2, 0]}>
                <cylinderGeometry args={[0.01, 0.01, 2.5, 8]} />
                <meshStandardMaterial color="#3f3f46" metalness={1} />
            </mesh>
            <mesh position={[1.5, 1.2, 0]}>
                <cylinderGeometry args={[0.01, 0.01, 2.5, 8]} />
                <meshStandardMaterial color="#3f3f46" metalness={1} />
            </mesh>

            {/* Main Sign Plate */}
            <mesh>
                <boxGeometry args={[4.2, 1.2, 0.15]} />
                <meshStandardMaterial color="#020617" metalness={1} roughness={0.1} />
            </mesh>

            {/* Glowing Emissive Backing */}
            <mesh position={[0, 0, -0.01]}>
                <boxGeometry args={[4.3, 1.3, 0.05]} />
                <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={2} transparent opacity={0.2} />
            </mesh>

            <Html
                transform
                distanceFactor={7}
                position={[0, 0, 0.1]}
                center
                portal={{ current: document.body }}
            >
                <div className="flex items-center justify-between bg-slate-900/80 backdrop-blur-3xl border-2 border-blue-500/40 px-8 py-3 rounded-full w-[450px] shadow-[0_0_60px_rgba(59,130,246,0.3)] ring-1 ring-white/10">
                    <div className="flex items-center gap-6 flex-1 justify-start border-r border-white/10 pr-6">
                        <div className="text-4xl font-black italic text-blue-400 animate-pulse">←</div>
                        <div className="flex flex-col items-start leading-none">
                            <span className="text-slate-500 text-[8px] font-black uppercase tracking-widest mb-1.5 pl-0.5">Left Row</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-white text-3xl font-black tracking-tighter">{spacesL}</span>
                                <span className="text-blue-500 text-[10px] font-bold">FREE</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 flex-1 justify-end pl-6">
                        <div className="flex flex-col items-end leading-none">
                            <span className="text-slate-500 text-[8px] font-black uppercase tracking-widest mb-1.5 pr-0.5">Right Row</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-emerald-500 text-[10px] font-bold">FREE</span>
                                <span className="text-white text-3xl font-black tracking-tighter">{spacesR}</span>
                            </div>
                        </div>
                        <div className="text-4xl font-black italic text-emerald-400 animate-pulse">→</div>
                    </div>
                </div>
            </Html>
        </group>
    )
}

/**
 * Charging Station Component
 */
export const ChargingStation = ({ position, rotation = [0, 0, 0] }) => {
    return (
        <group position={position} rotation={rotation}>
            <mesh position={[0, 1.75, 0]}>
                <boxGeometry args={[0.8, 3.5, 0.6]} />
                <meshStandardMaterial color="#27272a" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0, 2.6, 0.31]}>
                <planeGeometry args={[0.5, 0.8]} />
                <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
            </mesh>
            <mesh position={[0, 3.2, 0.31]}>
                <sphereGeometry args={[0.06, 8, 8]} />
                <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
            </mesh>
            <mesh position={[0.42, 1.75, 0]}>
                <boxGeometry args={[0.1, 1.5, 0.2]} />
                <meshStandardMaterial color="#111" />
            </mesh>
            {/* Localized pointLight removed to simplify environment lighting */}
        </group>
    )
}

/**
 * Simple Security Camera
 */
export const SecurityCamera = ({ position, rotation = [0, 1, 0], scale = 1.7 }) => {
    return (
        <group position={position} rotation={rotation} scale={scale}>
            {Array.from({ length: 8 }).map((_, i) => (
                <mesh key={i} position={[0, -(i * 1 + 0.5), 0]}>
                    <cylinderGeometry args={[0.04, 0.04, 1, 8]} />
                    <meshStandardMaterial color={i % 2 === 0 ? "#2563eb" : "#ffffff"} metalness={0.7} />
                </mesh>
            ))}
            <group position={[0, 0.001, 0.26]} rotation={[0.35, 0, 0]} scale={0.7}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.14, 0.14, 0.36, 16]} />
                    <meshStandardMaterial color="#0b098fff" metalness={0.4} />
                </mesh>
                <mesh position={[0.105, 0.02, 0.16]}>
                    <sphereGeometry args={[0.008, 8, 8]} />
                    <meshStandardMaterial color="#333333" emissive="#333333" emissiveIntensity={0} />
                </mesh>
            </group>
        </group>
    )
}

const ParkingSpace = ({ position, isHeroSpot = false }) => {
    const materialRef = useRef()
    const scroll = useScroll()

    useFrame(() => {
        if (!isHeroSpot || !materialRef.current) return

        // Dynamic color transition based on scroll offset
        const isOccupied = scroll.offset > 0.82
        const color = isOccupied ? "#ef4444" : "#22c55e"
        const intensity = isOccupied ? 2.5 : 1.5

        if (materialRef.current.color.getHex() !== new THREE.Color(color).getHex()) {
            materialRef.current.color.set(color)
            materialRef.current.emissive.set(color)
            materialRef.current.emissiveIntensity = intensity
        }
    })

    return (
        <group position={position}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -2.5]}>
                <planeGeometry args={[10, 0.08]} />
                <meshStandardMaterial color="#ffffff" opacity={0.3} transparent />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 2.5]}>
                <planeGeometry args={[10, 0.08]} />
                <meshStandardMaterial color="#ffffff" opacity={0.3} transparent />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-5, 0, 0]}>
                <planeGeometry args={[0.08, 5.08]} />
                <meshStandardMaterial color="#ffffff" opacity={0.4} transparent />
            </mesh>
            <mesh position={[position[0] < 0 ? 4.8 : -4.8, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.4, 3.5]} />
                <meshStandardMaterial
                    ref={materialRef}
                    color="#22c55e"
                    emissive="#22c55e"
                    emissiveIntensity={1.5}
                    toneMapped={false}
                />
            </mesh>
        </group>
    )
}

const ParkingRows = ({ type }) => {
    const scroll = useScroll()
    const config = useMemo(() => ({
        L: { pos: [-15, 0.02, -60], count: 6, gap: 20 },
        R: { pos: [22, 0.02, -60], count: 6, gap: 20 },
        LL: { pos: [-22, 0.02, -40], count: 0, gap: 20 },
        RR: { pos: [29, 0.02, -40], count: 0, gap: 20 },
    }[type]), [type])

    if (!config) return null

    return Array.from({ length: config.count }).map((_, i) => {
        const z = config.pos[2] + i * config.gap
        if (z > 105) return null

        // The hero car parks in Row L at z=0
        const isHeroSpot = type === 'L' && z === 0

        return <ParkingSpace
            key={`${type}${i}`}
            position={[config.pos[0], config.pos[1], z]}
            isHeroSpot={isHeroSpot}
        />
    })
}

/**
 * Optimized Parking Environment
 */
export const ParkingEnvironment = () => {
    const logoTexture = useTexture('/logo.svg')

    // Calculated Positions for Instancing
    const pillarData = useMemo(() => {
        const data = []
        for (let x = -2; x <= 2; x++) {
            if (x === 0) continue
            for (let z = -5; z <= 5; z++) {
                if ((z + 5) % 2 === 1) continue
                let xPos = x * 10
                if (x > 0) xPos += 5
                let zPos = z * 12
                if (z >= 3) zPos += 8
                data.push({ position: [xPos, 4, zPos], xSide: x })
            }
        }
        return data
    }, [])

    const signCounts = useMemo(() => {
        return Array.from({ length: 10 }).map(() => ({
            L: Math.floor(Math.random() * 8) + 1,
            R: Math.floor(Math.random() * 8) + 1
        }))
    }, [])

    return (
        <group position={[0, -0.01, 0]}>
            {/* Floor and Road - Heaviest items first */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
                <planeGeometry args={[100, 200]} />
                <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.5} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3.5, 0.01, 50]}>
                <planeGeometry args={[14, 400]} />
                <meshStandardMaterial color="#121212" roughness={0.5} />
            </mesh>

            {/* Instanced Pillars - Massive performance gain */}
            <Instances geometry={pillarGeometry}>
                <meshStandardMaterial color="#334155" roughness={0.8} />
                {pillarData.map((d, i) => (
                    <group key={i}>
                        <Instance position={d.position} />

                        {/* Vertical Neon Rod */}
                        <mesh position={[d.position[0] + (d.xSide < 0 ? 0.78 : -0.78), 4, d.position[2]]}>
                            <cylinderGeometry args={[0.06, 0.06, 7, 16]} />
                            <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={12} toneMapped={false} />
                        </mesh>

                        <Text
                            position={[d.position[0] + (d.xSide < 0 ? 0.8 : -0.8), 5, d.position[2]]}
                            rotation={[0, d.xSide < 0 ? Math.PI / 2 : -Math.PI / 2, 0]}
                            fontSize={0.5}
                            color="white"
                        >
                            {`B-${Math.abs(d.xSide)}${Math.abs(Math.floor(d.position[2] / 10))}`}
                        </Text>
                        <ChargingStation
                            position={[d.position[0] + (d.xSide < 0 ? 2 : -2), -4, d.position[2]]}
                            rotation={[0, d.xSide < 0 ? -Math.PI / 2 : Math.PI / 2, 0]}
                        />
                    </group>
                ))}
            </Instances>

            {/* Atmosphere */}
            <gridHelper args={[100, 20, 0x444444, 0x222222]} position={[0, 0.01, 0]} />
            <group position={[0, 9.8, 0]}>
                {Array.from({ length: 10 }).map((_, i) => (
                    <mesh key={i} position={[0, 0, (i - 5) * 15]} rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.2, 0.2, 8, 16]} />
                        <meshBasicMaterial color="#f8fafc" toneMapped={false} />
                    </mesh>
                ))}
            </group>

            {/* Dynamic Items */}
            <ParkingRows type="L" />
            <ParkingRows type="R" />
            <ParkingRows type="LL" />
            <ParkingRows type="RR" />
            <ParkingSensors />

            {/* Hanging Aisle Signs for Every Row */}
            {Array.from({ length: 6 }).map((_, i) => {
                const zPos = -60 + i * 20
                if (zPos > 105) return null // Consistent with ParkingRows limit
                return (
                    <CentralAisleSign
                        key={i}
                        position={[3.5, 9, zPos]}
                        spacesL={signCounts[i].L}
                        spacesR={signCounts[i].R}
                    />
                )
            })}

            {/* Static Decals */}
            <group position={[3.5, 0.02, 40]}>
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[5, 32]} />
                    <meshStandardMaterial color="#ffffff" transparent opacity={0.6} emissive="#ffffff" emissiveIntensity={0.2} />
                </mesh>
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                    <circleGeometry args={[4.8, 32]} />
                    <meshBasicMaterial map={logoTexture} transparent={true} />
                </mesh>
            </group>

            {/* Infrastructure */}
            <ParkingGate position={[9.5, 0, 110]} />
            <SecurityCamera position={[9, 5, 112]} rotation={[0.2, -Math.PI / 4, 0]} scale={1.2} />
            <ParkingSpacesSign position={[11.5, 0, 110]} rotation={[0, 0, 0]} />
        </group>
    )
}

const ParkingSensors = () => {
    const carPos = useRef(new THREE.Vector3())
    const scroll = useScroll()

    useFrame(() => {
        if (!scroll) return
        const offset = scroll.offset
        if (offset > 0.8) carPos.current.set(-15, 2, 0)
        else if (offset > 0.6) {
            const t = (offset - 0.6) / 0.2
            carPos.current.set(THREE.MathUtils.lerp(3.5, -15, t), 2, THREE.MathUtils.lerp(10, 0, t))
        } else {
            carPos.current.set(3.5, 2, 150 - (offset / 0.6) * 140)
        }
    })

    const sensorPositions = useMemo(() => {
        const positions = []
        const configs = [
            { type: 'L', pos: [-15, 0.15, -60], xShift: 4.8 },
            { type: 'R', pos: [22, 0.15, -60], xShift: -4.8 },
        ]
        configs.forEach(c => {
            for (let i = 0; i < 6; i++) {
                const z = c.pos[2] + i * 20
                if (z <= 105) positions.push([c.pos[0] + c.xShift, 0.15, z])
            }
        })
        return positions
    }, [])

    return (
        <Instances geometry={sensorGeometry}>
            <meshStandardMaterial color="#1e293b" />
            {sensorPositions.map((pos, i) => (
                <SensorGlow key={i} position={pos} carPos={carPos.current} />
            ))}
        </Instances>
    )
}

const SensorGlow = ({ position }) => {
    const color = "#ffffff"

    return (
        <group position={position}>
            <Instance />
            <mesh position={[0, 0.05, 0]} geometry={sensorGlowGeometry}>
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} transparent opacity={0.3} />
            </mesh>
        </group>
    )
}
