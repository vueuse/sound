<template>
  <div class="flex flex-col justify-center">
    <div class="flex items-center justify-center gap-4 mb-6">
      <Checkbox v-model:checked="checked" />
      <Checkbox v-model:checked="checkedSecond" />
      <Checkbox v-model:checked="checkedThird" />
    </div>

    <code-heading> A checkbox component with a twist! 🔊</code-heading>
    <code-block :codeText="CodeText" />
  </div>
</template>

<script>
import { ref } from 'vue'
import Checkbox from './Checkbox.vue'
import CodeHeading from './CodeHeading.vue'
import CodeBlock from './CodeBlock.vue'
import CodeText from '../examples/checkBox.js'

export default {
  components: {
    Checkbox,
    CodeHeading,
    CodeBlock,
  },
  setup() {
    const checked = ref(false)
    const checkedSecond = ref(false)
    const checkedThird = ref(false)

    return {
      checked,
      checkedSecond,
      checkedThird,
      CodeText,
    }
  },
}
</script>
