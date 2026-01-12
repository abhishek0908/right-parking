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

            {/* Parked Car */}
            {filled && (
                <CarModel
                    color={color}
                    rotation={[0, Math.PI / 2, 0]}
                    scale={[1.0, 1.0, 1.0]}
                    position={[0, 0, 0]}
                />
            )}
        </group>
    )
}

export const City = () => {
    return (
        <group position={[0, -0.01, 0]}>
            {/* Ultra-Clean Polished Concrete Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[600, 600]} />
                <meshStandardMaterial
                    color="#1a1a1b"
                    roughness={0.05}
                    metalness={0.4}
                    envMapIntensity={0.8}
                />
            </mesh>

            {/* Main Road Visual - High Contrast */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3.5, 0.01, 50]}>
                <planeGeometry args={[12, 200]} />
                <meshStandardMaterial color="#121212" roughness={0.2} />
            </mesh>

            {/* Central Lane Line */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3.5, 0.02, 50]}>
                <planeGeometry args={[0.1, 200]} />
                <meshStandardMaterial color="#ffffff" opacity={0.3} transparent />
            </mesh>

            {/* Entry Threshold Line */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3.5, 0.02, 5]}>
                <planeGeometry args={[12, 0.2]} />
                <meshStandardMaterial color="#ef4444" />
            </mesh>

            {/* Ceiling - making it feel enclosed */}
            <mesh position={[0, 15, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[400, 400]} />
                <meshStandardMaterial
                    color="#09090b"
                    roughness={0.9}
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
                        position={[0, 0, 0]}
                        scale={0.5}
                        style={{ pointerEvents: 'none', userSelect: 'none' }}
                    >
                        <div className="flex flex-col items-center select-none text-white whitespace-nowrap">
                            <div className="text-[140px] font-black italic tracking-tighter opacity-80 leading-none">
                                RIGHT <span className="opacity-40 font-thin">PARKING</span>
                            </div>
                            <div className="h-[4px] w-[800px] bg-red-600/60 mt-6 shadow-[0_0_20px_rgba(220,38,38,0.5)]"></div>
                        </div>
                    </Html>
                </group>
            ))}

            {/* Left Row - Denser */}
            {Array.from({ length: 20 }).map((_, i) => {
                const z = -60 + i * 8
                const isEntrance = i > 6 && i < 10;
                return <ParkingSpace position={[-5, 0.02, z]} key={`L${i}`} filled={!isEntrance && (i % 3 !== 0)} spotIndex={i} />
            })}

            {/* Right Row - Denser */}
            {Array.from({ length: 20 }).map((_, i) => {
                const z = -60 + i * 8
                const isEntrance = i > 6 && i < 10;
                return <ParkingSpace position={[12, 0.02, z]} key={`R${i}`} filled={!isEntrance && (i % 2 === 0)} spotIndex={i + 20} />
            })}

            {/* Far Left Row - Wall side */}
            {Array.from({ length: 15 }).map((_, i) => {
                const z = -40 + i * 8
                return <ParkingSpace position={[-18, 0.02, z]} key={`LL${i}`} filled={i % 4 !== 0} spotIndex={i + 40} />
            })}

            {/* Far Right Row - Wall side */}
            {Array.from({ length: 15 }).map((_, i) => {
                const z = -40 + i * 8
                return <ParkingSpace position={[25, 0.02, z]} key={`RR${i}`} filled={i % 5 !== 0} spotIndex={i + 55} />
            })}
        </group>
    )
}

