import { Ref } from 'vue-demi'

export type SpriteMap = {
  [key: string]: [number, number]
}

export interface ComposableOptions {
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
  sound: Ref<Howl | null>
  stop: (id?: number) => void
  pause: (id?: number) => void
  isPlaying: Ref<boolean>
  duration: Ref<number | null>
}

export type ReturnedValue = [PlayFunction, ExposedData]
