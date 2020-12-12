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

    <p class="p-4 mt-4 bg-indigo-400 rounded-t-xl">
      Play a sound when hovering the trumpet.
    </p>

    <code-block :codeText="CodeText" />
  </div>
</template>

<script>
import useSound from 'vue-use-sound'
import trumpetSfx from '../assets/fanfare.mp3'
import CodeBlock from './CodeBlock.vue'
import CodeText from '../examples/intro.js'

export default {
  components: {
    CodeBlock,
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
