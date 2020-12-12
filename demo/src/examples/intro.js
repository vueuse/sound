export default `
<template>
  <div class="flex justify-center">
      <button
        class="p-4 text-6xl bg-indigo-400 rounded-full"
        @mouseover="play"
        @mouseleave="stop"
      >
      <span role="img" aria-label="Trumpet"> 🎺 </span>
    </button>
  </div>
</template>

<script>
  import useSound from 'vue-use-sound'
  import fanfareSfx from '../assets/fanfare.mp3'
  export default {
    setup() {
      const [play, { stop }] = useSound(fanfareSfx)
      return {
        play,
        stop,
      }
    },
  }
</script>
`
