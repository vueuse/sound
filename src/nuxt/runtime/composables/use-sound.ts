import type { ComposableOptions } from '../../../types'
import { useSound as _useSound } from '../../../index'
import type { SoundsPaths } from '#build/sounds/types'
import { useNuxtApp } from '#imports'

export const useSound = (url: SoundsPaths, options: ComposableOptions = {}) => {
  const { $sounds } = useNuxtApp()

  // Merge global sound counfig with local one
  if ($sounds[url]) {
    options = { ...$sounds[url], ...options }
  }

  return _useSound(url as string, options)
}
