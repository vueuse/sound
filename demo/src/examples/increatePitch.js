export default `
<template>
  <div class="flex flex-col justify-center">
    <div class="flex justify-center">
      <button class="text-4xl" @click="handleClick">
        <span role="img" aria-label="Person with lines near mouth"> 🗣 </span>
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import useSound from 'vue-use-sound'
import glugSfx from '../assets/glug.mp3'

export default {
  setup() {
    const playbackRate = ref(0.75)

    const [play] = useSound(glugSfx, {
      playbackRate,
      interrupt: true,
    })

    const handleClick = () => {
      playbackRate.value = playbackRate.value + 0.1

      play()
    }

    return {
      handleClick,
    }
  },
}
</script>
`
