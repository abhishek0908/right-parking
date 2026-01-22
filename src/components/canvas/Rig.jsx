import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";

export function Rig() {
    const scroll = useScroll();

    useFrame((state) => {
        // Manual range calc: Map 0..0.264 to 0..1
        const tRaw = scroll.offset / 0.764;
        const offset = Math.max(0, Math.min(1, tRaw));

        // Camera positioned closer to the ramp from the beginning
        const angle = offset * Math.PI * 0.5;

        // Camera orbits closer to the scene
        const targetX = -5 + Math.sin(angle) * 8;
        const targetZ = 14 + Math.cos(angle) * 6;
        // Camera descends as user scrolls
        const targetY = 11.1 - offset * 12;

        // Zoom effect: Start zooming in after 70% scroll
        const zoomProgress = Math.max(0, (scroll.offset - 0.7) / 0.3);
        const targetFov = 50 - zoomProgress * 27; // Zoom from 50 to 35
        state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, targetFov, 0.1);
        state.camera.updateProjectionMatrix();

        state.camera.position.lerp(
            new THREE.Vector3(targetX, targetY, targetZ),
            0.08
        );
        state.camera.lookAt(8, targetY - 1.9, 0);
    });

    return null;
}
