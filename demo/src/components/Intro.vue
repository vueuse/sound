<template>
  <div class="flex flex-col justify-center">
    <div class="flex justify-center">
      <button
        class="block text-6xl flex-0"
        @mouseover="play"
        @mouseleave="stop"
      >
        <span role="img" aria-label="trumpet"> 🎺 </span>
      </button>
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

export default {
  components: {
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
