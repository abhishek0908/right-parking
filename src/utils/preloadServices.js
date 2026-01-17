import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { TextureLoader } from 'three'

/**
 * Preload all assets for the Services page
 * This should be called early to ensure smooth navigation
 */
export const preloadServicesAssets = () => {
    // Preload the Mercedes car model (used in Services)
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
            console.warn('Failed to preload Services car model:', error)
        })
        
        // Preload logo texture used in ParkingEnvironment
        const textureLoader = new TextureLoader()
        textureLoader.load('/logo.svg', () => {
            // Texture loaded and cached
        }, undefined, (error) => {
            console.warn('Failed to preload logo texture:', error)
        })
    } catch (error) {
        console.warn('Failed to preload Services assets:', error)
    }
}

/**
 * Preload Services page components by importing them
 * This ensures all code is loaded and ready
 */
export const preloadServicesComponents = async () => {
    try {
        // Dynamically import Services page components
        await Promise.all([
            import('../pages/Services'),
            import('../components/Experience'),
            import('../components/ParkingEnvironment'),
            import('../components/Car'),
        ])
    } catch (error) {
        console.warn('Failed to preload Services components:', error)
    }
}
