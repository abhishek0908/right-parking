import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll, Html, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

// Realistic sports car made with React Three Fiber primitives
export const CarModel = ({ color = "#d40000", steering = 0, bodyTilt = 0, ...props }) => {
    return (
        <group {...props}>
            {/* Body Tilt Group */}
            <group rotation={[0, 0, bodyTilt]}>
                {/* ===== MAIN BODY ===== */}

                {/* Lower Body / Chassis */}
                <RoundedBox args={[2.1, 0.35, 4.8]} radius={0.1} position={[0, 0.25, 0]} castShadow>
                    <meshPhysicalMaterial
                        color={color}
                        metalness={0.9}
                        roughness={0.12}
                        clearcoat={1}
                        clearcoatRoughness={0.02}
                        envMapIntensity={1.5}
                    />
                </RoundedBox>

                {/* Upper Body - Main section with curved profile */}
                <RoundedBox args={[2.0, 0.4, 4.4]} radius={0.12} position={[0, 0.55, 0]} castShadow>
                    <meshPhysicalMaterial
                        color={color}
                        metalness={0.9}
                        roughness={0.12}
                        clearcoat={1}
                        clearcoatRoughness={0.02}
                        envMapIntensity={1.5}
                    />
                </RoundedBox>

                {/* Cabin / Greenhouse */}
                <RoundedBox args={[1.7, 0.45, 1.9]} radius={0.18} position={[0, 0.95, -0.2]} castShadow>
                    <meshPhysicalMaterial
                        color={color}
                        metalness={0.9}
                        roughness={0.12}
                        clearcoat={1}
                        clearcoatRoughness={0.02}
                        envMapIntensity={1.5}
                    />
                </RoundedBox>

                {/* ===== FRONT END ===== */}

                {/* Front Hood - Sloped with vents */}
                <mesh position={[0, 0.65, 1.6]} rotation={[0.15, 0, 0]} castShadow>
                    <boxGeometry args={[1.85, 0.2, 1.4]} />
                    <meshPhysicalMaterial
                        color={color}
                        metalness={0.9}
                        roughness={0.12}
                        clearcoat={1}
                    />
                </mesh>

                {/* Hood Vents */}
                <mesh position={[-0.35, 0.72, 1.3]} rotation={[0.15, 0, 0]}>
                    <boxGeometry args={[0.3, 0.02, 0.6]} />
                    <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.3} />
                </mesh>
                <mesh position={[0.35, 0.72, 1.3]} rotation={[0.15, 0, 0]}>
                    <boxGeometry args={[0.3, 0.02, 0.6]} />
                    <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.3} />
                </mesh>

                {/* Front Bumper */}
                <RoundedBox args={[2.15, 0.35, 0.4]} radius={0.08} position={[0, 0.22, 2.4]} castShadow>
                    <meshPhysicalMaterial color={color} metalness={0.9} roughness={0.12} clearcoat={1} />
                </RoundedBox>

                {/* Front Splitter */}
                <mesh position={[0, 0.08, 2.5]}>
                    <boxGeometry args={[2.0, 0.04, 0.25]} />
                    <meshStandardMaterial color="#0a0a0a" metalness={0.7} roughness={0.4} />
                </mesh>

                {/* Front Air Intakes */}
                <mesh position={[-0.55, 0.22, 2.45]}>
                    <boxGeometry args={[0.45, 0.18, 0.08]} />
                    <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
                </mesh>
                <mesh position={[0.55, 0.22, 2.45]}>
                    <boxGeometry args={[0.45, 0.18, 0.08]} />
                    <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
                </mesh>
                <mesh position={[0, 0.15, 2.45]}>
                    <boxGeometry args={[0.6, 0.12, 0.08]} />
                    <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
                </mesh>

                {/* ===== HEADLIGHTS ===== */}

                {/* Left Headlight Housing */}
                <mesh position={[-0.7, 0.48, 2.35]} rotation={[0, 0.1, 0]}>
                    <boxGeometry args={[0.45, 0.12, 0.15]} />
                    <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.5} />
                </mesh>
                {/* Left LED Strip */}
                <mesh position={[-0.7, 0.48, 2.42]}>
                    <boxGeometry args={[0.38, 0.04, 0.02]} />
                    <meshBasicMaterial color="#ffffff" />
                </mesh>
                {/* Left DRL */}
                <mesh position={[-0.7, 0.52, 2.42]}>
                    <boxGeometry args={[0.35, 0.015, 0.02]} />
                    <meshBasicMaterial color="#88ccff" />
                </mesh>

                {/* Right Headlight Housing */}
                <mesh position={[0.7, 0.48, 2.35]} rotation={[0, -0.1, 0]}>
                    <boxGeometry args={[0.45, 0.12, 0.15]} />
                    <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.5} />
                </mesh>
                {/* Right LED Strip */}
                <mesh position={[0.7, 0.48, 2.42]}>
                    <boxGeometry args={[0.38, 0.04, 0.02]} />
                    <meshBasicMaterial color="#ffffff" />
                </mesh>
                {/* Right DRL */}
                <mesh position={[0.7, 0.52, 2.42]}>
                    <boxGeometry args={[0.35, 0.015, 0.02]} />
                    <meshBasicMaterial color="#88ccff" />
                </mesh>

                {/* ===== WINDSHIELD & WINDOWS ===== */}

                {/* Windshield */}
                <mesh position={[0, 0.92, 0.85]} rotation={[-0.45, 0, 0]}>
                    <boxGeometry args={[1.55, 0.02, 0.85]} />
                    <meshPhysicalMaterial
                        color="#1a2030"
                        metalness={0.1}
                        roughness={0.02}
                        transparent
                        opacity={0.65}
                        envMapIntensity={2}
                    />
                </mesh>

                {/* Windshield Frame Top */}
                <mesh position={[0, 1.12, 0.55]} rotation={[-0.45, 0, 0]}>
                    <boxGeometry args={[1.65, 0.03, 0.06]} />
                    <meshStandardMaterial color="#0a0a0a" roughness={0.8} />
                </mesh>

                {/* Rear Window */}
                <mesh position={[0, 0.92, -1.1]} rotation={[0.55, 0, 0]}>
                    <boxGeometry args={[1.5, 0.02, 0.65]} />
                    <meshPhysicalMaterial
                        color="#1a2030"
                        metalness={0.1}
                        roughness={0.02}
                        transparent
                        opacity={0.65}
                        envMapIntensity={2}
                    />
                </mesh>

                {/* Side Windows Left */}
                <mesh position={[-0.86, 0.92, -0.15]} rotation={[0, 0, Math.PI / 2]}>
                    <boxGeometry args={[0.35, 0.02, 1.4]} />
                    <meshPhysicalMaterial color="#1a2030" transparent opacity={0.55} envMapIntensity={2} />
                </mesh>

                {/* Side Windows Right */}
                <mesh position={[0.86, 0.92, -0.15]} rotation={[0, 0, Math.PI / 2]}>
                    <boxGeometry args={[0.35, 0.02, 1.4]} />
                    <meshPhysicalMaterial color="#1a2030" transparent opacity={0.55} envMapIntensity={2} />
                </mesh>

                {/* ===== SIDE MIRRORS ===== */}

                {/* Left Mirror Arm */}
                <mesh position={[-1.0, 0.85, 0.6]} rotation={[0, 0.3, 0]}>
                    <boxGeometry args={[0.2, 0.05, 0.08]} />
                    <meshPhysicalMaterial color={color} metalness={0.9} roughness={0.12} clearcoat={1} />
                </mesh>
                {/* Left Mirror */}
                <mesh position={[-1.12, 0.85, 0.55]} rotation={[0, 0.2, 0]}>
                    <boxGeometry args={[0.08, 0.1, 0.15]} />
                    <meshPhysicalMaterial color={color} metalness={0.9} roughness={0.12} clearcoat={1} />
                </mesh>
                {/* Left Mirror Glass */}
                <mesh position={[-1.16, 0.85, 0.55]} rotation={[0, Math.PI / 2, 0]}>
                    <planeGeometry args={[0.12, 0.08]} />
                    <meshStandardMaterial color="#1a2030" metalness={0.9} roughness={0.1} />
                </mesh>

                {/* Right Mirror Arm */}
                <mesh position={[1.0, 0.85, 0.6]} rotation={[0, -0.3, 0]}>
                    <boxGeometry args={[0.2, 0.05, 0.08]} />
                    <meshPhysicalMaterial color={color} metalness={0.9} roughness={0.12} clearcoat={1} />
                </mesh>
                {/* Right Mirror */}
                <mesh position={[1.12, 0.85, 0.55]} rotation={[0, -0.2, 0]}>
                    <boxGeometry args={[0.08, 0.1, 0.15]} />
                    <meshPhysicalMaterial color={color} metalness={0.9} roughness={0.12} clearcoat={1} />
                </mesh>
                {/* Right Mirror Glass */}
                <mesh position={[1.16, 0.85, 0.55]} rotation={[0, -Math.PI / 2, 0]}>
                    <planeGeometry args={[0.12, 0.08]} />
                    <meshStandardMaterial color="#1a2030" metalness={0.9} roughness={0.1} />
                </mesh>

                {/* ===== DOOR DETAILS ===== */}

                {/* Left Door Line */}
                <mesh position={[-1.01, 0.55, 0.1]}>
                    <boxGeometry args={[0.01, 0.3, 1.8]} />
                    <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
                </mesh>
                {/* Left Door Handle */}
                <mesh position={[-1.03, 0.6, 0.3]}>
                    <boxGeometry args={[0.03, 0.04, 0.15]} />
                    <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.3} />
                </mesh>

                {/* Right Door Line */}
                <mesh position={[1.01, 0.55, 0.1]}>
                    <boxGeometry args={[0.01, 0.3, 1.8]} />
                    <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
                </mesh>
                {/* Right Door Handle */}
                <mesh position={[1.03, 0.6, 0.3]}>
                    <boxGeometry args={[0.03, 0.04, 0.15]} />
                    <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.3} />
                </mesh>

                {/* ===== SIDE SKIRTS ===== */}

                <mesh position={[-1.0, 0.12, 0]} castShadow>
                    <boxGeometry args={[0.12, 0.15, 3.8]} />
                    <meshStandardMaterial color="#0a0a0a" roughness={0.8} />
                </mesh>
                <mesh position={[1.0, 0.12, 0]} castShadow>
                    <boxGeometry args={[0.12, 0.15, 3.8]} />
                    <meshStandardMaterial color="#0a0a0a" roughness={0.8} />
                </mesh>

                {/* ===== REAR END ===== */}

                {/* Rear Bumper */}
                <RoundedBox args={[2.1, 0.4, 0.35]} radius={0.06} position={[0, 0.28, -2.35]} castShadow>
                    <meshPhysicalMaterial color={color} metalness={0.9} roughness={0.12} clearcoat={1} />
                </RoundedBox>

                {/* Rear Diffuser */}
                <mesh position={[0, 0.1, -2.45]}>
                    <boxGeometry args={[1.4, 0.12, 0.15]} />
                    <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
                </mesh>
                {/* Diffuser Fins */}
                {[-0.4, -0.2, 0, 0.2, 0.4].map((x, i) => (
                    <mesh key={i} position={[x, 0.1, -2.42]}>
                        <boxGeometry args={[0.02, 0.1, 0.08]} />
                        <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
                    </mesh>
                ))}

                {/* Exhaust Pipes */}
                <mesh position={[-0.5, 0.15, -2.48]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.06, 0.07, 0.1, 16]} />
                    <meshStandardMaterial color="#2a2a2a" metalness={0.95} roughness={0.15} />
                </mesh>
                <mesh position={[-0.35, 0.15, -2.48]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.06, 0.07, 0.1, 16]} />
                    <meshStandardMaterial color="#2a2a2a" metalness={0.95} roughness={0.15} />
                </mesh>
                <mesh position={[0.5, 0.15, -2.48]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.06, 0.07, 0.1, 16]} />
                    <meshStandardMaterial color="#2a2a2a" metalness={0.95} roughness={0.15} />
                </mesh>
                <mesh position={[0.35, 0.15, -2.48]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.06, 0.07, 0.1, 16]} />
                    <meshStandardMaterial color="#2a2a2a" metalness={0.95} roughness={0.15} />
                </mesh>

                {/* ===== TAILLIGHTS ===== */}

                {/* Left Taillight Housing */}
                <mesh position={[-0.7, 0.5, -2.38]}>
                    <boxGeometry args={[0.45, 0.12, 0.1]} />
                    <meshStandardMaterial color="#1a0000" metalness={0.3} roughness={0.4} />
                </mesh>
                {/* Left Taillight LED */}
                <mesh position={[-0.7, 0.5, -2.43]}>
                    <boxGeometry args={[0.4, 0.06, 0.02]} />
                    <meshBasicMaterial color="#ff1a1a" />
                </mesh>
                {/* Left Brake Light */}
                <mesh position={[-0.7, 0.46, -2.43]}>
                    <boxGeometry args={[0.35, 0.02, 0.02]} />
                    <meshBasicMaterial color="#ff0000" />
                </mesh>

                {/* Right Taillight Housing */}
                <mesh position={[0.7, 0.5, -2.38]}>
                    <boxGeometry args={[0.45, 0.12, 0.1]} />
                    <meshStandardMaterial color="#1a0000" metalness={0.3} roughness={0.4} />
                </mesh>
                {/* Right Taillight LED */}
                <mesh position={[0.7, 0.5, -2.43]}>
                    <boxGeometry args={[0.4, 0.06, 0.02]} />
                    <meshBasicMaterial color="#ff1a1a" />
                </mesh>
                {/* Right Brake Light */}
                <mesh position={[0.7, 0.46, -2.43]}>
                    <boxGeometry args={[0.35, 0.02, 0.02]} />
                    <meshBasicMaterial color="#ff0000" />
                </mesh>

                {/* Center Brake Light */}
                <mesh position={[0, 0.52, -2.43]}>
                    <boxGeometry args={[0.3, 0.025, 0.02]} />
                    <meshBasicMaterial color="#ff0000" />
                </mesh>

                {/* ===== REAR SPOILER ===== */}

                {/* Spoiler Mounts */}
                <mesh position={[-0.6, 1.08, -1.9]} castShadow>
                    <boxGeometry args={[0.08, 0.12, 0.08]} />
                    <meshStandardMaterial color="#0a0a0a" metalness={0.6} roughness={0.4} />
                </mesh>
                <mesh position={[0.6, 1.08, -1.9]} castShadow>
                    <boxGeometry args={[0.08, 0.12, 0.08]} />
                    <meshStandardMaterial color="#0a0a0a" metalness={0.6} roughness={0.4} />
                </mesh>
                {/* Spoiler Wing */}
                <mesh position={[0, 1.16, -1.95]} castShadow>
                    <boxGeometry args={[1.9, 0.04, 0.25]} />
                    <meshStandardMaterial color="#0a0a0a" metalness={0.6} roughness={0.3} />
                </mesh>
                {/* Spoiler End Plates */}
                <mesh position={[-0.92, 1.14, -1.95]} castShadow>
                    <boxGeometry args={[0.04, 0.12, 0.3]} />
                    <meshStandardMaterial color="#0a0a0a" metalness={0.6} roughness={0.3} />
                </mesh>
                <mesh position={[0.92, 1.14, -1.95]} castShadow>
                    <boxGeometry args={[0.04, 0.12, 0.3]} />
                    <meshStandardMaterial color="#0a0a0a" metalness={0.6} roughness={0.3} />
                </mesh>
            </group>

            {/* ===== WHEEL ARCHES (Fenders) ===== */}

            {/* Front Left Fender */}
            <mesh position={[-0.95, 0.35, 1.35]} castShadow>
                <boxGeometry args={[0.2, 0.3, 0.9]} />
                <meshPhysicalMaterial color={color} metalness={0.9} roughness={0.12} clearcoat={1} />
            </mesh>
            {/* Front Right Fender */}
            <mesh position={[0.95, 0.35, 1.35]} castShadow>
                <boxGeometry args={[0.2, 0.3, 0.9]} />
                <meshPhysicalMaterial color={color} metalness={0.9} roughness={0.12} clearcoat={1} />
            </mesh>
            {/* Rear Left Fender */}
            <mesh position={[-0.95, 0.35, -1.35]} castShadow>
                <boxGeometry args={[0.2, 0.3, 0.9]} />
                <meshPhysicalMaterial color={color} metalness={0.9} roughness={0.12} clearcoat={1} />
            </mesh>
            {/* Rear Right Fender */}
            <mesh position={[0.95, 0.35, -1.35]} castShadow>
                <boxGeometry args={[0.2, 0.3, 0.9]} />
                <meshPhysicalMaterial color={color} metalness={0.9} roughness={0.12} clearcoat={1} />
            </mesh>

            {/* ===== WHEELS ===== */}

            {/* Front Wheels (Steerable) */}
            <group position={[-0.95, 0.32, 1.4]} rotation={[0, steering, 0]}>
                <Wheel position={[0, 0, 0]} />
            </group>
            <group position={[0.95, 0.32, 1.4]} rotation={[0, steering, 0]}>
                <Wheel position={[0, 0, 0]} mirror />
            </group>

            {/* Rear Wheels (Fixed) */}
            <Wheel position={[-0.95, 0.32, -1.4]} />
            <Wheel position={[0.95, 0.32, -1.4]} mirror />
        </group>
    )
}

