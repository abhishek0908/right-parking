import { useRef } from 'react'
import { Instances, Instance, useScroll, useTexture } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Animated Parking Gate (Toll Style)
 */

export const ParkingGate = ({ position }) => {
    const armRef = useRef()
    const scroll = useScroll()

    useFrame(() => {
        if (!armRef.current) return
        const offset = scroll.offset

        let targetRotation = 0

        // Gate logic: Open at the very start of the drive (z=110 area)
        if (offset > 0.05 && offset < 0.15) {
            const t = (offset - 0.05) / 0.1
            targetRotation = -(Math.PI / 2) * t // Rotate UP
        } else if (offset >= 0.15 && offset <= 0.4) {
            targetRotation = -(Math.PI / 2)
        } else if (offset > 0.4 && offset < 0.5) {
            const t = 1 - (offset - 0.4) / 0.1
            targetRotation = -(Math.PI / 2) * t
        }

        armRef.current.rotation.z = THREE.MathUtils.lerp(
            armRef.current.rotation.z,
            targetRotation,
            0.12
        )
    })

    return (
        <group position={position}>
            {/* Base */}
            <mesh position={[0, 1, 0]}>
                <boxGeometry args={[0.8, 2, 0.8]} />
                <meshStandardMaterial color="#27272a" metalness={0.8} roughness={0.4} />
            </mesh>

            {/* Top Cap - Blue Glow */}
            <mesh position={[0, 2.05, 0]}>
                <boxGeometry args={[0.9, 0.1, 0.9]} />
                <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={1} />
            </mesh>

            {/* 🔑 HINGE GROUP (rotation on Z axis) */}
            <group ref={armRef} position={[0, 1.8, 0]}>
                {/* 
                  Geometry is shifted along X so pivot stays at the base
                  Length = 10 to better cover the road
                */}
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
            <pointLight
                position={[0, 2.2, 0]}
                intensity={4}
                color="#3b82f6"
                distance={6}
            />
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
export const SecurityCamera = ({ position, rotation = [0, 0, 0] }) => {
    return (
        <group position={position} rotation={rotation}>
            <mesh>
                <boxGeometry args={[0.1, 0.4, 0.1]} />
                <meshStandardMaterial color="#27272a" />
            </mesh>
            <mesh position={[0, 0.2, 0.2]} rotation={[0.3, 0, 0]}>
                <boxGeometry args={[0.2, 0.2, 0.5]} />
                <meshStandardMaterial color="#3f3f46" />
                <mesh position={[0, 0, 0.26]}>
                    <planeGeometry args={[0.18, 0.18]} />
                    <meshBasicMaterial color="#000" />
                </mesh>
                <mesh position={[0.06, 0.06, 0.26]}>
                    <sphereGeometry args={[0.02]} />
                    <meshBasicMaterial color="#ef4444" />
                </mesh>
            </mesh>
        </group>
    )
}

// Dedicated components for instanced parts
const PillarInternal = ({ position, isMobile }) => (
    <group position={position}>
        <Instance />
        {!isMobile && (
            <group position={[0, -2, 0]}>
                <mesh position={[0, 0, 0.76]}><planeGeometry args={[1.5, 2]} /><meshStandardMaterial color="#3b82f6" /></mesh>
                <mesh position={[0, 0, -0.76]} rotation={[0, Math.PI, 0]}><planeGeometry args={[1.5, 2]} /><meshStandardMaterial color="#3b82f6" /></mesh>
                <mesh position={[0.76, 0, 0]} rotation={[0, Math.PI / 2, 0]}><planeGeometry args={[1.5, 2]} /><meshStandardMaterial color="#3b82f6" /></mesh>
                <mesh position={[-0.76, 0, 0]} rotation={[0, -Math.PI / 2, 0]}><planeGeometry args={[1.5, 2]} /><meshStandardMaterial color="#3b82f6" /></mesh>
            </group>
        )}
        <mesh position={[0, 5.8, 0]}>
            <boxGeometry args={[3, 0.1, 0.8]} />
            <meshStandardMaterial color="#ffffff" emissive="#60a5fa" emissiveIntensity={isMobile ? 1 : 5} />
        </mesh>
        <pointLight position={[0, 5.5, 0]} intensity={isMobile ? 8 : 15} distance={isMobile ? 15 : 20} color="#60a5fa" castShadow={false} />
    </group>
)

const ParkingSpace = ({ position }) => {
    return (
        <group position={position}>
            {/* Horizontal Side Lines (Blue Glow) */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -2.5]}>
                <planeGeometry args={[10, 0.08]} />
                <meshStandardMaterial color="#60a5fa" opacity={0.6} transparent emissive="#60a5fa" emissiveIntensity={0.2} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 2.5]}>
                <planeGeometry args={[10, 0.08]} />
                <meshStandardMaterial color="#60a5fa" opacity={0.6} transparent emissive="#60a5fa" emissiveIntensity={0.2} />
            </mesh>
            {/* Back Line (Cyan limit) */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-5, 0, 0]}>
                <planeGeometry args={[0.08, 5.08]} />
                <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.5} />
            </mesh>
            {/* Ground Decal - Blue tinted */}
            <mesh position={[-4, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.8, 1.2]} />
                <meshStandardMaterial color="#1e3a8a" roughness={0.1} metalness={0.5} />
            </mesh>
        </group>
    )
}

