<template>
  <div class="flex flex-col justify-center">
    <div class="flex justify-center mb-6">
      <Button @click="handleClick">🎛️</Button>
    </div>

    <code-heading> Play the sound with a random volume value. </code-heading>

    <code-block :codeText="CodeText" />
  </div>
</template>

<script>
import { useSound } from '@vueuse/sound'
import { ref } from 'vue'
import glugSfx from '../assets/glug.mp3'
import CodeText from '../examples/volume'
import Button from './Button.vue'
import CodeBlock from './CodeBlock.vue'
import CodeHeading from './CodeHeading.vue'

export default {
  components: { CodeHeading, CodeBlock, Button },
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
