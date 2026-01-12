import { useScroll, Environment, ContactShadows } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette, Noise, DepthOfField } from '@react-three/postprocessing'
import * as THREE from 'three'
import { Car } from './Car'
import { City } from './City'

export const Experience = () => {
    const scroll = useScroll()

    useFrame((state, delta) => {
        const offset = scroll.offset
        const isMobile = state.size.width < 768

        // Smoothstep for smooth camera transitions
        const smoothstep = (t) => t * t * (3 - 2 * t)

        // Camera positions for each phase (Dynamic for mobile)
        const mobileOffset = isMobile ? 1.5 : 1

        // Start: High-speed follow from the Main Road
        const startPos = new THREE.Vector3(12 * mobileOffset, 6 * mobileOffset, 160 + (isMobile ? 20 : 0))
        const startLookAt = new THREE.Vector3(3.5, 1.5, 140)

        // Following: Catching up and tracking the approach
        const followPos = new THREE.Vector3(10 * mobileOffset, 5 * mobileOffset, 40 + (isMobile ? 12 : 0))
        const followLookAt = new THREE.Vector3(3.5, 1.2, 5)

        // Parking view (The moment it breaks from road to lot)
        const parkingPos = new THREE.Vector3(18 * mobileOffset, 8 * mobileOffset, 15)
        const parkingLookAt = new THREE.Vector3(-2, 1.0, -5)

        // Final: Hero shot in the spot
        const parkedPos = new THREE.Vector3(8 * mobileOffset, 4 * mobileOffset, -12 + (isMobile ? 4 : 0))
        const parkedLookAt = new THREE.Vector3(-5, 0.8, -12)

        // Overview: Wide-angle finale
        const birdEyePos = new THREE.Vector3(-5, isMobile ? 120 : 100, -12)
        const birdEyeLookAt = new THREE.Vector3(-5, 0, -12.1)

        let targetPos, targetLookAt

        if (offset < 0.4) {
            const t = smoothstep(offset / 0.4)
            targetPos = new THREE.Vector3().lerpVectors(startPos, followPos, t)
            targetLookAt = new THREE.Vector3().lerpVectors(startLookAt, followLookAt, t)
        } else if (offset < 0.8) {
            const t = smoothstep((offset - 0.4) / 0.4)
            targetPos = new THREE.Vector3().lerpVectors(followPos, parkingPos, t)
            targetLookAt = new THREE.Vector3().lerpVectors(followLookAt, parkingLookAt, t)
        } else if (offset < 0.9) {
            const t = smoothstep((offset - 0.8) / 0.1)
            targetPos = new THREE.Vector3().lerpVectors(parkingPos, parkedPos, t)
            targetLookAt = new THREE.Vector3().lerpVectors(parkingLookAt, parkedLookAt, t)
        } else {
            const t = smoothstep((offset - 0.9) / 0.1)
            targetPos = new THREE.Vector3().lerpVectors(parkedPos, birdEyePos, t)
            targetLookAt = new THREE.Vector3().lerpVectors(parkedLookAt, birdEyeLookAt, t)
        }

        // Adjust FOV for mobile
        state.camera.fov = isMobile ? 45 : 30
        state.camera.updateProjectionMatrix()

        // Apply camera position with delta-based damping for smoothness
        const dampFactor = 1 - Math.pow(0.1, delta) // Even smoother damping
        state.camera.position.lerp(targetPos, dampFactor)

        // Smooth lookAt with delta-based damping
        const lookAtMatrix = new THREE.Matrix4().lookAt(state.camera.position, targetLookAt, new THREE.Vector3(0, 1, 0))
        const targetQuat = new THREE.Quaternion().setFromRotationMatrix(lookAtMatrix)
        state.camera.quaternion.slerp(targetQuat, dampFactor)
    })

    return (
        <>
            {/* Deep Dark Atmosphere */}
            <color attach="background" args={['#09090b']} />

            {/* Technical grid for pixel-perfect feel */}
            <gridHelper args={[600, 60, '#ffffff', '#ffffff']} position={[0, 0.01, 0]}>
                <meshBasicMaterial opacity={0.03} transparent />
            </gridHelper>

            {/* -- LIGHTING (Refined for dark theme) -- */}
            <ambientLight intensity={0.5} color="#ffffff" />

            {/* Sharp entry rim light */}
            <directionalLight
                position={[50, 40, 100]}
                intensity={4.0}
                color="#ffffff"
                castShadow
                shadow-bias={-0.0001}
                shadow-mapSize={[512, 512]}
            />

            {/* Environment Reflections - Using bright city preset */}
            <Environment preset="city" blur={1} background={false} environmentIntensity={1.0} />

            {/* -- FOG (Modern Atmosphere) -- */}
            <fog attach="fog" args={['#09090b', 20, 200]} />

            <group position={[0, 0, 0]}>
                <Car />
                <City />
                <ContactShadows resolution={512} scale={50} blur={2} opacity={0.6} far={4} color="#000000" />
            </group>

            {/* -- POST PROCESSING -- */}
            <EffectComposer disableNormalPass>
                <Bloom
                    luminanceThreshold={1.2}
                    intensity={0.3}
                    radius={0.4}
                    mipmapBlur
                />

                {/* Subtle Noise for texture */}
                <Noise opacity={0.03} />
                <Vignette eskil={false} offset={0.2} darkness={0.7} />
                {/* DepthOfField removed for performance optimization */}
            </EffectComposer>
        </>
    )
}
