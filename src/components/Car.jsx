import { useRef, useState, useMemo, createContext, useContext } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll, Html, useGLTF, Clone, Instances, Instance } from '@react-three/drei'
import * as THREE from 'three'

// 1. Professional Loading: Load GLB ONCE with DRACO support
// Use the official Draco decoder from GStatic
const DRACO_URL = 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/'
useGLTF.preload('/luxury-sedan.glb', DRACO_URL)

// Context for instancing background cars
const CarInstancesContext = createContext()

export const ParkedCarsProvider = ({ children }) => {
    const { nodes, materials } = useGLTF('/luxury-sedan.glb', DRACO_URL)

    // Identify the main car mesh (it's the only mesh in this model)
    const carMesh = useMemo(() => {
        let mesh = null
        Object.values(nodes).forEach(node => {
            if (node.isMesh) mesh = node
        })
        return mesh
    }, [nodes])

    if (!carMesh) return <>{children}</>

    return (
        <Instances
            range={100} // Support up to 100 cars
            geometry={carMesh.geometry}
            material={carMesh.material}
        >
            <CarInstancesContext.Provider value={null}>
                {children}
            </CarInstancesContext.Provider>
        </Instances>
    )
}

/**
 * Optimized Hero Car
 * High-quality, supports shadows, steering, and custom colors
 */
export const CarModel = ({ color = "#d40000", steering = 0, bodyTilt = 0, isMainCar = false, ...props }) => {
    const { scene } = useGLTF('/luxury-sedan.glb', DRACO_URL)

    // Reuse and customize the model for the hero car
    const model = useMemo(() => {
        const clone = scene.clone()
        clone.traverse((child) => {
            if (child.isMesh) {
                // For the hero car, we can afford unique materials for quality
                child.material = child.material.clone()
                child.material.color.set(color)
                child.material.roughness = 0.2
                child.material.metalness = 0.8 // Premium look

                child.castShadow = isMainCar
                child.receiveShadow = isMainCar
            }
        })
        return clone
    }, [scene, color, isMainCar])

    return (
        <group {...props}>
            <group rotation={[0, 0, bodyTilt]}>
                <primitive
                    object={model}
                    scale={[4.0, 4.0, 4.0]}
                    position={[0, 0.8, 0]}
                    rotation={[0, -Math.PI / 2, 0]}
                />
            </group>
        </group>
    )
}

/**
 * Super-fast Instanced Car for background/parking
 * 1 draw call for all cars, no unique materials per car (uses vertex colors/instance colors)
 */
export const ParkedCar = ({ color = "#ffffff", ...props }) => {
    return (
        <group {...props}>
            <Instance
                color={color}
                scale={[4.0, 4.0, 4.0]}
                position={[0, 0.8, 0]}
                rotation={[0, -Math.PI / 2, 0]}
            />
        </group>
    )
}

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
            const t = offset / 0.4
            const ease = smoothstep(t)
            z = 150 - ease * 140
            x = 3.5
            rotY = Math.PI
            steer = 0
            setShowTag(false)
        } else if (offset < 0.8) {
            const t = (offset - 0.4) / 0.4
            const ease = smoothstep(t)
            x = THREE.MathUtils.lerp(3.5, -5, ease)
            z = THREE.MathUtils.lerp(10, -12, ease)
            steer = Math.sin(t * Math.PI) * 0.6
            rotY = Math.PI + ease * (Math.PI / 2)
            tilt = -steer * 0.1
            setShowTag(false)
        } else {
            const t = (offset - 0.8) / 0.2
            x = -5
            z = -12
            rotY = Math.PI / 2
            steer = 0
            tilt = 0
            setShowTag(true)
        }

        const dampFactor = 1 - Math.pow(0.1, delta)
        group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, x, dampFactor)
        group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, z, dampFactor)
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, rotY, dampFactor)

        setSteering(prev => THREE.MathUtils.lerp(prev, steer, dampFactor))
        setBodyTilt(prev => THREE.MathUtils.lerp(prev, tilt, dampFactor))
    })

    return (
        <group ref={group} position={[3, 0.3, 25]} rotation={[0, Math.PI, 0]}>
            <CarModel color="#d40000" scale={[1.2, 1.2, 1.2]} steering={steering} bodyTilt={bodyTilt} isMainCar />

            {/* Headlights glow */}
            <spotLight
                position={[0.5, 0.4, 2.5]}
                intensity={20}
                angle={0.6}
                penumbra={0.5}
                color="#fff"
                castShadow
            />
            <spotLight
                position={[-0.5, 0.4, 2.5]}
                intensity={20}
                angle={0.6}
                penumbra={0.5}
                color="#fff"
                castShadow
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