const ParkingRows = ({ type }) => {
    const config = {
        L: { pos: [-7, 0.02, -60], count: 20, gap: 11 },
        R: { pos: [14, 0.02, -60], count: 20, gap: 11 },
        LL: { pos: [-22, 0.02, -40], count: 15, gap: 11 },
        RR: { pos: [29, 0.02, -40], count: 15, gap: 11 },
    }[type]

    return Array.from({ length: config.count }).map((_, i) => {
        const z = config.pos[2] + i * config.gap
        return (
            <ParkingSpace
                key={`${type}${i}`}
                position={[config.pos[0], config.pos[1], z]}
            />
        )
    })
}

export const City = () => {
    const { size } = useThree()
    const isMobile = size.width < 768
    const pillarCount = isMobile ? 4 : 8
    const scroll = useScroll()

    // Load the logo texture
    const logoTexture = useTexture('/logo.jpeg')

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
            <mesh position={[-35, 6, 0]} rotation={[0, Math.PI / 2, 0]}>
                <planeGeometry args={[400, 12]} />
                <meshStandardMaterial color="#020617" />
            </mesh>
            <mesh position={[45, 6, 0]} rotation={[0, -Math.PI / 2, 0]}>
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
            <SecurityCamera position={[9, 4, 112]} rotation={[0.2, -Math.PI / 4, 0]} />
            <SecurityCamera position={[-2.5, 4, 112]} rotation={[0.2, Math.PI / 4, 0]} />
            <SecurityCamera position={[3.5, 8, -15]} rotation={[0.5, Math.PI, 1]} />

            {/* Pillars with lighting */}
            <Instances range={40}>
                <boxGeometry args={[2, 12, 2]} />
                <meshStandardMaterial color="#27272a" roughness={0.4} metalness={0.2} />
                {Array.from({ length: pillarCount }).map((_, i) => (
                    <group key={i}>
                        <PillarInternal position={[-15, 6, -40 + i * (isMobile ? 40 : 20)]} isMobile={isMobile} />
                        <PillarInternal position={[22, 6, -40 + i * (isMobile ? 40 : 20)]} isMobile={isMobile} />

                        {/* Charging Stations near pillars - Repositioned for larger footprint */}
                        <ChargingStation position={[-13.2, 0, -40 + i * (isMobile ? 40 : 20)]} rotation={[0, Math.PI / 2, 0]} />
                        <ChargingStation position={[20.2, 0, -40 + i * (isMobile ? 40 : 20)]} rotation={[0, -Math.PI / 2, 0]} />
                    </group>
                ))}
            </Instances>

            <ParkingRows type="L" />
            <ParkingRows type="R" />
            {!isMobile && (
                <>
                    <ParkingRows type="LL" />
                    <ParkingRows type="RR" />
                </>
            )}
        </group>
    )
}
