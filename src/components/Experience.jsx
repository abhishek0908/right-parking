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

        // Start: Standing low behind the car
        const startPos = new THREE.Vector3(3 * mobileOffset, 1.6 * mobileOffset, 46 + (isMobile ? 10 : 0))
        const startLookAt = new THREE.Vector3(3, 1.0, 30)

        // Following: Track behind the car
        const followPos = new THREE.Vector3(3.5 * mobileOffset, 2.0 * mobileOffset, 15 + (isMobile ? 5 : 0))
        const followLookAt = new THREE.Vector3(3, 1.2, -5)

        // Parking view (Tracking to -17)
        const parkingPos = new THREE.Vector3(10 * mobileOffset, 4.5 * mobileOffset, -12)
        const parkingLookAt = new THREE.Vector3(-5, 0.5, -17)

        // Final: Hero shot
        const parkedPos = new THREE.Vector3(2 * mobileOffset, 3 * mobileOffset, -12 + (isMobile ? 2 : 0))
        const parkedLookAt = new THREE.Vector3(-5, 0.8, -17)

        // Overview: Bird's eye
        const birdEyePos = new THREE.Vector3(-5, isMobile ? 100 : 80, -17)
        const birdEyeLookAt = new THREE.Vector3(-5, 0, -17.1)

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

        // Apply camera position
        state.camera.position.lerp(targetPos, 0.08)

        // Smooth lookAt
        const lookAtMatrix = new THREE.Matrix4().lookAt(state.camera.position, targetLookAt, new THREE.Vector3(0, 1, 0))
        const targetQuat = new THREE.Quaternion().setFromRotationMatrix(lookAtMatrix)
        state.camera.quaternion.slerp(targetQuat, 0.08)
    })

    return (
        <>
            {/* Lighter Indoor Parking Atmosphere */}
            <color attach="background" args={['#6b7280']} />

            {/* -- LIGHTING (Brightened for visibility) -- */}
            <ambientLight intensity={2.5} color="#ffffff" />

            {/* Main entry bounce light */}
            <directionalLight
                position={[20, 30, 20]}
                intensity={3.0}
                color="#ffffff"
                castShadow
                shadow-bias={-0.0001}
                shadow-mapSize={[1024, 1024]}
            />

            {/* Environment Reflections - Using bright city preset */}
            <Environment preset="city" blur={1} background={false} environmentIntensity={1.0} />

            {/* -- FOG (Atmosphere) - Lightened -- */}
            <fog attach="fog" args={['#1e293b', 20, 150]} />

            <group position={[0, -0.5, 0]}>
                <Car />
                <City />
                <ContactShadows resolution={1024} scale={50} blur={2} opacity={0.6} far={4} color="#000000" />
            </group>

            {/* -- POST PROCESSING -- */}
            <EffectComposer disableNormalPass>
                <Bloom
                    luminanceThreshold={1.0}
                    intensity={0.8}
                    radius={0.4}
                />

                {/* Subtle Noise for texture */}
                <Noise opacity={0.03} />
                <Vignette eskil={false} offset={0.2} darkness={0.7} />
                <DepthOfField
                    focusDistance={0.03}
                    focalLength={0.06}
                    bokehScale={3}
                />
            </EffectComposer>
        </>
    )
}
