import { ShaderMaterial } from 'three'
import { ReactThreeFiber } from '@react-three/fiber'

// Declare custom shader materials for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      cosmicVoidMaterial: ReactThreeFiber.ShaderMaterialProps & {
        uTime?: number
        uMouse?: [number, number]
        uResolution?: [number, number]
        uIntensity?: number
        uDimensionalTear?: number
        uDistortionStrength?: number
      }
      realityFabricMaterial: ReactThreeFiber.ShaderMaterialProps & {
        uTime?: number
        uMouse?: [number, number]
        uWarpIntensity?: number
        uBaseColor?: THREE.Color
        uHighlightColor?: THREE.Color
        uGridIntensity?: number
      }
      dimensionalPortalMaterial: ReactThreeFiber.ShaderMaterialProps & {
        uTime?: number
        uPortalIntensity?: number
        uPortalColor?: THREE.Color
      }
    }
  }
}

export {}
