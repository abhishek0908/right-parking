import { useRef } from 'react'
import { Instances, Instance, useScroll, useTexture, Html } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Animated Parking Gate (Toll Style)
 */

export const ParkingGate = ({ position }) => {
    const armRef = useRef()
    const ticketRef = useRef()
    const scroll = useScroll()

    useFrame(() => {
        if (!armRef.current) return
        const offset = scroll.offset

        let targetRotation = 0
        let ticketPos = 0 // Offset for the ticket

        // Gate logic: Open during Philosophy section (slower transition)
        if (offset > 0.08 && offset < 0.25) {
            const t = (offset - 0.08) / 0.17
            targetRotation = -(Math.PI / 2) * t // Rotate UP
        } else if (offset >= 0.25 && offset <= 0.5) {
            targetRotation = -(Math.PI / 2)
        } else if (offset > 0.5 && offset < 0.6) {
            const t = 1 - (offset - 0.5) / 0.1
            targetRotation = -(Math.PI / 2) * t
        }

        // Ticket Animation: Slide out when car is approaching the gate (offset 0.15 to 0.3)
        if (offset > 0.12 && offset < 0.35) {
            // Smoothly slide out as car approaches
            const t = Math.min((offset - 0.12) / 0.15, 1)
            ticketPos = Math.sin(t * Math.PI) * 0.5 // Slide out further (0.5 units)
        }

        armRef.current.rotation.z = THREE.MathUtils.lerp(
            armRef.current.rotation.z,
            targetRotation,
            0.12
        )

        if (ticketRef.current) {
            // Pop UP from the top face
            ticketRef.current.position.y = 2.0 + ticketPos
        }
    })

    return (
        <group position={position}>
            {/* Main Machine Body */}
            <mesh position={[0, 1, 0]}>
                <boxGeometry args={[0.8, 2, 0.8]} />
                <meshStandardMaterial color="#27272a" metalness={0.8} roughness={0.4} />
            </mesh>

            {/* ANPR Display Board (Digital Sign) */}
            <group position={[0, 1.2, 0.41]}>
                {/* Board Frame */}
                <mesh>
                    <boxGeometry args={[0.6, 0.3, 0.05]} />
                    <meshStandardMaterial color="#000" />
                </mesh>
                {/* Digital Screen */}
                <Html
                    transform
                    distanceFactor={1.5}
                    position={[0, 0, 0.03]}
                >
                    <div
                        className="font-mono text-[8px] px-2 py-1 rounded border border-green-500/30 bg-black"
                        style={{
                            color: scroll.offset > 0.12 && scroll.offset < 0.4 ? '#22c55e' : '#1a1a1a',
                            textShadow: scroll.offset > 0.12 && scroll.offset < 0.4 ? '0 0 5px #22c55e' : 'none',
                            transition: 'all 0.5s ease-in-out'
                        }}
                    >
                        {scroll.offset > 0.15 ? 'DL 3C AW 1234' : 'SCANNING...'}
                    </div>
                </Html>
            </group>

            {/* Ticket Slot Detail - Placed on the top face */}
            <mesh position={[0, 2.0, 0.25]}>
                <boxGeometry args={[0.4, 0.02, 0.05]} />
                <meshStandardMaterial color="#111" />
            </mesh>

            {/* 🎟️ THE TICKET - Pops up from the top face */}
            <mesh ref={ticketRef} position={[0, 2.0, 0.25]}>
                <boxGeometry args={[0.3, 0.4, 0.01]} />
                <meshStandardMaterial
                    color="#ffffff"
                    emissive="#60a5fa"
                    emissiveIntensity={2}
                    toneMapped={false}
                />
            </mesh>

            {/* Top Cap - Blue Glow */}
            <mesh position={[0, 2.05, 0]}>
                <boxGeometry args={[0.9, 0.1, 0.9]} />
                <meshStandardMaterial color="#444444" />
            </mesh>

            {/* 🔑 HINGE GROUP (rotation on Z axis) */}
            <group ref={armRef} position={[0, 1.8, 0]}>
                <mesh position={[-5, 0, 0]}>
                    <boxGeometry args={[10, 0.15, 0.15]} />
                    <meshStandardMaterial color="#ffffff" />
                </mesh>

                {/* Blue stripes along X */}
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <mesh key={i} position={[-i * 1.2, 0, 0]}>
                        <boxGeometry args={[0.4, 0.16, 0.16]} />
                        <meshStandardMaterial color="#3b82f6" />
                    </mesh>
                ))}
            </group>

            {/* Indicator - Blue */}
            {/* Localized indicator light removed */}
        </group>
    )
}

