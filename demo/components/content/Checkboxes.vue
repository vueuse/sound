<script>
import { watch } from 'vue'

export default {
  setup() {
    const checked = ref(false)
    const checkedSecond = ref(false)
    const checkedThird = ref(false)

    // eslint-disable-next-line no-console
    watch([checked, checkedSecond, checkedThird], (values) => console.log(values))

    return {
      checked,
      checkedSecond,
      checkedThird,
    }
  },
}
</script>

<template>
  <div class="flex flex-col justify-center">
    <div class="mb-6 flex items-center justify-center gap-4">
      <Checkbox v-model:checked="checked" />
      <Checkbox v-model:checked="checkedSecond" />
      <Checkbox v-model:checked="checkedThird" />
    </div>

    <code-heading> A checkbox component with a twist! 🔊</code-heading>

    <div class="overflow-x-scroll bg-gray-900 p-4">
      <slot />
    </div>
  </div>
</template>
