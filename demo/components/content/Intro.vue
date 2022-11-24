<script>
export default {
  setup() {
    const { play, stop } = useSound('/sounds/fanfare.mp3')

    return {
      play,
      stop,
    }
  },
}
</script>

<template>
  <div class="flex flex-col justify-center">
    <div class="mb-6 flex justify-center">
      <Button @mouseover="play" @mouseleave="stop"> 🎺 </Button>
    </div>

    <code-heading> Play a sound when hovering the trumpet. </code-heading>

    <div class="overflow-x-scroll bg-gray-900 p-4">
      <slot />
    </div>
  </div>
</template>
