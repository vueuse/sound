export default `<template>
      <div class="flex justify-center">
        <button class="text-4xl" @mouseover="play" @mouseleave="stop">
          <span role="img" aria-label="trumpet"> 🎺 </span>
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
    </script>`
