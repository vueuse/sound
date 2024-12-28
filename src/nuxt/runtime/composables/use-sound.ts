import type { SoundsPaths } from '#build/sounds/index.d'
import type { ComposableOptions } from '../../../types'
import { useNuxtApp } from '#imports'
import { useSound as _useSound } from '../../../index'

export function useSound(url: SoundsPaths, options: ComposableOptions = {}) {
  const { $sounds } = useNuxtApp()

  // Merge global sound counfig with local one
  if ($sounds[url]) {
    options = { ...$sounds[url], ...options }
  }

  return _useSound(url as string, options)
}
