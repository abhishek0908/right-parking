import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll, Stars } from '@react-three/drei'
import { Experience } from './components/Experience'
import { Interface } from './components/Interface'
import { Suspense } from 'react'

function App() {
  return (
    <>
      <Canvas
        shadows
        dpr={[1, 1.5]} // Limit pixel ratio for high-res screens
        performance={{ min: 0.5 }}
        camera={{ position: [0, 0, 5], fov: 30 }}
        className="bg-[#f5f5f7]"
        style={{ width: '100vw', height: '100vh', display: 'block' }}
      >
        <color attach="background" args={['#eef0f3']} />
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
