import { useRef, useState, useMemo, createContext } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll, Html, useGLTF, Instances, Instance } from '@react-three/drei'
import * as THREE from 'three'

// 1. Professional Loading: Load GLB ONCE with DRACO support
const DRACO_URL = 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/'
useGLTF.preload('/luxury-sedan.glb', DRACO_URL)

// Context for instancing background cars
const CarInstancesContext = createContext()

export const ParkedCarsProvider = ({ children }) => {
    const { nodes } = useGLTF('/luxury-sedan.glb', DRACO_URL)

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
            range={100}
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
 */
export const CarModel = ({ color = "#d40000", isMainCar = false, ...props }) => {
    const { scene } = useGLTF('/luxury-sedan.glb', DRACO_URL)
    const tiltGroup = useRef()

    const model = useMemo(() => {
        const clone = scene.clone()
        clone.traverse((child) => {
            if (child.isMesh) {
                child.material = child.material.clone()
                child.material.color.set(color)
                child.material.roughness = 0.2
                child.material.metalness = 0.8
                child.castShadow = isMainCar
                child.receiveShadow = isMainCar
            }
        })
        return clone
    }, [scene, color, isMainCar])

    return (
        <group {...props}>
            <group ref={tiltGroup} name="tilt-group">
                <primitive
                    object={model}
                    scale={[4.0, 4.0, 4.0]}
                    position={[0, 1, 0]}
                    rotation={[0, -Math.PI / 2, 0]}
                />
            </group>
        </group>
    )
}

/**
 * Super-fast Instanced Car
 */
export const ParkedCar = ({ color = "#ffffff", ...props }) => {
    return (
        <group {...props}>
            <Instance
                color={color}
                scale={[4.0, 4.0, 4.0]}
                position={[0, 1, 0]}
                rotation={[0, -Math.PI / 2, 0]}
            />
        </group>
    )
}

export const Car = () => {
    const group = useRef()
    const scroll = useScroll()
    const [showTag, setShowTag] = useState(false)
    const bodyTilt = useRef(0)

    useFrame((state, delta) => {
        if (!group.current) return
        const isMobile = state.size.width < 768
        const offset = scroll.offset

        let x = 3, z = 35, rotY = Math.PI, tilt = 0
        const yBase = 0.5
        const smoothstep = (t) => t * t * (3 - 2 * t)

        if (offset < 0.4) {
            const t = offset / 0.4
            const ease = smoothstep(t)
            z = 150 - ease * 140
            x = isMobile ? 2.5 : 3.5
            rotY = Math.PI
            if (showTag) setShowTag(false)
        } else if (offset < 0.8) {
            const t = (offset - 0.4) / 0.4
            const ease = smoothstep(t)
            const targetX = isMobile ? -3 : -5
            x = THREE.MathUtils.lerp(isMobile ? 2.5 : 3.5, targetX, ease)
            z = THREE.MathUtils.lerp(10, -12, ease)
            const steer = Math.sin(t * Math.PI) * 0.6
            rotY = Math.PI + ease * (Math.PI / 2)
            tilt = -steer * 0.1
            if (showTag) setShowTag(false)
        } else {
            x = isMobile ? -3 : -5
            z = -12
            rotY = Math.PI / 2
            if (!showTag) setShowTag(true)
        }

        const dampFactor = 1 - Math.pow(0.1, delta)
        group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, x, dampFactor)
        group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, z, dampFactor)
        group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, yBase, dampFactor)
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, rotY, dampFactor)

        bodyTilt.current = THREE.MathUtils.lerp(bodyTilt.current, tilt, dampFactor)

        const tiltGroup = group.current.getObjectByName('tilt-group')
        if (tiltGroup) {
            tiltGroup.rotation.z = bodyTilt.current
        }
    })

    return (
        <group ref={group} position={[3, 0.3, 25]} rotation={[0, Math.PI, 0]}>
            <CarModel color="#d40000" scale={[1.2, 1.2, 1.2]} isMainCar />

            <spotLight
                position={[0.5, 0.4, 2.5]}
                intensity={20}
                angle={0.6}
                penumbra={0.5}
                color="#fff"
                castShadow={false}
            />
            <spotLight
                position={[-0.5, 0.4, 2.5]}
                intensity={20}
                angle={0.6}
                penumbra={0.5}
                color="#fff"
                castShadow={false}
            />

            <Html position={[0, 2.8, 0]} center style={{ opacity: showTag ? 1 : 0, transition: 'opacity 0.6s', pointerEvents: 'none' }}>
                <div className="bg-white/90 backdrop-blur-md border-l-4 border-zinc-800 p-4 shadow-2xl rounded-lg">
                    <div className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1">Vehicle Match</div>
                    <div className="text-zinc-900 text-xl font-serif italic">Executive Luxury Sedan</div>
                </div>
            </Html>
        </group>
    )
}
