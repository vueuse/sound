---
title: '@vueuse/sound'
description: '🔊 A Vue composable for playing sound effects.'
---

::checkboxes
---
id: checkboxes
class: "mt-12"
---

```ts
<template>
  <div class="relative">
    <input
      type="checkbox"
      @mousedown="active = true"
      @mouseup="active = false"
      @mouseout="active = false"
      v-model="value"
      class="absolute top-0 left-0 z-20 w-full h-full opacity-0 cursor-pointer"
    />

    <div class="relative z-10 flex items-center">
      <div
        class="relative flex items-center justify-center w-10 h-10 p-1 border-4 rounded-xl visible-box"
        :style="{
          transform: `scale(${outlineSpring.scale})`,
        }"
      >
        <div
          class="z-10 w-full h-full bg-pink-500 rounded-lg"
          :style="{
            transform: `scale(${filledSpring.scale})`,
            opacity: `${filledSpring.scale}`,
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useSound } from '@vueuse/sound'
import { computed, reactive, ref, watch } from 'vue'
import { spring } from 'vue3-spring'
import popDown from '../assets/sounds/pop-down.mp3'
import popUpOn from '../assets/sounds/pop-up-on.mp3'
import popUpOff from '../assets/sounds/pop-up-off.mp3'

export default {
  model: {
    prop: 'checked',
    event: 'change',
  },
  emits: ['update:checked'],
  props: {
    checked: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    value: {
      get() {
        return this.checked
      },
      set(value) {
        if (this.value) {
          this.filledSpring.scale = 1.0
          this.onSound.play()
        } else {
          this.filledSpring.scale = 0
          this.offSound.play()
        }

        this.$emit('update:checked', value)
      },
    },
  },
  setup({ checked }) {
    // Sounds
    const activeSound = useSound(popDown, { volume: 0.25 })
    const onSound = useSound(popUpOn, { volume: 0.25 })
    const offSound = useSound(popUpOff, { volume: 0.25 })

    // Refs
    const active = ref(false)

    // Springs
    const springConfig = {
      stiffness: 400,
      damping: 22,
    }
    const filledSpring = spring({ scale: 1.0 }, springConfig)
    const outlineSpring = spring(
      {
        scale: 1.0,
      },
      springConfig,
    )

    // Watchers
    watch([active], () => {
      if (active.value) {
        activeSound.play()
        outlineSpring.scale = 0.8
      } else {
        outlineSpring.scale = 1
      }
    })

    return {
      active,
      activeSound,
      onSound,
      offSound,
      filledSpring,
      outlineSpring,
    }
  },
}
</script>
```

::

::intro
---
id: hover
class: "mt-12"
---

```ts
<template>
  <div class="flex justify-center">
    <Button @mouseover="play" @mouseleave="stop" label="Trumpet"> 🎺 </Button>
  </div>
</template>

<script>
import { useSound } from '@vueuse/sound'
import trumpetSfx from '../assets/sounds/fanfare.mp3'
import Button from './Button.vue'

export default {
  components: {
    Button
  },
  setup() {
    const { play, stop } = useSound(trumpetSfx)

    return {
      play,
      stop,
    }
  },
}
</script>
```

::

::increase-pitch
---
id: pitch
class: "mt-12"
---

```ts
<template>
  <div class="flex justify-center">
    <Button @click="handleClick" label="Person with lines from mouth">🗣</Button>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useSound } from '@vueuse/sound'
import glugSfx from '../assets/sounds/glug.mp3'
import Button from './Button.vue'

export default {
  components: { Button },
  setup() {
    const playbackRate = ref(0.75)

    const { play } = useSound(glugSfx, {
      playbackRate,
      interrupt: true,
    })

    const handleClick = () => {
      playbackRate.value = playbackRate.value + 0.1

      play()
    }

    return {
      handleClick
    }
  },
}
</script>
```

::

::drum-machine
---
id: drums
class: "mt-12"
---

```ts
<template>
    <div class="flex items-center justify-center gap-4">
      <Button @click="play({ id: 'kick' })" label="Kick">🥁</Button>

      <Button @click="play({ id: 'hihat' })" label="Hi-hat">🎩</Button>

      <Button @click="play({ id: 'snare' })" label="Snare">🍗</Button>

      <Button @click="play({ id: 'cowbell' })" label="Cowbell">🔔</Button>
    </div>
</template>

<script>
import { onMounted, onUnmounted } from 'vue'
import { useSound } from '@vueuse/sound'
import drumSfx from '../assets/sounds/909-drums.mp3'
import Button from './Button.vue'

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
  components: { Button },
  setup() {
    const { play } = useSound(drumSfx, {
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
```

::

::volume
---
id: volume
class: "mt-12"
---

```ts
<template>
  <div class="flex flex-col justify-center">
    <div class="flex justify-center mb-6">
      <Button @click="handleClick" label="Control knobs">🎛️</Button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useSound } from '@vueuse/sound'
import glugSfx from '../assets/sounds/glug.mp3'
import Button from './Button.vue'

export default {
  components: { Button },
  setup() {
    const volume = ref(0.1)

    const { play } = useSound(glugSfx, {
      volume,
      interrupt: true,
    })

    const handleClick = () => {
      volume.value = parseFloat(Math.random().toFixed(2))

      play()
    }


    return {
      handleClick
    }
  },
}
</script>
```

::
