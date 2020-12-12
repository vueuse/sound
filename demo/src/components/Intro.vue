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
import useSound from 'vue-use-sound'
import trumpetSfx from '../assets/fanfare.mp3'
import CodeBlock from './CodeBlock.vue'
import CodeText from '../examples/intro.js'
import CodeHeading from './CodeHeading.vue'
import Button from './Button.vue'

export default {
  components: {
    Button,
    CodeBlock,
    CodeHeading,
  },
  setup() {
    const [play, { stop }] = useSound(trumpetSfx)

    return {
      CodeText,
      play,
      stop,
    }
  },
}
</script>
