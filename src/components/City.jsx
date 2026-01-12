import { ParkedCar, ParkedCarsProvider } from './Car'
import { useRef } from 'react'
import { Html } from '@react-three/drei'

const Pillar = ({ position }) => (
    <group position={position}>
        <mesh castShadow receiveShadow>
            <boxGeometry args={[1.5, 12, 1.5]} />
            <meshStandardMaterial
                color="#b1b5bd"
                roughness={0.4}
                metalness={0.2}
            />
        </mesh>
        {/* Safety Stripes */}
        <mesh position={[0, -2, 0.76]}>
            <planeGeometry args={[1.5, 2]} />
            <meshStandardMaterial color="#fbbf24" />
        </mesh>
        <mesh position={[0, -2, -0.76]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[1.5, 2]} />
            <meshStandardMaterial color="#fbbf24" />
        </mesh>
        <mesh position={[0.76, -2, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[1.5, 2]} />
            <meshStandardMaterial color="#fbbf24" />
        </mesh>
        <mesh position={[-0.76, -2, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <planeGeometry args={[1.5, 2]} />
            <meshStandardMaterial color="#fbbf24" />
        </mesh>

        {/* Overhead Lamp */}
        <mesh position={[0, 5.8, 0]}>
            <boxGeometry args={[3, 0.1, 0.8]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={3} />
        </mesh>
        <pointLight position={[0, 5.5, 0]} intensity={18} distance={22} color="#ffffff" />
    </group>
)

// Car colors for parking spots - Premium Metallic Palette
const PARKED_CAR_COLORS = [
    '#1a1a1a', '#f8f9fa', '#4a4e69', '#22333b',
    '#5e548e', '#9a8c98', '#252422', '#eb5e28',
    '#403d39', '#ccc5b9', '#3d5a80', '#98c1d9',
    '#ee6c4d', '#293241', '#540b0e', '#335c67',
]

const ParkingSpace = ({ position, filled, spotIndex }) => {
    const color = PARKED_CAR_COLORS[spotIndex % PARKED_CAR_COLORS.length]

    return (
        <group position={position}>
            {/* Parking Lines - Sharp Red & White */}
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

            {/* Spot Numbering (Simplified) */}
            <mesh position={[0, 0.01, 2.4]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.8, 0.4]} />
                <meshStandardMaterial color="#333" roughness={0.1} metalness={0.5} />
            </mesh>

            {/* Parked Car - Using Super-fast Instancing */}
            {filled && (
                <ParkedCar
                    color={color}
                    rotation={[0, Math.PI / 2, 0]}
                    position={[0, 0, 0]}
                />
            )}
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
        const isEntrance = type.length === 1 && i > 6 && i < 10
        const filled = !isEntrance && (
            type === 'L' ? i % 3 !== 0 :
                type === 'R' ? i % 2 === 0 :
                    type === 'LL' ? i % 4 !== 0 : i % 5 !== 0
        )
        const spotIdx = type === 'L' ? i : type === 'R' ? i + 20 : type === 'LL' ? i + 40 : i + 55

        return (
            <ParkingSpace
                key={`${type}${i}`}
                position={[config.pos[0], config.pos[1], z]}
                filled={filled}
                spotIndex={spotIdx}
            />
        )
    })
}

export const City = () => {
    return (
        <ParkedCarsProvider>
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

                {/* Central Lane Line */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3.5, 0.02, 50]}>
                    <planeGeometry args={[0.1, 200]} />
                    <meshStandardMaterial color="#ffffff" opacity={0.2} transparent />
                </mesh>

                {/* Pillars - Reduced count for performance */}
                {Array.from({ length: 8 }).map((_, i) => (
                    <group key={i}>
                        <Pillar position={[-12, 6, -40 + i * 20]} />
                        <Pillar position={[18, 6, -40 + i * 20]} />
                    </group>
                ))}

                {/* Parking Rows */}
                <ParkingRows type="L" />
                <ParkingRows type="R" />
                <ParkingRows type="LL" />
                <ParkingRows type="RR" />
            </group>
        </ParkedCarsProvider>
    )
}


