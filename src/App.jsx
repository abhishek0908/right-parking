import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll, Stars } from '@react-three/drei'
import { Experience } from './components/Experience'
import { Interface } from './components/Interface'
import { Loader } from './components/Loader'
import { Suspense } from 'react'

function App() {
  return (
    <>
      <Loader />
      <Canvas
        shadows
        dpr={[1, 1.5]} // Limit pixel ratio for high-res screens
        performance={{ min: 0.5 }}
        camera={{ position: [0, 0, 5], fov: 30 }}
        className="bg-[#09090b]"
        style={{ width: '100vw', height: '100vh', display: 'block' }}
      >
        <color attach="background" args={['#09090b']} />
        <Suspense fallback={null}>
          <ScrollControls pages={10} damping={0.4}>
            {/* The 3D World */}
            <Experience />

            {/* The 2D Overlay */}
            <Scroll html style={{ width: '100vw', height: '100vh' }}>
              <Interface />
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </>
  )
}

export default App
