<template>
  <div class="flex flex-col justify-center">
    <div class="flex items-center justify-center gap-4 mb-6">
      <Button @click="play({ id: 'kick' })" label="Kick">🥁</Button>

      <Button @click="play({ id: 'hihat' })" label="Hi-hat">🎩</Button>

      <Button @click="play({ id: 'snare' })" label="Snare">🍗</Button>

      <Button @click="play({ id: 'cowbell' })" label="Cowbell">🔔</Button>
    </div>

    <code-heading>
      A drum basic yet fun drum machine, showing how to use sound sprites.<br />
      You can also use keyboard keys to play the drum machine: 1️⃣&nbsp;,
      2️⃣&nbsp;, 3️⃣&nbsp;, 4️⃣
    </code-heading>
    <code-block :codeText="CodeText" />
  </div>
</template>

<script>
import { onMounted, onUnmounted } from 'vue'
import useSound from 'vue-use-sound'
import drumSfx from '../assets/909-drums.mp3'
import Button from './Button.vue'
import CodeHeading from './CodeHeading.vue'
import CodeBlock from './CodeBlock.vue'
import CodeText from '../examples/drumMachine.js'

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
  components: { Button, CodeHeading, CodeBlock },
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
      CodeText,
    }
  },
}
</script>
