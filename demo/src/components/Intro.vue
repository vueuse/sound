<template>
  <div class="flex flex-col justify-center">
    <div class="flex justify-center mb-6">
      <Button @mouseover="play" @mouseleave="stop"> 🎺 </Button>
    </div>

    <code-heading> Play a sound when hovering the trumpet. </code-heading>

    <code-block :codeText="CodeText" />
  </div>
</template>

<script>
import { useSound } from '@vueuse/sound'
import trumpetSfx from '../assets/fanfare.mp3'
import CodeText from '../examples/intro.js'
import Button from './Button.vue'
import CodeBlock from './CodeBlock.vue'
import CodeHeading from './CodeHeading.vue'

export default {
  components: {
    Button,
    CodeBlock,
    CodeHeading,
  },
  setup() {
    const { play, stop } = useSound(trumpetSfx)

    return {
      CodeText,
      play,
      stop,
    }
  },
}
</script>
