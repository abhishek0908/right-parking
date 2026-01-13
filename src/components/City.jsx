import { useRef } from 'react'
import { Instances, Instance, useScroll } from '@react-three/drei'
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

            {/* Top Cap */}
            <mesh position={[0, 2.05, 0]}>
                <boxGeometry args={[0.9, 0.1, 0.9]} />
                <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={1} />
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

                {/* Red stripes along X */}
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <mesh key={i} position={[-i * 1.2, 0, 0]}>
                        <boxGeometry args={[0.4, 0.16, 0.16]} />
                        <meshStandardMaterial color="#ef4444" />
                    </mesh>
                ))}
            </group>

            {/* Indicator */}
            <pointLight
                position={[0, 2.2, 0]}
                intensity={4}
                color="#ef4444"
                distance={6}
            />
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
                <mesh position={[0, 0, 0.76]}><planeGeometry args={[1.5, 2]} /><meshStandardMaterial color="#fbbf24" /></mesh>
                <mesh position={[0, 0, -0.76]} rotation={[0, Math.PI, 0]}><planeGeometry args={[1.5, 2]} /><meshStandardMaterial color="#fbbf24" /></mesh>
                <mesh position={[0.76, 0, 0]} rotation={[0, Math.PI / 2, 0]}><planeGeometry args={[1.5, 2]} /><meshStandardMaterial color="#fbbf24" /></mesh>
                <mesh position={[-0.76, 0, 0]} rotation={[0, -Math.PI / 2, 0]}><planeGeometry args={[1.5, 2]} /><meshStandardMaterial color="#fbbf24" /></mesh>
            </group>
        )}
        <mesh position={[0, 5.8, 0]}>
            <boxGeometry args={[3, 0.1, 0.8]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={isMobile ? 1 : 3} />
        </mesh>
        <pointLight position={[0, 5.5, 0]} intensity={isMobile ? 6 : 12} distance={isMobile ? 15 : 20} color="#ffffff" castShadow={false} />
    </group>
)

const ParkingSpace = ({ position }) => {
    return (
        <group position={position}>
            {/* Horizontal Side Lines (Now Depth lines) */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -1.7]}>
                <planeGeometry args={[6, 0.05]} />
                <meshStandardMaterial color="#ffffff" opacity={0.6} transparent />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 1.7]}>
                <planeGeometry args={[6, 0.05]} />
                <meshStandardMaterial color="#ffffff" opacity={0.6} transparent />
            </mesh>
            {/* Back Line (Now the Side limit) */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-3, 0, 0]}>
                <planeGeometry args={[0.05, 3.45]} />
                <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.5} />
            </mesh>
            {/* Ground Decal/Shadow */}
            <mesh position={[-2.4, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.4, 0.8]} />
                <meshStandardMaterial color="#333" roughness={0.1} metalness={0.5} />
            </mesh>
        </group>
    )
}

const ParkingRows = ({ type }) => {
    const config = {
        L: { pos: [-5, 0.02, -60], count: 20, gap: 8 },
        R: { pos: [12, 0.02, -60], count: 20, gap: 8 },
        LL: { pos: [-18, 0.02, -40], count: 15, gap: 8 },
        RR: { pos: [25, 0.02, -40], count: 15, gap: 8 },
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

    return (
        <group position={[0, -0.01, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow={!isMobile}>
                <planeGeometry args={[1200, 1200]} />
                <meshStandardMaterial color="#1a1a1b" roughness={0.1} metalness={0.2} />
            </mesh>

            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3.5, 0.01, 50]}>
                <planeGeometry args={[12, 400]} />
                <meshStandardMaterial color="#121212" roughness={0.5} />
            </mesh>

            {/* Entry Security Checkpoint (Placed slightly before parking starts) */}

            {/* Entry Security Checkpoint (Placed at the very start of the facility) */}
            <ParkingGate position={[9.5, 0, 110]} />

            {/* Security Cameras focused on the entrance */}
            <SecurityCamera position={[9, 4, 112]} rotation={[0.2, -Math.PI / 4, 0]} />
            <SecurityCamera position={[-2.5, 4, 112]} rotation={[0.2, Math.PI / 4, 0]} />
            <SecurityCamera position={[3.5, 8, -15]} rotation={[0.5, Math.PI, 0]} />

            <Instances range={40}>
                <boxGeometry args={[1.5, 12, 1.5]} />
                <meshStandardMaterial color="#b1b5bd" roughness={0.4} metalness={0.2} />
                {Array.from({ length: pillarCount }).map((_, i) => (
                    <group key={i}>
                        <PillarInternal position={[-12, 6, -40 + i * (isMobile ? 40 : 20)]} isMobile={isMobile} />
                        <PillarInternal position={[18, 6, -40 + i * (isMobile ? 40 : 20)]} isMobile={isMobile} />
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
