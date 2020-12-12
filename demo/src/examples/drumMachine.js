export default `
<template>
    <div class="flex items-center justify-center gap-4">
      <Button @click="play({ id: 'kick' })" label="Kick">🥁</Button>

      <Button @click="play({ id: 'hihat' })" label="Hi-hat">🎩</Button>

      <Button @click="play({ id: 'snare' })" label="Snare">🍗</Button>

      <Button @click="play({ id: 'cowbell' })" label="Cowbell">🔔</Button>
    </div>
</template>

<script>
import { onMounted, onUnmounted } from 'vue'
import useSound from 'vue-use-sound'
import drumSfx from '../assets/909-drums.mp3'
import Button from './Button.vue'

const useKeyboardBindings = (map) => {
  const handlePress = (ev) => {
    const handler = map[ev.key]

    if (typeof handler === 'function') {
      handler()
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handlePress)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handlePress)
  })
}

export default {
  components: { Button },
  setup() {
    const [play] = useSound(drumSfx, {
      sprite: {
        kick: [0, 350],
        hihat: [374, 160],
        snare: [666, 290],
        cowbell: [968, 200],
      },
    })

    useKeyboardBindings({
      1: () => play({ id: 'kick' }),
      2: () => play({ id: 'hihat' }),
      3: () => play({ id: 'snare' }),
      4: () => play({ id: 'cowbell' }),
    })

    return {
      play,
    }
  },
}
</script>
`
