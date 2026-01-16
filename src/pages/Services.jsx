import { Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll } from '@react-three/drei'
import { Experience } from '../components/Experience'
import { Interface } from '../components/Interface'

export const Services = () => {
    useEffect(() => {
        // Disable body overflow for 3D scroll experience
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }} className="bg-[var(--bg-home)]">
            <Canvas
                shadows
                dpr={[1, 1.5]} // Cap pixel ratio for performance
                performance={{ min: 0.5 }} // Allow degrading quality
                camera={{ position: [0, 0, 5], fov: 30 }}
                className="bg-[#09090b]"
                style={{ width: '100%', height: '100%' }}
                gl={{ antialias: false }} // Disable default antialias if we use postprocessing, or for performace
            >
                <color attach="background" args={['#09090b']} />
                <Suspense fallback={null}>
                    <ScrollControls pages={20} damping={0.2}>
                        {/* The 3D World */}
                        <Experience />

                        {/* The 2D Overlay */}
                        <Scroll html style={{ width: '100vw', height: '100vh' }}>
                            <Interface />
                        </Scroll>
                    </ScrollControls>
                </Suspense>
            </Canvas>
        </div>
    );
};
