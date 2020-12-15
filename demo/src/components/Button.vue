<template>
  <button
    class="p-4 text-6xl bg-indigo-400 rounded-full focus:outline-none focus:ring"
    v-bind="props"
  >
    <span role="img" :aria-label="label">
      <slot />
    </span>
  </button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: 'Button',
    },
  },
  setup({ label, ...props }) {
    return {
      label,
      props,
    }
  },
}
</script>
