import { CarModel } from './Car'
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

// Car colors for parking spots
const PARKED_CAR_COLORS = [
    '#1a1a1a', '#ffffff', '#3b3b3b', '#3b82f6',
    '#ef4444', '#f59e0b', '#6366f1', '#10b981',
    '#1a1a1a', '#ffffff', '#64748b', '#f97316',
    '#1a1a1a', '#ffffff', '#dc2626', '#0ea5e9',
]

const ParkingSpace = ({ position, filled, spotIndex }) => {
    const color = PARKED_CAR_COLORS[spotIndex % PARKED_CAR_COLORS.length]

    return (
        <group position={position}>
            {/* Parking Lines - slightly worn white/yellow */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-1.7, 0, 0]}>
                <planeGeometry args={[0.2, 5.5]} />
                <meshStandardMaterial color="#ffffff" roughness={0.9} opacity={0.8} transparent />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1.7, 0, 0]}>
                <planeGeometry args={[0.2, 5.5]} />
                <meshStandardMaterial color="#ffffff" roughness={0.9} opacity={0.8} transparent />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 2.75]}>
                <planeGeometry args={[3.4, 0.2]} />
                <meshStandardMaterial color="#ffffff" roughness={0.9} opacity={0.8} transparent />
            </mesh>

            {/* Spot Numbering (Simplified) */}
            <mesh position={[0, 0.01, 2.4]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.8, 0.4]} />
                <meshStandardMaterial color="#333" roughness={0.1} metalness={0.5} />
            </mesh>

            {/* Parked Car */}
            {filled && (
                <CarModel
                    color={color}
                    rotation={[0, Math.PI / 2, 0]}
                    scale={[0.7, 0.7, 0.7]}
                    position={[0, 0, 0]}
                />
            )}
        </group>
    )
}

export const City = () => {
    return (
        <group position={[0, -0.01, 0]}>
            {/* Lighter Polished Concrete Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[400, 400]} />
                <meshStandardMaterial
                    color="#4b5563"
                    roughness={0.1}
                    metalness={0.2}
                    envMapIntensity={1.2}
                />
            </mesh>

            {/* Ceiling - making it feel enclosed */}
            <mesh position={[0, 11.5, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[200, 200]} />
                <meshStandardMaterial
                    color="#111827"
                    roughness={0.8}
                />
            </mesh>

            {/* Pillars with Lights */}
            {Array.from({ length: 12 }).map((_, i) => (
                <group key={i}>
                    <Pillar position={[-10, 6, -50 + i * 10]} />
                    <Pillar position={[15, 6, -50 + i * 10]} />
                </group>
            ))}

            {/* Main Road Text Markings */}
            {[15, -15].map((zPos, i) => (
                <group key={i} position={[3.5, 0.02, zPos]} rotation={[-Math.PI / 2, 0, 0]}>
                    <mesh>
                        <planeGeometry args={[12, 4]} />
                        <meshStandardMaterial
                            transparent
                            opacity={0.15}
                            color="#ffffff"
                        />
                    </mesh>
                    <Html
                        transform
                        occlude
                        position={[0, 0, 0]}
                        scale={0.5}
                        style={{ pointerEvents: 'none', userSelect: 'none' }}
                    >
                        <div className="flex flex-col items-center select-none text-white whitespace-nowrap">
                            <div className="text-[120px] font-serif italic tracking-tighter opacity-40 leading-none">
                                Right <span className="opacity-40 font-light">Parking</span>
                            </div>
                            <div className="h-[2px] w-[600px] bg-red-600/30 mt-4"></div>
                        </div>
                    </Html>
                </group>
            ))}

            {/* Left Row - Leave spot 4 empty for hero car */}
            {Array.from({ length: 12 }).map((_, i) => {
                const z = -45 + i * 7
                return <ParkingSpace position={[-5, 0.02, z]} key={`L${i}`} filled={i !== 4} spotIndex={i} />
            })}

            {/* Right Row */}
            {Array.from({ length: 12 }).map((_, i) => {
                const z = -45 + i * 7
                return <ParkingSpace position={[10, 0.02, z]} key={`R${i}`} filled={true} spotIndex={i + 12} />
            })}
        </group>
    )
}

