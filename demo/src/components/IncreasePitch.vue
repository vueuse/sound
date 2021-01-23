<template>
  <div class="flex flex-col justify-center">
    <div class="flex justify-center mb-6">
      <Button @click="handleClick">🗣</Button>
    </div>

    <code-heading> Increase pitch each time we click the button. </code-heading>

    <code-block :codeText="CodeText" />
  </div>
</template>

<script>
import { useSound } from '@vueuse/sound'
import { ref } from 'vue'
import glugSfx from '../assets/glug.mp3'
import CodeText from '../examples/increasePitch'
import Button from './Button.vue'
import CodeBlock from './CodeBlock.vue'
import CodeHeading from './CodeHeading.vue'

export default {
  components: { CodeHeading, CodeBlock, Button },
  setup() {
    const playbackRate = ref(0.75)

    const { play } = useSound(glugSfx, {
      playbackRate,
      interrupt: true,
    })

    const handleClick = () => {
      playbackRate.value = playbackRate.value + 0.1

      play()
    }

    return {
      handleClick,
      CodeText,
    }
  },
}
</script>
