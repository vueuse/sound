export default `
<template>
  <div class="flex justify-center">
    <Button @mouseover="play" @mouseleave="stop" label="Trumpet"> 🎺 </Button>
  </div>
</template>

<script>
import useSound from 'vue-use-sound'
import trumpetSfx from '../assets/fanfare.mp3'
import Button from './Button.vue'

export default {
  components: {
    Button
  },
  setup() {
    const [play, { stop }] = useSound(trumpetSfx)

    return {
      play,
      stop,
    }
  },
}
</script>
`
