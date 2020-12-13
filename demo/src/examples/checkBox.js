export default `
<template>
  <div class="relative">
    <input
      type="checkbox"
      @mousedown="active = true"
      @mouseup="active = false"
      @mouseout="active = false"
      v-model="value"
      class="absolute top-0 left-0 z-20 w-full h-full opacity-0 cursor-pointer"
    />

    <div class="relative z-10 flex items-center">
      <div
        class="relative flex items-center justify-center w-10 h-10 p-1 border-4 rounded-xl visible-box"
        :style="{
          transform: \`scale(\${outlineSpring.scale})\`,
        }"
      >
        <div
          class="z-10 w-full h-full bg-pink-500 rounded-lg"
          :style="{
            transform: \`scale(\${filledSpring.scale})\`,
            opacity: \`\${filledSpring.scale}\`,
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import useSound from 'vue-use-sound'
import { computed, reactive, ref, watch } from 'vue'
import { spring } from 'vue3-spring'
import popDown from '../assets/pop-down.mp3'
import popUpOn from '../assets/pop-up-on.mp3'
import popUpOff from '../assets/pop-up-off.mp3'

export default {
  model: {
    prop: 'checked',
    event: 'change',
  },
  emits: ['update:checked'],
  props: {
    checked: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    value: {
      get() {
        return this.checked
      },
      set(value) {
        if (this.value) {
          this.filledSpring.scale = 1.0
          this.playOn()
        } else {
          this.filledSpring.scale = 0
          this.playOff()
        }

        this.$emit('update:checked', value)
      },
    },
  },
  setup({ checked }) {
    // Sounds
    const [playActive] = useSound(popDown, { volume: 0.25 })
    const [playOn] = useSound(popUpOn, { volume: 0.25 })
    const [playOff] = useSound(popUpOff, { volume: 0.25 })

    // Refs
    const active = ref(false)

    // Springs
    const springConfig = {
      stiffness: 400,
      damping: 22,
    }
    const filledSpring = spring({ scale: 1.0 }, springConfig)
    const outlineSpring = spring(
      {
        scale: 1.0,
      },
      springConfig,
    )

    // Watchers
    watch([active], () => {
      if (active.value) {
        playActive()
        outlineSpring.scale = 0.8
      } else {
        outlineSpring.scale = 1
      }
    })

    return {
      active,
      playActive,
      playOn,
      playOff,
      filledSpring,
      outlineSpring,
    }
  },
}
</script>
`
