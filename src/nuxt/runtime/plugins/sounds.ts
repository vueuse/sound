import { defineNuxtPlugin } from '#imports'
import sounds from '#build/sounds'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      sounds,
    },
  }
})
