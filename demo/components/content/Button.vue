<script>
export default {
  props: {
    label: {
      type: String,
      default: 'Button',
    },
  },
  setup(props) {
    return {
      props,
    }
  },
}
</script>

<template>
  <button class="rounded-full bg-indigo-400 p-4 text-6xl focus:outline-none focus:ring" v-bind="props">
    <span role="img" :aria-label="props.label">
      <slot />
    </span>
  </button>
</template>
