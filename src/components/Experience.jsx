import { useScroll, Environment, ContactShadows } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Car } from './Car'
import { ParkingEnvironment } from './ParkingEnvironment'

export const Experience = () => {
    const scroll = useScroll()
    const { size } = useThree()
    const isMobile = size.width < 768

    useFrame((state, delta) => {
        if (!scroll) return
        const offset = scroll.offset

        // Smoothstep for smooth camera transitions
        const smoothstep = (t) => t * t * (3 - 2 * t)

        // Camera positions for each phase (Dynamic for mobile)
        // Start: High-speed follow from the Main Road
        const startPos = new THREE.Vector3(isMobile ? 10 : 12, isMobile ? 8 : 6, 160 + (isMobile ? 30 : 0))
        const startLookAt = new THREE.Vector3(3.5, 1.5, 140)

        // Following: Catching up and tracking the approach
        const followPos = new THREE.Vector3(isMobile ? 12 : 10, isMobile ? 6 : 5, 40 + (isMobile ? 20 : 0))
        const followLookAt = new THREE.Vector3(3.5, 1.2, 5)

        // Parking view (The moment it breaks from road to lot)
        const parkingPos = new THREE.Vector3(isMobile ? 22 : 18, isMobile ? 10 : 8, 15)
        const parkingLookAt = new THREE.Vector3(-10, 1.0, -5)

        // Final: Hero shot in the spot
        const parkedPos = new THREE.Vector3(isMobile ? 12 : 6, isMobile ? 5 : 4, -5 + (isMobile ? 8 : 0))
        const parkedLookAt = new THREE.Vector3(-15, 0.8, -5)

        // Overview: Wide-angle finale
        const birdEyePos = new THREE.Vector3(-15, isMobile ? 120 : 100, -5)
        const birdEyeLookAt = new THREE.Vector3(-15, 0, -5.1)

        let targetPos, targetLookAt

        if (offset < 0.15) {
            targetPos = startPos
            targetLookAt = startLookAt
        } else if (offset < 0.55) {
            const t = smoothstep((offset - 0.15) / 0.4)
            targetPos = new THREE.Vector3().lerpVectors(startPos, followPos, t)
            targetLookAt = new THREE.Vector3().lerpVectors(startLookAt, followLookAt, t)
        } else if (offset < 0.75) {
            const t = smoothstep((offset - 0.55) / 0.2)
            targetPos = new THREE.Vector3().lerpVectors(followPos, parkingPos, t)
            targetLookAt = new THREE.Vector3().lerpVectors(followLookAt, parkingLookAt, t)
        } else if (offset < 0.82) {
            const t = smoothstep((offset - 0.75) / 0.07)
            targetPos = new THREE.Vector3().lerpVectors(parkingPos, parkedPos, t)
            targetLookAt = new THREE.Vector3().lerpVectors(parkingLookAt, parkedLookAt, t)
        } else {
            const t = smoothstep((offset - 0.82) / 0.18)
            targetPos = new THREE.Vector3().lerpVectors(parkedPos, birdEyePos, t)
            targetLookAt = new THREE.Vector3().lerpVectors(parkedLookAt, birdEyeLookAt, t)
        }

        // Adjust FOV for a wider, more cinematic look
        state.camera.fov = isMobile ? 55 : 42
        state.camera.updateProjectionMatrix()

        // Apply camera position with delta-based damping for smoothness
        const dampFactor = 1 - Math.pow(0.05, delta)
        state.camera.position.lerp(targetPos, dampFactor)

        // Smooth lookAt with delta-based damping
        const lookAtMatrix = new THREE.Matrix4().lookAt(state.camera.position, targetLookAt, new THREE.Vector3(0, 1, 0))
        const targetQuat = new THREE.Quaternion().setFromRotationMatrix(lookAtMatrix)
        state.camera.quaternion.slerp(targetQuat, dampFactor)
    })

    return (
        <>
            {/* Solid Black Atmosphere */}
            <color attach="background" args={['#000000']} />

            {/* Technical grid - Neutral */}
            <gridHelper args={[600, 60, '#333333', '#222222']} position={[0, 0.01, 0]}>
                <meshBasicMaterial opacity={0.1} transparent />
            </gridHelper>

            {/* -- LIGHTING (Neutral White) -- */}
            <ambientLight intensity={0.5} color="#ffffff" />

            {/* Standard Key Light */}
            <directionalLight
                position={[50, 40, 100]}
                intensity={3.0}
                color="#ffffff"
                castShadow
                shadow-bias={-0.0005}
                shadow-mapSize={[1024, 1024]}
            />

            {/* Environment Reflections */}
            <Environment preset="city" environmentIntensity={0.5} />

            {/* -- FOG (Deep Black) -- */}
            <fog attach="fog" args={['#000000', 20, 180]} />

            <group position={[0, 0, 0]}>
                <Car />
                <ParkingEnvironment />
                <ContactShadows
                    resolution={256} // Reduced from 512
                    scale={50}
                    blur={2}
                    opacity={0.6}
                    far={4}
                    color="#000000"
                    frames={1} // Only render once to save performance
                />
            </group>

            {/* -- REMOVED HEAVY POST PROCESSING FOR PERFORMANCE -- */}
        </>
    )
}