/**
 * EV Charging Station
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
                <meshStandardMaterial color="#333333" />
            </mesh>
            {/* Status Light */}
            <mesh position={[0, 3.2, 0.31]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshStandardMaterial color="#444444" />
            </mesh>
            {/* Cable/Plug Detail */}
            <mesh position={[0.42, 1.75, 0]}>
                <boxGeometry args={[0.1, 1.5, 0.2]} />
                <meshStandardMaterial color="#111" />
            </mesh>
            {/* pointLight removed */}
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

                {/* Infrared LEDs ring - Neutralised */}
                {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                    const rad = (angle * Math.PI) / 180;
                    const x = Math.cos(rad) * 0.095;
                    const y = Math.sin(rad) * 0.095;
                    return (
                        <mesh key={i} position={[x, y, 0.22]}>
                            <circleGeometry args={[0.012, 16]} />
                            <meshStandardMaterial
                                color="#222222"
                            />
                        </mesh>
                    );
                })}

                {/* Status LED - Neutralised */}
                <mesh position={[0.105, 0.02, 0.16]}>
                    <sphereGeometry args={[0.008, 16, 16]} />
                    <meshStandardMaterial
                        color="#333333"
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

/**
 * Floor Space Info Board - Real Parking Display Style
 */
export const FloorSpaceBoard = ({ position, rotation = [0, 0, 0] }) => {
    const levels = [
        { level: "01", icon: "🏍️", spaces: "747" },
        { level: "01", icon: "🚗", spaces: "107" },
        { level: "02", icon: "🚗", spaces: "76" },
        { level: "03", icon: "🚗", spaces: "98" },
    ]

    return (
        <group position={position} rotation={rotation}>
            {/* Green Base/Pedestal */}
            <mesh position={[0, -4, 0]}>
                <boxGeometry args={[0.8, 2, 3.5]} />
                <meshStandardMaterial color="#16a34a" metalness={0.3} roughness={0.6} />
            </mesh>

            {/* Main Black Board Mesh Background */}
            <mesh position={[0.1, 0, 10]} rotation={[0, Math.PI / 2, 0]}>
                <boxGeometry args={[5, 3.8, 0.2]} />
                <meshStandardMaterial color="#18181b" metalness={0.8} roughness={0.2} />
            </mesh>

            <Html
                position={[0.21, 0, 10]}
                center
                transform
                distanceFactor={6}
                rotation={[0, Math.PI / 2, 0]}
                portal={{ current: document.body }}
            >
                <div className="p-6 w-[380px]" style={{ fontFamily: 'monospace' }}>


                    {/* Title */}
                    <div className="text-white text-center text-lg font-bold tracking-widest mb-4 border-b border-zinc-600 pb-3">
                        AVAILABLE PARKING SPACES
                    </div>

                    {/* Level Rows */}
                    <div className="space-y-2">
                        {levels.map((item, i) => (
                            <div key={i} className="flex items-center justify-between bg-zinc-800/50 px-4 py-3">
                                <div className="flex items-center gap-4">
                                    <span className="text-white text-sm font-bold">LEVEL {item.level}</span>
                                    <span className="text-2xl">{item.icon}</span>
                                </div>
                                <div className="text-green-400 text-4xl font-black tracking-widest" style={{
                                    textShadow: '0 0 10px #22c55e, 0 0 20px #22c55e, 0 0 30px #22c55e',
                                    fontFamily: 'monospace'
                                }}>
                                    {item.spaces}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-4 pt-3 border-t border-zinc-600 flex justify-between items-center">
                        <span className="text-zinc-500 text-xs">LIVE UPDATE</span>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
                            <span className="text-green-400 text-xs font-bold">ONLINE</span>
                        </div>
                    </div>
                </div>
            </Html>

            {/* Light on the board */}
            <pointLight position={[2, 0, 0]} intensity={15} color="#22c55e" distance={8} />
        </group>
    )
}

/**
 * Centralized Hanging Aisle Sign (Shows both directions)
 */
export const CentralAisleSign = ({ position, spacesL = 5, spacesR = 5 }) => {
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
                    {/* Left Section */}
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

                    {/* Right Section */}
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

// Dedicated components for instanced parts
const PillarInternal = ({ position, isMobile }) => (
    <group position={position}>
        <Instance />
        <group position={[0, -2, 0]}>
            <mesh position={[0, 0, 0.76]}><planeGeometry args={[1.5, 2]} /><meshStandardMaterial color="#3b82f6" /></mesh>
            <mesh position={[0, 0, -0.76]} rotation={[0, Math.PI, 0]}><planeGeometry args={[1.5, 2]} /><meshStandardMaterial color="#3b82f6" /></mesh>
            <mesh position={[0.76, 0, 0]} rotation={[0, Math.PI / 2, 0]}><planeGeometry args={[1.5, 2]} /><meshStandardMaterial color="#3b82f6" /></mesh>
            <mesh position={[-0.76, 0, 0]} rotation={[0, -Math.PI / 2, 0]}><planeGeometry args={[1.5, 2]} /><meshStandardMaterial color="#3b82f6" /></mesh>
        </group>
        <mesh position={[0, 5.8, 0]}>
            <boxGeometry args={[3, 0.1, 0.8]} />
            <meshStandardMaterial color="#ffffff" emissive="#60a5fa" emissiveIntensity={5} />
        </mesh>
        <pointLight position={[0, 5.5, 0]} intensity={15} distance={20} color="#60a5fa" castShadow={false} />
    </group>
)

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
        L: { pos: [-7, 0.02, -60], count: 6, gap: 20 },
        R: { pos: [14, 0.02, -60], count: 6, gap: 20 },
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

export const City = () => {
    const { size } = useThree()
    const isMobile = size.width < 768
    const pillarCount = 3
    const scroll = useScroll()

    // Load the logo texture
    const logoTexture = useTexture('/logo.svg')

    return (
        <group position={[0, -0.01, 0]}>
            {/* Ground - Deep Blue Concrete */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow={!isMobile}>
                <planeGeometry args={[1200, 1200]} />
                <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.2} />
            </mesh>

            {/* Ceiling - Mall Indoor feel - Fades out for Bird Eye View */}
            <mesh
                rotation={[Math.PI / 2, 0, 0]}
                position={[0, 12, 0]}
                visible={scroll.offset < 0.9} // Hide when zooming out for bird eye
            >
                <planeGeometry args={[200, 400]} />
                <meshStandardMaterial color="#020617" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Walls - Blue tinted obsidian */}
            <mesh position={[-18, 6, 0]} rotation={[0, Math.PI / 2, 0]}>
                <planeGeometry args={[400, 12]} />
                <meshStandardMaterial color="#020617" />
            </mesh>
            <mesh position={[25, 6, 0]} rotation={[0, -Math.PI / 2, 0]}>
                <planeGeometry args={[400, 12]} />
                <meshStandardMaterial color="#020617" />
            </mesh>
            <mesh position={[0, 6, -80]} rotation={[0, 0, 0]}>
                <planeGeometry args={[100, 12]} />
                <meshStandardMaterial color="#020617" />
            </mesh>

            {/* Road/Aisle */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3.5, 0.01, 50]}>
                <planeGeometry args={[14, 400]} />
                <meshStandardMaterial color="#121212" roughness={0.5} />
            </mesh>

            {/* Logo in the middle of parking aisle */}
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

            {/* Entry Security Checkpoint */}
            <ParkingGate position={[9.5, 0, 110]} />

            {/* Security Cameras */}
            <SecurityCamera position={[9, 5, 112]} rotation={[0.2, -Math.PI / 4, 0]} />
            {/* <SecurityCamera position={[-2.5, 4, 112]} rotation={[0.2, Math.PI / 4, 0]} />
            <SecurityCamera position={[3.5, 8, -15]} rotation={[0.5, Math.PI, 1]} /> */}

            {/* Floor Space Info Board - Relocated to the LEFT side near the gate, pushed slightly backward */}
            <FloorSpaceBoard
                position={[24, 2, 50]}
                rotation={[0, Math.PI + Math.PI / 2, 0]}
            />

            {/* Pillars with lighting */}
            <Instances range={40}>
                <boxGeometry args={[2, 12, 2]} />
                <meshStandardMaterial color="#27272a" roughness={0.4} metalness={0.2} />
                {Array.from({ length: pillarCount }).map((_, i) => {
                    const zPos = -40 + i * 20
                    return (
                        <group key={i}>
                            <PillarInternal position={[-15, 6, zPos]} isMobile={isMobile} />
                            <PillarInternal position={[22, 6, zPos]} isMobile={isMobile} />


                            {/* Central Hanging Aisle Sign for every row segment */}
                            <CentralAisleSign
                                position={[3.5, 9.5, zPos]}
                                spacesL={Math.floor(Math.random() * 10) + 2}
                                spacesR={Math.floor(Math.random() * 8) + 1}
                            />

                            {/* Charging Stations near pillars */}
                            <ChargingStation position={[-13.2, 0, zPos]} rotation={[0, Math.PI / 2, 0]} />
                            <ChargingStation position={[20.2, 0, zPos]} rotation={[0, -Math.PI / 2, 0]} />
                        </group>
                    )
                })}
            </Instances>

            <ParkingRows type="L" />
            <ParkingRows type="R" />
            <ParkingRows type="LL" />
            <ParkingRows type="RR" />
        </group>
    )
}
