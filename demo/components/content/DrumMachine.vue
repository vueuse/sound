<script>
import { onMounted, onUnmounted } from 'vue'

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
  setup() {
    const { play } = useSound('/sounds/909-drums.mp3', {
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

<template>
  <div class="flex flex-col justify-center">
    <div class="mb-6 flex items-center justify-center gap-4">
      <Button label="Kick" @click="play({ id: 'kick' })">🥁</Button>

      <Button label="Hi-hat" @click="play({ id: 'hihat' })">🎩</Button>

      <Button label="Snare" @click="play({ id: 'snare' })">🍗</Button>

      <Button label="Cowbell" @click="play({ id: 'cowbell' })">🔔</Button>
    </div>

    <code-heading>
      A drum basic yet fun drum machine, showing how to use sound sprites.<br />
      You can also use keyboard keys to play the drum machine: 1️⃣&nbsp;, 2️⃣&nbsp;, 3️⃣&nbsp;, 4️⃣
    </code-heading>

    <div class="overflow-x-scroll bg-gray-900 p-4">
      <slot />
    </div>
  </div>
</template>
