import { useRef, useState, useLayoutEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll, Html, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// Load Mercedes-Benz S-Class model
const MODEL_PATH = '/mersedes-benz_s-class_w223_brabus_850.glb'
useGLTF.preload(MODEL_PATH)

/**
 * Optimized Hero Car - Mercedes-Benz S-Class
 */
export const CarModel = ({ isMainCar = false, ...props }) => {
    const group = useRef()
    const tiltGroupRef = useRef()
    const optimizedSceneRef = useRef(null)
    const { scene } = useGLTF(MODEL_PATH)

    useLayoutEffect(() => {
        // Optimize the model by removing internal parts
        if (!optimizedSceneRef.current) {
            const clonedScene = scene.clone()
            const toRemove = []

            // Traverse and optimize meshes
            clonedScene.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    // Enable frustum culling for better performance
                    child.frustumCulled = true

                    // Ensure shadows only for external body parts
                    child.castShadow = isMainCar
                    child.receiveShadow = isMainCar

                    // Identify internal parts to REMOVE completely (not just hide)
                    const name = child.name.toLowerCase()
                    if (name.includes('interior') ||
                        name.includes('inside') ||
                        name.includes('seat') ||
                        name.includes('dashboard') ||
                        name.includes('steering') ||
                        name.includes('engine') ||
                        name.includes('glass_inner') ||
                        (name.includes('under') && !name.includes('underbody'))) {
                        toRemove.push(child)
                        return
                    }

                    // Optimize materials for fast rendering
                    if (child.material) {
                        const materials = Array.isArray(child.material) ? child.material : [child.material]
                        materials.forEach((mat) => {
                            mat.precision = 'lowp' // Use low precision for non-critical parts
                            if (mat.metalness > 0.8) mat.metalness = 0.8 // Cap metalness
                            if (mat.roughness < 0.2) mat.roughness = 0.2 // Cap roughness
                            mat.envMapIntensity = 0.5 // Reduce reflection calculations
                        })
                    }
                }
            })

            // Purge internal parts from the memory
            toRemove.forEach(child => {
                if (child.parent) child.parent.remove(child)
                if (child.geometry) child.geometry.dispose()
                if (child.material) {
                    const materials = Array.isArray(child.material) ? child.material : [child.material]
                    materials.forEach(m => m.dispose())
                }
            })

            optimizedSceneRef.current = clonedScene
        }

        // Add optimized scene to tilt-group
        if (tiltGroupRef.current && optimizedSceneRef.current) {
            tiltGroupRef.current.clear()
            tiltGroupRef.current.add(optimizedSceneRef.current)
        }
    }, [scene, isMainCar])

    return (
        <group ref={group} {...props}>
            <group ref={tiltGroupRef} name="tilt-group">
                {/* Optimized scene will be added in useLayoutEffect */}
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
        const yBase = 2 // Increased space from flat area (ground)
        const smoothstep = (t) => t * t * (3 - 2 * t)

        if (offset < 0.6) {
            const t = offset / 0.6
            const ease = smoothstep(t)
            z = 150 - ease * 140
            x = isMobile ? 2.5 : 3.5
            rotY = Math.PI
            if (showTag) setShowTag(false)
        } else if (offset < 0.82) {
            // Refined turning phase: 0.6 to 0.82 (longer for stability)
            const t = Math.min((offset - 0.6) / 0.22, 1)
            const ease = smoothstep(t)
            const targetX = isMobile ? -10 : -15

            // Use a quadratic curve for X to simulate turning radius and avoid early clipping
            // This keeps the car in the aisle longer before it pivots into the spot
            const xEase = t * t
            x = THREE.MathUtils.lerp(isMobile ? 2.5 : 3.5, targetX, xEase)

            // Linear-ish progress for Z and Rotation
            z = THREE.MathUtils.lerp(10, 0, ease)
            rotY = THREE.MathUtils.lerp(Math.PI, 1.5 * Math.PI, ease)

            // Subtle steering tilt
            const steer = Math.sin(t * Math.PI) * 0.4
            tilt = -steer * 0.05
            if (showTag) setShowTag(false)
        } else {
            // Final Parked State
            x = isMobile ? -10 : -15
            z = 0
            rotY = 1.5 * Math.PI
            if (!showTag) setShowTag(true)
        }

        const dampFactor = 1 - Math.pow(0.05, delta)
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
        <group ref={group} data-car-group position={[3.5, 0.05, 150]} rotation={[0, Math.PI, 0]}>
            <CarModel scale={[1.5, 1.5, 1.5]} rotation={[0, 0, 0]} isMainCar />

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
                    <div className="text-blue-950 text-2xl font-display italic mb-1">Mercedes-Benz S-Class</div>
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

