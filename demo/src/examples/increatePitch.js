export default `
<template>
  <div class="flex justify-center">
    <Button @click="handleClick" label="Person with lines from mouth">🗣</Button>
  </div>
</template>

<script>
import { ref } from 'vue'
import useSound from 'vue-use-sound'
import glugSfx from '../assets/glug.mp3'
import Button from './Button.vue'

export default {
  components: { Button },
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
      handleClick
    }
  },
}
</script>
`
