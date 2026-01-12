import { useRef } from 'react'
import { Html, Instances, Instance } from '@react-three/drei'

// Dedicated components for instanced parts
const PillarInternal = ({ position }) => (
    <group position={position}>
        <Instance />
        {/* Safety Stripes */}
        <group position={[0, -2, 0]}>
            <mesh position={[0, 0, 0.76]}><planeGeometry args={[1.5, 2]} /><meshStandardMaterial color="#fbbf24" /></mesh>
            <mesh position={[0, 0, -0.76]} rotation={[0, Math.PI, 0]}><planeGeometry args={[1.5, 2]} /><meshStandardMaterial color="#fbbf24" /></mesh>
            <mesh position={[0.76, 0, 0]} rotation={[0, Math.PI / 2, 0]}><planeGeometry args={[1.5, 2]} /><meshStandardMaterial color="#fbbf24" /></mesh>
            <mesh position={[-0.76, 0, 0]} rotation={[0, -Math.PI / 2, 0]}><planeGeometry args={[1.5, 2]} /><meshStandardMaterial color="#fbbf24" /></mesh>
        </group>
        {/* Overhead Lamp */}
        <mesh position={[0, 5.8, 0]}>
            <boxGeometry args={[3, 0.1, 0.8]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={3} />
        </mesh>
        <pointLight position={[0, 5.5, 0]} intensity={12} distance={20} color="#ffffff" castShadow={false} />
    </group>
)

const ParkingSpace = ({ position }) => {
    return (
        <group position={position}>
            {/* Parking Lines */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-1.7, 0, 0]}>
                <planeGeometry args={[0.05, 6]} />
                <meshStandardMaterial color="#ffffff" opacity={0.6} transparent />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1.7, 0, 0]}>
                <planeGeometry args={[0.05, 6]} />
                <meshStandardMaterial color="#ffffff" opacity={0.6} transparent />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 3]}>
                <planeGeometry args={[3.45, 0.05]} />
                <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.5} />
            </mesh>
            {/* Spot Numbering */}
            <mesh position={[0, 0.01, 2.4]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.8, 0.4]} />
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
    return (
        <group position={[0, -0.01, 0]}>
            {/* Optimized Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[600, 600]} />
                <meshStandardMaterial color="#1a1a1b" roughness={0.1} metalness={0.2} />
            </mesh>

            {/* Main Road Visual */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3.5, 0.01, 50]}>
                <planeGeometry args={[12, 200]} />
                <meshStandardMaterial color="#121212" roughness={0.5} />
            </mesh>

            {/* Instanced Pillars */}
            <Instances range={20}>
                <boxGeometry args={[1.5, 12, 1.5]} />
                <meshStandardMaterial color="#b1b5bd" roughness={0.4} metalness={0.2} />

                {Array.from({ length: 8 }).map((_, i) => (
                    <group key={i}>
                        <PillarInternal position={[-12, 6, -40 + i * 20]} />
                        <PillarInternal position={[18, 6, -40 + i * 20]} />
                    </group>
                ))}
            </Instances>

            <ParkingRows type="L" />
            <ParkingRows type="R" />
            <ParkingRows type="LL" />
            <ParkingRows type="RR" />
        </group>
    )
}
