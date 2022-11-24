<script>
import { Motion } from '@vueuse/motion'

export default {
  components: {
    Motion, // This could be avoided using a plugin injecting a global component instead.
  },
}
</script>

<template>
  <Motion :initial="{ y: 25, opacity: 0 }" :enter="{ y: 0, opacity: 1, delay: 0.25 }">
    <div>Pop 🛹</div>
  </Motion>
</template>
