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
        <div className="force-dark" style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <Canvas
                shadows
                dpr={[1, 1.5]}
                performance={{ min: 0.5 }}
                camera={{ position: [0, 0, 5], fov: 30 }}
                className="bg-[#09090b]"
                style={{ width: '100%', height: '100%' }}
            >
                <color attach="background" args={['#09090b']} />
                <Suspense fallback={null}>
                    <ScrollControls pages={20} damping={0.1}>
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
