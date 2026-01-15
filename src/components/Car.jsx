import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll, Html, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// 1. Professional Loading: Load GLB ONCE with DRACO support
const DRACO_URL = 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/'
const MODEL_PATH = '/luxury-sedan.glb'
useGLTF.preload(MODEL_PATH, DRACO_URL)

/**
 * Optimized Hero Car
 */
export const CarModel = ({ color = "#111111", isMainCar = false, ...props }) => {
    const { scene } = useGLTF(MODEL_PATH, DRACO_URL)

    const model = useMemo(() => {
        const clone = scene.clone()
        clone.traverse((child) => {
            if (child.isMesh) {
                // Ensure shadows
                child.castShadow = isMainCar
                child.receiveShadow = isMainCar

                // Optimization: Use original materials but slightly enhance them for the scene
                if (child.material) {
                    child.material = child.material.clone()

                    // If the mesh seems to be the car body/paint, we can apply the theme color
                    const name = child.name.toLowerCase()
                    const matName = child.material.name.toLowerCase()

                    if (name.includes('body') || name.includes('paint') || matName.includes('paint') || matName.includes('body')) {
                        child.material.color.set(color)
                        child.material.roughness = 0.2
                        child.material.metalness = 0.8
                        child.material.side = THREE.FrontSide
                    }

                    // Ensure glass is actually transparent and reflective
                    if (name.includes('glass') || matName.includes('glass')) {
                        child.material.transparent = true
                        child.material.opacity = 0.2
                        child.material.metalness = 1
                        child.material.roughness = 0.05
                    }
                }
            }
        })
        return clone
    }, [scene, color, isMainCar])

    return (
        <group {...props}>
            <group name="tilt-group">
                <primitive
                    object={model}
                    scale={[1, 1, 1]}
                    position={[0, 0, 0]}
                    rotation={[0, 0, 0]}
                />
            </group>
        </group>
    )
}

export const Car = () => {
    const group = useRef()
    const scroll = useScroll()
    const [showTag, setShowTag] = useState(false)
    const bodyTilt = useRef(0)

    useFrame((state, delta) => {
        if (!group.current || !scroll) return
        const isMobile = state.size.width < 768
        const offset = scroll.offset

        let x = 3, z = 35, rotY = Math.PI, tilt = 0
        const yBase = 1 // Increased space from flat area (ground)
        const smoothstep = (t) => t * t * (3 - 2 * t)

        if (offset < 0.1) {
            // Hero Phase: Brief static start
            z = 150
            x = isMobile ? 2.5 : 3.5
            rotY = Math.PI
            if (showTag) setShowTag(false)
        } else if (offset < 0.6) {
            const t = (offset - 0.1) / 0.5
            const ease = smoothstep(t)
            z = 150 - ease * 140
            x = isMobile ? 2.5 : 3.5
            rotY = Math.PI
            if (showTag) setShowTag(false)
        } else if (offset < 0.8) {
            const t = (offset - 0.4) / 0.4
            const ease = smoothstep(t)
            const targetX = isMobile ? -5 : -7
            x = THREE.MathUtils.lerp(isMobile ? 2.5 : 3.5, targetX, ease)
            z = THREE.MathUtils.lerp(10, -5, ease)
            const steer = Math.sin(t * Math.PI) * 0.6
            rotY = Math.PI + ease * (Math.PI / 2)
            tilt = -steer * 0.1
            if (showTag) setShowTag(false)
        } else {
            x = isMobile ? -5 : -7
            z = 0
            rotY = 1.5 * Math.PI // Stay facing -X (left)
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
        <group ref={group} position={[3.5, 0.05, 150]} rotation={[0, Math.PI, 0]}>
            <CarModel color="#1e40af" scale={[5.2, 5.2, 5.2]} rotation={[0, -Math.PI / 2, 0]} isMainCar />

            <spotLight
                position={[1.2, 0.8, 2.5]}
                intensity={40}
                angle={0.6}
                penumbra={0.5}
                color="#60a5fa"
                castShadow={false}
            />
            <spotLight
                position={[-1.2, 0.8, 2.5]}
                intensity={40}
                angle={0.6}
                penumbra={0.5}
                color="#60a5fa"
                castShadow={false}
            />

            <Html position={[0, 3.5, 0]} center style={{ opacity: showTag ? 1 : 0, transition: 'opacity 0.6s', pointerEvents: 'none' }}>
                <div className="bg-blue-50/90 backdrop-blur-md border-l-4 border-blue-600 p-5 shadow-2xl rounded-lg min-w-[280px]">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-blue-500 text-[10px] uppercase tracking-[0.2em] font-bold">Premium Match</div>
                        <div className="bg-blue-600 text-white text-[9px] px-2 py-0.5 rounded-full">ELECTRIC</div>
                    </div>
                    <div className="text-blue-950 text-2xl font-serif italic mb-1">Mercedes-Benz S-Class</div>
                    <div className="text-blue-700 text-[12px] font-medium tracking-tight">BRABUS 850 Edition | EV Ready</div>
                    <div className="mt-4 pt-4 border-t border-blue-200 flex justify-between text-[10px] text-blue-400 font-mono">
                        <span>VIN: W223-B850-001</span>
                        <span>STATUS: CHARGING</span>
                    </div>
                </div>
            </Html>
        </group>
    )
}

