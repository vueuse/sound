# 🔊 vue-use-sound

[![npm](https://img.shields.io/npm/v/vue-use-sound.svg)](https://www.npmjs.com/package/vue-use-sound)
[![npm](https://img.shields.io/npm/dm/vue-use-sound.svg)](https://npm-stat.com/charts.html?package=vue-use-sound)
[![Netlify Status](https://api.netlify.com/api/v1/badges/991aafcb-635a-457d-93a4-10f4b895c8c5/deploy-status)](https://app.netlify.com/sites/vue-use-sound/deploys)

This library is a Vue version of the [useSound](https://github.com/joshwcomeau/use-sound) React hook by [joshwcomeau](https://github.com/joshwcomeau).

- 👂 Lets your website communicate using 2 human senses instead of 1
- 🔥 Best used with Vue Composition API
- ✅ Support both Vue 2 and Vue 3 using [vue-demi](https://github.com/antfu/vue-demi) by [antfu](https://github.com/antfu)
- 🚚 Also supports Nuxt, using [nuxt-use-sound](https://github.com/Tahul/nuxt-use-sound)
- ⚡️ <1kb bytes (gzip) in your bundle! ~10kb loaded async.
- ✨ Built with TypeScript
- 🗣 Uses a powerful, battle-tested audio utility: **Howler.js**

If you want to take a quick look at the composable in effect, you might want to visit the [demo](https://vue-use-sound.netlify.app).

## Installation

Package can be added using **yarn**:

```bash
yarn add vue-use-sound
```

Or, use NPM:

```bash
npm install vue-use-sound
```

## Examples

### Play a sound on click

This is the most basic example of how fast you can implement sounds in your app using vue-use-sound.

```js
<template>
  <button @click="play">Play a sound</button>
</template>

<script>
import useSound from 'vue-use-sound'
import buttonSfx from '../assets/button.mp3'

export default {
  setup() {
    const [play] = useSound(buttonSfx)

    return {
      play,
    }
  },
}
</script>
```

### Playing on hover

This example is shown in the [demo](https://vue-use-sound.netlify.app#hover).

### Increase pitch on every click

This example is shown in the [demo](https://vue-use-sound.netlify.app#pitch).

## Usage Notes

### No sounds immediately after load

For the user's sake, browsers don't allow websites to produce sound until the user has interacted with them (eg. by clicking on something). No sound will be produced until the user clicks, taps, or triggers something.

`useSound` takes advantage of this: because we know that sounds won't be needed immediately on-load, we can lazy-load a third-party dependency.

`useSound` will add about 1kb gzip to your bundle, and will asynchronously fetch an additional package after load, which clocks in around 9kb gzip.

If the user does happen to click with something that makes noise before this dependency has been loaded and fetched, it will be a no-op (everything will still work, but no sound effect will play). In my experience this is exceedingly rare.

### Reactive configuration

Consider the following snippet of code:

```js
const playbackRate = ref(0.75)

const [play] = useSound('/path/to/sound', { playbackRate })
```

`playbackRate` doesn't just serve as an _initial_ value for the sound effect. If `playbackRate` changes, the sound will immediately begin playing at a new rate. This is true for all options passed to the `useSound` composable.

## API Documentation

The `useSound` composable takes two arguments:

- A URL to the sound that it wil load
- A config object (`ComposableOptions`)

It produces an array with two values:

- A function you can call to trigger the sound
- An object with additional data and controls (`ExposedData`)

When calling the function to play the sound, you can pass it a set of options (`PlayOptions`).

Let's go through each of these in turn.

### ComposableOptions

When calling `useSound`, you can pass it a variety of options:

| Name         | Value     |
| ------------ | --------- |
| volume       | number    |
| playbackRate | number    |
| interrupt    | boolean   |
| soundEnabled | boolean   |
| sprite       | SpriteMap |
| [delegated]  | —         |

- `volume` is a number from `0` to `1`, where `1` is full volume and `0` is comletely muted.
- `playbackRate` is a number from `0.5` to `4`. It can be used to slow down or speed up the sample. Like a turntable, changes to speed also affect pitch.
- `interrupt` specifies whether or not the sound should be able to "overlap" if the `play` function is called again before the sound has ended.
- `soundEnabled` allows you to pass a value (typically from context or redux or something) to mute all sounds. Note that this can be overridden in the `PlayOptions`, see below
- `sprite` allows you to use a single `useSound` composable for multiple sound effects. See [“Sprites”](https://github.com/Tahul/vue-use-sound#sprites) below.

`[delegated]` refers to the fact that any additional argument you pass in `ComposableOptions` will be forwarded to the `Howl` constructor. See "Escape hatches" below for more information.

### The `play` function

When calling the composable, you get back a play function as the first item in the tuple:

```js
const [play] = useSound('/meow.mp3')
//      ^ What we're talking about
```

You can call this function without any arguments when you want to trigger the sound. You can also call it with a `PlayOptions` object:

| Name              | Value   |
| ----------------- | ------- |
| id                | string  |
| forceSoundEnabled | boolean |
| playbackRate      | number  |

- `id` is used for sprite identification. See [“Sprites”](https://github.com/Tahul/vue-use-sound#sprites) below.
- `forceSoundEnabled` allows you to override the `soundEnabled` boolean passed to `ComposableOptions`. You generally never want to do this. The only exception I've found: triggering a sound on the "Mute" button.
- `playbackRate` is another way you can set a new playback rate, same as in `ComposableOptions`. In general you should prefer to do it through `ComposableOptions`, this is an escape hatch.

### ExposedData

The composable produces a tuple with 2 options, the play function and an `ExposedData` object:

```js
const [play, exposedData] = useSound('/meow.mp3')
//                ^ What we're talking about
```

| Name      | Value                            |
| --------- | -------------------------------- |
| stop      | function ((id?: string) => void) |
| pause     | function ((id?: string) => void) |
| isPlaying | boolean                          |
| duration  | number (or null)                 |
| sound     | Howl (or null)                   |

- `stop` is a function you can use to pre-emptively halt the sound.
- `pause` is like `stop`, except it can be resumed from the same point. Unless you know you'll want to resume, you should use `stop`; `pause` hogs resources, since it expects to be resumed at some point.
- `isPlaying` lets you know whether this sound is currently playing or not. When the sound reaches the end, or it's interrupted with `stop` or `paused`, this value will flip back to `false`. You can use this to show some UI only while the sound is playing.
- `duration` is the length of the sample, in milliseconds. It will be `null` until the sample has been loaded. Note that for sprites, it's the length of the entire file.
- `sound` is an escape hatch. It grants you access to the underlying `Howl` instance. See the [Howler documentation](https://github.com/goldfire/howler.js) to learn more about how to use it. Note that this will be `null` for the first few moments after the component mounts.

---

## Advanced

### Sprites

An audio sprite is a single audio file that holds multiple samples. Instead of loading many individual sounds, you can load a single file and slice it up into multiple sections which can be triggered independently.

> There can be a performance benefit to this, since it's less parallel network requests, but it can also be worth doing this if a single component needs multiple samples. See the [Drum Machine component](https://vue-use-sound.netlify.app#drums) for an example.

For sprites, we'll need to define a `SpriteMap`. It looks like this:

```js
const spriteMap = {
  laser: [0, 300],
  explosion: [1000, 300],
  meow: [2000, 75],
}
```

`SpriteMap` is an object. The keys are the `id`s for individual sounds. The value is a tuple (array of fixed length) with 2 items:

- The starting time of the sample, in milliseconds, counted from the very beginning of the sample
- The length of the sample, in milliseconds.

This visualization might make it clearer:

![Waveform visualization showing how each sprite occupies a chunk of time, and is labeled by its start time and duration](./docs/sprite-explanation.png)

We can pass our SpriteMap as one of our ComposableOptions:

```js
const [play] = useSound('/path/to/sprite.mp3', {
  sprite: {
    laser: [0, 300],
    explosion: [1000, 300],
    meow: [2000, 75],
  },
})
```

To play a specific sprite, we'll pass its `id` when calling the `play` function:

```js
<button
  @click="play({id: 'laser'})"
>
```

### Escape hatches

Howler is a very powerful library, and we've only exposed a tiny slice of what it can do in `useSound`. We expose two escape hatches to give you more control.

First, any unrecognized option you pass to `ComposableOptions` will be delegated to `Howl`. You can see the [full list](https://github.com/goldfire/howler.js#options) of options in the Howler docs. Here's an example of how we can use `onend` to fire a function when our sound stops playing:

```js
const [play] = useSound('/thing.mp3', {
  onend: () => {
    console.info('Sound ended!')
  },
})
```

If you need more control, you should be able to use the `sound` object directly, which is an instance of Howler.

For example: Howler [exposes a `fade` method](https://github.com/goldfire/howler.js#fadefrom-to-duration-id), which lets you fade a sound in or out. You can call this method directly on the `sound` object:

```js
<template>
    <button
      @click={sound.fade(0, 1, 1000)}
    >
      Click to win
    </button>
</template>

<script>
import useSound from 'vue-use-sound'

export default {
    setup() {
        const [play, { sound }] = useSound('/win-theme.mp3')

        return {
            sound
        }
    }
}
</script>
```

## Credits

All the credit behind this idea goes to [Josh W. Comeau](https://github.com/joshwcomeau).

This packages aims to implement the exact same things as the React [useSound](https://github.com/joshwcomeau) hook, but for Vue and its wonderful Composition API.

The documentation of this package has only been updated for Vue Composition API instead of React Hooks.
