<template>
  <div>
    <div class="flex items-center justify-center">
      <h1
        class="m-6 text-4xl font-bold cursor-pointer select-none"
        @click="play"
      >
        🎺&nbsp;vue-use-sound
      </h1>
    </div>

    <checkboxes id="#checkboxes" class="mt-12" />
    <intro id="#hover" class="mt-12" />
    <increase-pitch id="#pitch" class="mt-12" />
    <drum-machine id="#drums" class="mt-12" />

    <div class="flex flex-col items-center justify-center">
      <a href="https://github.com/Tahul/vue-use-sound" class="mt-12 mb-6">
        ↩️&nbsp;&nbsp;Bring me back to GitHub
      </a>

      <p class="mb-6 text-center">
        This package has been written by
        <a href="https://twitter.com/yaeeelglx" target="_blank"
          >Yaël Guilloux</a
        >
        and is deeply inspired from
        <a href="https://twitter.com/JoshWComeau" target="_blank"
          >Josh W. Comeau</a
        >
        work,
        <a href="https://github.com/joshwcomeau/use-sound" target="_blank"
          >use-sound</a
        >.
      </p>
    </div>
  </div>
</template>

<script>
import useSound from 'vue-use-sound'
import Button from './assets/button.wav'
import DrumMachine from './components/DrumMachine.vue'
import IncreasePitch from './components/IncreasePitch.vue'
import Intro from './components/Intro.vue'
import Checkboxes from './components/Checkboxes.vue'

export default {
  components: { Intro, IncreasePitch, DrumMachine, Checkboxes },
  name: 'App',
  setup() {
    const [play] = useSound(Button)

    return {
      play,
    }
  },
}
</script>

<style scoped>
a {
  @apply font-bold transition-colors duration-100 hover:text-pink-500;
}
</style>
