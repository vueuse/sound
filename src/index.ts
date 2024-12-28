import type { ComposableOptions, HowlStatic, MaybeRef, PlayFunction, PlayOptions, ReturnedValue } from './types'
import { onMounted, ref, unref, watch } from 'vue-demi'

export * from './types'

export function useSound(
  url: MaybeRef<string>,
  { volume = 1, playbackRate = 1, soundEnabled = true, interrupt = false, autoplay = false, onload, ...delegated }: ComposableOptions = {},
) {
  const HowlConstructor = ref<HowlStatic | null>(null)
  const isPlaying = ref<boolean>(false)
  const duration = ref<number | null>(null)
  const sound = ref<Howl | null>(null)

  function handleLoad(this: Howl, soundId: number) {
    if (typeof onload === 'function') onload.call(this, soundId)
    duration.value = (duration.value || sound.value?.duration() || 0) * 1000

    if (autoplay === true) {
      isPlaying.value = true
    }
  }

  onMounted(async () => {
    // Howler registers `Howl` and `Howler` globally when imported
    await import('howler')

    // Use global Howl constructor
    HowlConstructor.value = Howl

    sound.value = new HowlConstructor.value({
      src: unref(url) as string,
      volume: unref(volume) as number,
      rate: unref(playbackRate) as number,
      onload: handleLoad,
      ...delegated,
    })
  })

  watch(
    () => [unref(url)],
    () => {
      if (HowlConstructor.value && HowlConstructor.value && sound && sound.value) {
        sound.value = new HowlConstructor.value({
          src: unref(url) as string,
          volume: unref(volume) as number,
          rate: unref(playbackRate) as number,
          onload: handleLoad,
          ...delegated,
        })
      }
    },
  )

  watch(
    () => [unref(volume), unref(playbackRate)],
    () => {
      if (sound.value) {
        sound.value.volume(unref(volume) as number)
        sound.value.rate(unref(playbackRate) as number)
      }
    },
  )

  const play: PlayFunction = (options?: PlayOptions) => {
    if (typeof options === 'undefined') {
      options = {}
    }

    if (!sound.value || (!soundEnabled && !options.forceSoundEnabled)) {
      return
    }

    if (interrupt) {
      sound.value.stop()
    }

    if (options.playbackRate) {
      sound.value.rate(options.playbackRate)
    }

    sound.value.play(options.id)

    sound.value.once('end', () => {
      if (sound.value && sound.value && !sound.value.playing()) {
        isPlaying.value = false
      }
    })

    isPlaying.value = true
  }

  const stop = (id?: number) => {
    if (!sound.value) {
      return
    }

    sound.value.stop(typeof id === 'number' ? id : undefined)

    isPlaying.value = false
  }

  const pause = (id?: number) => {
    if (!sound.value) {
      return
    }

    sound.value.pause(typeof id === 'number' ? id : undefined)

    isPlaying.value = false
  }

  const returnedValue: ReturnedValue = {
    play,
    sound,
    isPlaying,
    duration,
    pause,
    stop,
  }

  return returnedValue
}
