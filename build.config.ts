import consola from 'consola'
import fsExtra from 'fs-extra'
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  rollup: {
    emitCJS: true,
  },

  declaration: true,

  entries: ['src/index', 'src/nuxt'],

  externals: [
    '@nuxt/kit',
    '@nuxt/schema',
    'pathe',
    'ufo',
    'globby',
    'chalk',
    'merge2',
    'untyped',
    'nuxt',
    'vue',
    'defu',
    'vue-demi',
    '@vue/compiler-core',
    '@vue/shared',
    '@babel/parser',
  ],

  hooks: {
    'build:before': () => {
      fsExtra.removeSync('demo/.nuxt/sounds')
    },
    'build:done': () => {
      fsExtra.copySync('src/nuxt/runtime', 'dist/runtime')
      consola.info('Nuxt runtime copied to `dist/`!')
    },
  },
})
