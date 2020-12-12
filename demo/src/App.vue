<template>
  <div>
    <div class="flex items-center justify-center">
      <h1
        class="m-6 text-4xl font-bold cursor-pointer select-none"
        @click="play"
      >
        🔊&nbsp;vue-use-sound
      </h1>
    </div>

    <intro />
  </div>
</template>

<script>
import useSound from 'vue-use-sound'
import Button from './assets/button.wav'
import Intro from './components/Intro.vue'

export default {
  components: { Intro },
  name: 'App',
  setup() {
    const [play] = useSound(Button)

    return {
      play,
    }
  },
}
</script>
