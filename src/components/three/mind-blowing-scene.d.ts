import { ComponentType } from 'react'

export interface MindBlowingSceneProps {
  mousePosition: { x: number; y: number }
  phase: string
}

export const MindBlowingScene: ComponentType<MindBlowingSceneProps>
