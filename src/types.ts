export type SpriteMap = {
  [key: string]: [number, number]
}

export interface HookOptions {
  volume?: number
  playbackRate?: number
  interrupt?: boolean
  soundEnabled?: boolean
  sprite?: SpriteMap
  onload?: () => void
}

export interface PlayOptions {
  id?: number
  forceSoundEnabled?: boolean
  playbackRate?: number
}

export type PlayFunction = (options?: PlayOptions) => void

export interface ExposedData {
  sound: Howl | null
  stop: (id?: number) => void
  pause: (id?: number) => void
  isPlaying: boolean
  duration: number | null
}

export type ReturnedValue = [PlayFunction, ExposedData]
