export default `
<template>
  <div class="flex flex-col justify-center">
    <div class="flex justify-center mb-6">
      <Button @click="handleClick" label="Control knobs">🎛️</Button>
    </div>
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
    const volume = ref(0.1)

    const { play } = useSound(glugSfx, {
      volume,
      interrupt: true,
    })

    const handleClick = () => {
      volume.value = parseFloat(Math.random().toFixed(2))

      play()
    }


    return {
      handleClick,
      CodeText,
    }
  },
}
</script>
`
