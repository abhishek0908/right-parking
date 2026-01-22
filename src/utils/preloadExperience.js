import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { TextureLoader } from 'three'

/**
 * Preload all assets for the Experience page
 * This should be called early to ensure smooth navigation
 */
export const preloadExperienceAssets = () => {
    // Preload the Mercedes car model (used in Experience)
    const DRACO_URL = 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/'
    const MODEL_PATH = '/mersedes-benz_s-class_w223_brabus_850.glb'

    try {
        // Use GLTFLoader directly to preload the model
        const loader = new GLTFLoader()
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath(DRACO_URL)
        loader.setDRACOLoader(dracoLoader)

        // Preload the model (this will cache it)
        loader.load(MODEL_PATH, () => {
            // Model loaded and cached
        }, undefined, (error) => {
            console.warn('Failed to preload Experience car model:', error)
        })

        // Preload logo texture used in ParkingEnvironment
        const textureLoader = new TextureLoader()
        textureLoader.load('/logo.svg', () => {
            // Texture loaded and cached
        }, undefined, (error) => {
            console.warn('Failed to preload logo texture:', error)
        })
    } catch (error) {
        console.warn('Failed to preload Experience assets:', error)
    }
}

/**
 * Preload Experience page components by importing them
 * This ensures all code is loaded and ready
 */
export const preloadExperienceComponents = async () => {
    try {
        // Dynamically import Experience page components
        await Promise.all([
            import('../pages/ExperiencePage'),
            import('../components/Experience'),
            import('../components/ParkingEnvironment'),
            import('../components/Car'),
        ])
    } catch (error) {
        console.warn('Failed to preload Experience components:', error)
    }
}