// Realistic Wheel component 
const Wheel = ({ position, mirror = false }) => (
    <group position={position}>
        {/* Tire - outer rubber */}
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <torusGeometry args={[0.24, 0.1, 16, 32]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.85} />
        </mesh>

        {/* Tire Sidewall Detail */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.32, 0.32, 0.18, 32]} />
            <meshStandardMaterial color="#222222" roughness={0.9} />
        </mesh>

        {/* Rim Base */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.2, 0.2, 0.16, 32]} />
            <meshStandardMaterial color="#303030" metalness={0.9} roughness={0.15} />
        </mesh>

        {/* Rim Face */}
        <group position={[mirror ? -0.09 : 0.09, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            {/* Center Cap */}
            <mesh>
                <cylinderGeometry args={[0.06, 0.06, 0.03, 24]} />
                <meshStandardMaterial color="#1a1a1a" metalness={0.85} roughness={0.2} />
            </mesh>
            {/* Center Logo Area */}
            <mesh position={[0.015, 0, 0]}>
                <cylinderGeometry args={[0.04, 0.04, 0.01, 24]} />
                <meshStandardMaterial color="#cc0000" metalness={0.7} roughness={0.3} />
            </mesh>
            {/* Spokes */}
            {[0, 1, 2, 3, 4].map(i => (
                <mesh key={i} rotation={[0, 0, (i / 5) * Math.PI * 2]}>
                    <boxGeometry args={[0.04, 0.22, 0.04]} />
                    <meshStandardMaterial color="#b8b8b8" metalness={0.95} roughness={0.08} />
                </mesh>
            ))}
            {/* Outer Rim Ring */}
            <mesh>
                <torusGeometry args={[0.18, 0.015, 8, 32]} />
                <meshStandardMaterial color="#a0a0a0" metalness={0.95} roughness={0.1} />
            </mesh>
        </group>

        {/* Brake Disc (visible through spokes) */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[mirror ? -0.02 : 0.02, 0, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.02, 32]} />
            <meshStandardMaterial color="#555555" metalness={0.8} roughness={0.4} />
        </mesh>

        {/* Brake Caliper */}
        <mesh position={[mirror ? -0.04 : 0.04, 0.08, 0]} rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[0.06, 0.04, 0.08]} />
            <meshStandardMaterial color="#cc0000" metalness={0.6} roughness={0.4} />
        </mesh>
    </group>
)

