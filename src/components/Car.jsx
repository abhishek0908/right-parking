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


                    // Strip any default lights/emissives from the original model
                    if (child.material) {
                        const materials = Array.isArray(child.material) ? child.material : [child.material]
                        materials.forEach((mat) => {
                            if (mat.emissive) {
                                mat.emissive.setHex(0x000000)
                                mat.emissiveIntensity = 0
                            }
                            mat.precision = 'lowp'
                            if (mat.metalness > 0.8) mat.metalness = 0.8
                            if (mat.roughness < 0.2) mat.roughness = 0.2
                            mat.envMapIntensity = 0.5
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

            // Normalize position so wheels are at y=0
            const box = new THREE.Box3().setFromObject(clonedScene)
            const center = box.getCenter(new THREE.Vector3())

            // Center X and Z, and set bottom Y to 0
            clonedScene.position.set(-center.x, -box.min.y, -center.z)

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

const RedDot = ({ position }) => (
    <group position={position}>
        {/* Substantial Horizontal Capsule Shape */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
            {/* <capsuleGeometry args={[0.22, 0.4, 16, 32]} /> */}
            <meshBasicMaterial color="#ff0000" toneMapped={false} />
        </mesh>
        {/* Bold Atmospheric Glow */}
        <mesh rotation={[0, 0, Math.PI / 2]} scale={2.5}>
            {/* <capsuleGeometry args={[0.22, 0.45, 8, 16]} /> */}
            <meshBasicMaterial color="#ff0000" transparent opacity={0.25} toneMapped={false} />
        </mesh>
    </group>
)

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
        const yBase = 0 // Ground level
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
            const targetX = -15 // Unified target to match ParkingEnvironment spot

            // Use a quadratic curve for X to simulate turning radius and avoid early clipping
            // This keeps the car in the aisle longer before it pivots into the spot
            const xEase = t * t
            x = THREE.MathUtils.lerp(isMobile ? 2.5 : 3.5, targetX, xEase)

            // Linear-ish progress for Z and Rotation
            z = THREE.MathUtils.lerp(10, -0, ease)
            rotY = THREE.MathUtils.lerp(Math.PI, 1.5 * Math.PI, ease)

            // Subtle steering tilt
            const steer = Math.sin(t * Math.PI) * 0.4
            tilt = -steer * 0.05
            if (showTag) setShowTag(false)
        } else {
            // Final Parked State
            x = -15
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

            {/* Proper Symmetrical Taillight Capsules */}
            <group position={[0, 1.1, -2.65]}>
                <RedDot position={[1.05, 0, 0]} />
                <RedDot position={[-1.05, 0, 0]} />
            </group>


            <Html position={[0, 3.5, 0]} center style={{ opacity: showTag ? 1 : 0, transition: 'opacity 0.6s', pointerEvents: 'none' }}>
                <div className="bg-blue-50/90 backdrop-blur-md border-l-4 border-blue-600 p-4 md:p-5 shadow-2xl rounded-lg w-[85vw] max-w-[300px] md:min-w-[280px]">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-blue-500 text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-bold">Premium Match</div>
                        <div className="bg-blue-600 text-white text-[8px] md:text-[9px] px-2 py-0.5 rounded-full">ELECTRIC</div>
                    </div>
                    <div className="text-blue-950 text-xl md:text-2xl font-display italic mb-1">Mercedes-Benz S-Class</div>
                    <div className="text-blue-700 text-[10px] md:text-[12px] font-medium tracking-tight">BRABUS 850 Edition | EV Ready</div>
                    <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-blue-200 flex justify-between text-[8px] md:text-[10px] text-blue-400 font-mono">
                        <span>VIN: W223-B850-001</span>
                        <span>STATUS: CHARGING</span>
                    </div>
                </div>
            </Html>
        </group>
    )
}

