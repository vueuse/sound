<script>
export default {
  setup() {
    const volume = ref(0.1)

    const { play } = useSound('/sounds/glug.mp3', {
      volume,
      interrupt: true,
    })

    const handleClick = () => {
      volume.value = parseFloat(Math.random().toFixed(2))

      play()
    }

    return {
      handleClick,
    }
  },
}
</script>

<template>
  <div class="flex flex-col justify-center">
    <div class="mb-6 flex justify-center">
      <Button @click="handleClick">🎛️</Button>
    </div>

    <code-heading> Play the sound with a random volume value. </code-heading>

    <div class="overflow-x-scroll bg-gray-900 p-4">
      <slot />
    </div>
  </div>
</template>
