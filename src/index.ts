import { onMounted, ref, watch } from 'vue-demi'
import {
  ComposableOptions,
  PlayFunction,
  PlayOptions,
  ReturnedValue,
} from './types'

function useSound(
  url: string,
  {
    volume = 1,
    playbackRate = 1,
    soundEnabled = true,
    interrupt = false,
    onload,
    ...delegated
  }: ComposableOptions = {},
) {
  const HowlConstructor = ref<HowlStatic | null>(null)
  const isPlaying = ref<boolean>(false)
  let duration = ref<number | null>(null)
  let sound = ref<Howl | null>(null)

  onMounted(() => {
    import('howler').then((mod) => {
      HowlConstructor.value = mod.Howl

      sound.value = new HowlConstructor.value({
        src: [url],
        volume,
        rate: playbackRate,
        onload: handleLoad,
        ...delegated,
      })
    })
  })

  const handleLoad = function () {
    if (typeof onload === 'function') {
      // @ts-ignore
      onload.call(this)
    }

    // @ts-ignore
    duration = duration * 1000
  }

  watch(
    () => [url],
    () => {
      if (HowlConstructor && HowlConstructor.value && sound && sound.value) {
        sound.value = new HowlConstructor.value({
          src: [url],
          volume,
          onload: handleLoad,
          ...delegated,
        })
      }
    },
  )

  watch(
    () => [volume, playbackRate],
    () => {
      if (sound.value) {
        sound.value.volume(volume)
        sound.value.rate(playbackRate)
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
      if (sound && sound.value && !sound.value.playing()) {
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

  const returnedValue: ReturnedValue = [
    play,
    {
      sound,
      isPlaying,
      duration,
      pause,
      stop,
    },
  ]

  return returnedValue
}

export default useSound
