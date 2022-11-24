<script>
import { useVModel } from '@vueuse/core'
import { useMotion } from '@vueuse/motion'

export default {
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    checked: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['update:checked'],
  setup(props) {
    const outline = ref()
    const fill = ref()

    const model = useVModel(props, 'checked')

    // Sounds
    const activeSound = useSound('/sounds/pop-down.mp3', { volume: 0.25 })
    const onSound = useSound('/sounds/pop-up-on.mp3', { volume: 0.25 })
    const offSound = useSound('/sounds/pop-up-off.mp3', { volume: 0.25 })

    // Refs
    const active = ref(false)

    // Springs
    const springConfig = {
      stiffness: 400,
      damping: 22,
    }

    const { variant: outlineVariant } = useMotion(outline, {
      initial: { scale: 1.0, transition: { type: 'spring', ...springConfig } },
      active: { scale: 0.8, transition: { type: 'spring', ...springConfig } },
    })
    const { variant: fillVariant } = useMotion(fill, {
      initial: { scale: 1.0, opacity: 1, transition: { type: 'spring', ...springConfig } },
      active: { scale: 0.1, opacity: 0, transition: { type: 'spring', ...springConfig } },
    })

    // Watchers
    watch(active, (newVal) => {
      if (newVal) {
        activeSound.play()
        outlineVariant.value = 'active'
      } else {
        outlineVariant.value = 'initial'
      }
    })

    watch(
      () => props.checked,
      (newVal) => {
        if (newVal) {
          onSound.play()
          fillVariant.value = 'active'
        } else {
          offSound.play()
          fillVariant.value = 'initial'
        }
      },
    )

    return {
      model,
      outline,
      fill,
      active,
      activeSound,
      onSound,
      offSound,
      outlineVariant,
      fillVariant,
    }
  },
}
</script>

<template>
  <div class="relative">
    <input
      v-model="model"
      type="checkbox"
      class="absolute top-0 left-0 z-20 h-full w-full cursor-pointer opacity-0"
      @mousedown="active = true"
      @mouseup="active = false"
      @mouseout="active = false"
      @click="$emit('update:checked', !checked)"
    />

    <div class="relative z-10 flex items-center">
      <div ref="outline" class="visible-box relative flex h-10 w-10 items-center justify-center rounded-xl border-4 p-1">
        <div ref="fill" class="z-10 h-full w-full rounded-lg bg-pink-500" />
      </div>
    </div>
  </div>
</template>