export const Car = () => {
    const group = useRef()
    const scroll = useScroll()
    const [showTag, setShowTag] = useState(false)
    const [steering, setSteering] = useState(0)
    const [bodyTilt, setBodyTilt] = useState(0)

    useFrame((state, delta) => {
        if (!group.current) return
        const offset = scroll.offset

        let x = 3, z = 35, rotY = Math.PI, steer = 0, tilt = 0

        const smoothstep = (t) => t * t * (3 - 2 * t)

        if (offset < 0.4) {
            // Phase 1: Straight drive towards the spot
            const t = offset / 0.4
            const ease = smoothstep(t)
            z = 40 - ease * 45 // 40 to -5
            x = 3
            rotY = Math.PI
            steer = 0
            setShowTag(false)
        } else if (offset < 0.8) {
            // Phase 2: Direct "Forward-In" Parking Arc
            const t = (offset - 0.4) / 0.4
            const ease = smoothstep(t)

            // Single smooth arc from lane into spot
            x = THREE.MathUtils.lerp(3, -5, ease)
            z = THREE.MathUtils.lerp(-5, -17, ease)

            // Steering matches the curve
            steer = (1 - ease) * 0.8
            rotY = Math.PI + ease * (Math.PI / 2) // Rotate 90 deg into spot

            // Lean into the turn
            tilt = -steer * 0.12
            setShowTag(false)
        } else {
            // Phase 3: Parked and Settled
            x = -5
            z = -17
            rotY = Math.PI + Math.PI / 2
            steer = 0
            tilt = 0
            setShowTag(true)
        }

        // Apply with lerp for smoothness
        group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, x, 0.1)
        group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, z, 0.1)
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, rotY, 0.1)

        setSteering(prev => THREE.MathUtils.lerp(prev, steer, 0.1))
        setBodyTilt(prev => THREE.MathUtils.lerp(prev, tilt, 0.1))
    })

    return (
        <group ref={group} position={[3, 0, 25]} rotation={[0, Math.PI, 0]}>
            <CarModel color="#d40000" scale={[0.8, 0.8, 0.8]} steering={steering} bodyTilt={bodyTilt} />

            {/* Headlights glow */}
            <spotLight
                position={[0.5, 0.4, 2]}
                intensity={15}
                angle={0.5}
                penumbra={0.5}
                color="#fff"
            />
            <spotLight
                position={[-0.5, 0.4, 2]}
                intensity={15}
                angle={0.5}
                penumbra={0.5}
                color="#fff"
            />

            {/* Floating Tag */}
            <Html position={[0, 2, 0]} center style={{ opacity: showTag ? 1 : 0, transition: 'opacity 0.6s', pointerEvents: 'none' }}>
                <div className="bg-white/90 backdrop-blur-md border-l-4 border-red-600 p-4 shadow-2xl rounded-lg">
                    <div className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1">Vehicle Match</div>
                    <div className="text-zinc-900 text-xl font-serif italic">Ferrari SF90 Stradale</div>
                </div>
            </Html>
        </group>
    )
}
