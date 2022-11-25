<script>
export default {
  name: 'App',
  setup() {
    return {
      play: () => {},
    }
  },
}
</script>

<template>
  <div class="max-w-full px-2">
    <div class="flex items-center justify-center">
      <h1 class="m-6 cursor-pointer select-none text-4xl font-bold" @click="play">🎺&nbsp;@vueuse/sound</h1>
    </div>

    <slot />

    <div class="flex flex-col items-center justify-center">
      <a href="https://github.com/VueUse/sound" class="mt-12 mb-6"> ↩️&nbsp;&nbsp;Bring me back to GitHub </a>

      <p class="mb-6 text-center">
        Written by
        <a href="https://twitter.com/yaeeelglx" target="_blank">Yaël Guilloux</a>
        and inspired from
        <a href="https://github.com/joshwcomeau/use-sound" target="_blank">use-sound</a>
        by
        <a href="https://twitter.com/JoshWComeau" target="_blank">Josh W. Comeau</a>.
      </p>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
a {
  @apply font-bold transition-colors duration-100 hover:text-pink-500;
}
</style>
