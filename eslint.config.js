const antfu = require('@antfu/eslint-config').default

module.exports = antfu({
  ignores: ['dist/**/*', '.output/**/*', '.nuxt/**/*', '*.css', '*.md'],
  stylistic: {
    semi: true,
    comma: 'all',
  },
  rules: {
    'antfu/if-newline': 'off',
    'new-cap': 'off',
    'vue/static-class-names-order': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/require-component-is': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/no-v-text-v-html-on-component': 'off',
    'unused-imports/no-unused-vars': 'off',
    'style/semi': ['error', 'never'],
    'antfu/no-import-dist': 'off',
  },
})
