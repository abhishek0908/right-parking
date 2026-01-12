import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll, Html, RoundedBox, useGLTF, Clone } from '@react-three/drei'
import * as THREE from 'three'

// Realistic sports car made with React Three Fiber primitives
export const CarModel = ({ color = "#d40000", steering = 0, bodyTilt = 0, ...props }) => {
    const { scene } = useGLTF('/luxury-sedan.glb')

    // Create a colored version of the model
    const coloredModel = useMemo(() => {
        const clone = scene.clone()
        clone.traverse((child) => {
            if (child.isMesh) {
                // Target common car body mesh names
                const name = child.name.toLowerCase()
                if (name.includes('body') || name.includes('paint') || name.includes('car')) {
                    child.material = child.material.clone()
                    child.material.color.set(color)
                    // Make it look premium
                    child.material.roughness = 0.1
                    child.material.metalness = 0.8
                }
            }
        })
        return clone
    }, [scene, color])

    return (
        <group {...props}>
            <group rotation={[0, 0, bodyTilt]}>
                <primitive
                    object={coloredModel}
                    scale={[4.0, 4.0, 4.0]}
                    position={[0, 0.8, 0]}
                    rotation={[0, -Math.PI / 2, 0]}
                    castShadow
                    receiveShadow
                />
            </group>
        </group>
    )
}

// Preload for performance
useGLTF.preload('/luxury-sedan.glb')

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
            // Phase 1: High-speed Main Road Approach
            const t = offset / 0.4
            const ease = smoothstep(t)
            z = 150 - ease * 140 // Driving from distance 150 down to 10
            x = 3.5
            rotY = Math.PI
            steer = 0
            setShowTag(false)
        } else if (offset < 0.8) {
            // Phase 2: Decelerating & Precision Entry Turn
            const t = (offset - 0.4) / 0.4
            const ease = smoothstep(t)

            // Transition from road (3.5, 10) to parking spot (-5, -17)
            x = THREE.MathUtils.lerp(3.5, -5, ease)
            z = THREE.MathUtils.lerp(10, -17, ease)

            // Dynamic steering for the turn
            steer = Math.sin(t * Math.PI) * 0.6
            rotY = Math.PI + ease * (Math.PI / 2)

            tilt = -steer * 0.1
            setShowTag(false)
        } else {
            // Phase 3: Final Parking Precision
            const t = (offset - 0.8) / 0.2
            const ease = smoothstep(Math.min(t, 1))

            x = -5
            z = -17
            rotY = Math.PI + Math.PI / 2
            steer = 0
            tilt = 0
            setShowTag(true)
        }

        // Apply with lerp for smoothness (Using delta for frame-rate independence)
        const dampFactor = 1 - Math.pow(0.1, delta)
        group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, x, dampFactor)
        group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, z, dampFactor)
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, rotY, dampFactor)

        setSteering(prev => THREE.MathUtils.lerp(prev, steer, dampFactor))
        setBodyTilt(prev => THREE.MathUtils.lerp(prev, tilt, dampFactor))
    })

    return (
        <group ref={group} position={[3, 0.3, 25]} rotation={[0, Math.PI, 0]}>
            <CarModel color="#d40000" scale={[1.2, 1.2, 1.2]} steering={steering} bodyTilt={bodyTilt} />

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
            <Html position={[0, 2.8, 0]} center style={{ opacity: showTag ? 1 : 0, transition: 'opacity 0.6s', pointerEvents: 'none' }}>
                <div className="bg-white/90 backdrop-blur-md border-l-4 border-zinc-800 p-4 shadow-2xl rounded-lg">
                    <div className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1">Vehicle Match</div>
                    <div className="text-zinc-900 text-xl font-serif italic">Executive Luxury Sedan</div>
                </div>
            </Html>
        </group>
    )
}
