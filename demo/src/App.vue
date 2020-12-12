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

    <intro class="mt-6" />
    <increase-pitch class="mt-12" />
    <drum-machine class="mt-12" />
  </div>
</template>

<script>
import useSound from 'vue-use-sound'
import Button from './assets/button.wav'
import DrumMachine from './components/DrumMachine.vue'
import IncreasePitch from './components/IncreasePitch.vue'
import Intro from './components/Intro.vue'

export default {
  components: { Intro, IncreasePitch, DrumMachine },
  name: 'App',
  setup() {
    const [play] = useSound(Button)

    return {
      play,
    }
  },
}
</script>
