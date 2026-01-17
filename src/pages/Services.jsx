import { Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls } from '@react-three/drei'
import { Experience } from '../components/Experience'
import { ServicesPageLoader } from '../components/ServicesPageLoader'

export const Services = () => {
    useEffect(() => {
        // Disable body overflow for 3D scroll experience
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }} className="bg-[#09090b]">
            {/* The loader sits on top and only exits when internal assets are 100% ready */}
            <ServicesPageLoader />

            <Canvas
                shadows
                camera={{ position: [0, 0, 5], fov: 30 }}
                style={{ width: '100%', height: '100%' }}
                gl={{ antialias: true, stencil: false }}
            >
                <color attach="background" args={['#09090b']} />
                <Suspense fallback={null}>
                    <ScrollControls pages={5} damping={0.3}>
                        <Experience />
                    </ScrollControls>
                </Suspense>
            </Canvas>
        </div>
    );
};
