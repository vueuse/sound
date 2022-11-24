<script>
export default {
  setup() {
    const playbackRate = ref(0.75)

    const { play } = useSound('/sounds/glug.mp3', {
      playbackRate,
      interrupt: true,
    })

    const handleClick = () => {
      playbackRate.value = playbackRate.value + 0.1

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
      <Button @click="handleClick">🗣</Button>
    </div>

    <code-heading> Increase pitch each time we click the button. </code-heading>

    <div class="overflow-x-scroll bg-gray-900 p-4">
      <slot />
    </div>
  </div>
</template>
