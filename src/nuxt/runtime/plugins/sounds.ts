import sounds from '#build/sounds'
import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      sounds,
    },
  }
})
