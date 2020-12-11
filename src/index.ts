import { defineComponent, PropType, h } from 'vue'

/**
 * Returns true.
 */
export function mylib() {
  return true
}

export const Component = defineComponent({
  props: {
    custom: Boolean as PropType<boolean>,
    data: {
      required: true,
      type: Object as PropType<{ title: string; summary: string }>,
    },
  },

  setup(props) {
    return () =>
      h(
        'p',
        `Custom: ${props.custom}. ${props.data.title} - ${props.data.summary}.`
      )
  },
})
