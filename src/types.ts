import type { Howl, HowlOptions } from 'howler'
import type { ComputedRef, Ref } from 'vue-demi'

export interface HowlStatic {
  new (properties: HowlOptions): Howl
}

export type MaybeRef<T> = T | Ref<T> | ComputedRef<T>

export interface SpriteMap {
  [key: string]: [number, number]
}

export interface ComposableOptions {
  volume?: MaybeRef<number>
  playbackRate?: MaybeRef<number>
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

export interface ReturnedValue {
  play: PlayFunction
  sound: Ref<Howl | null>
  stop: (id?: number) => void
  pause: (id?: number) => void
  isPlaying: Ref<boolean>
  duration: Ref<number | null>
}
