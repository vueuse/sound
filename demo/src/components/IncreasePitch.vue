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
import { ref } from 'vue'
import useSound from 'vue-use-sound'
import glugSfx from '../assets/glug.mp3'
import CodeText from '../examples/increatePitch'
import CodeHeading from './CodeHeading.vue'
import CodeBlock from './CodeBlock.vue'
import Button from './Button.vue'

export default {
  components: { CodeHeading, CodeBlock, Button },
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
      CodeText,
    }
  },
}
</script>
