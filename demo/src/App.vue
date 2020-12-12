<template>
  <div class="flex flex-col justify-center">
    <div class="flex justify-center align-center">
      <h1 class="m-6 text-4xl font-bold" @click="play">
        🔊&nbsp;vue-use-sound
      </h1>
    </div>
  </div>
</template>

<script>
import useSound from 'vue-use-sound'
import Button from './assets/button.wav'

export default {
  name: 'App',
  setup() {
    const [play] = useSound(Button)

    return {
      play,
    }
  },
}
</script>
