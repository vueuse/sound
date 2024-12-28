import type { HowlOptions } from 'howler'
import { existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import { addImports, addPlugin, createResolver, defineNuxtModule, resolveModule, useLogger } from '@nuxt/kit'
import chalk from 'chalk'
import { globby } from 'globby'
import { join } from 'pathe'
import { withLeadingSlash } from 'ufo'
import { generateTypes, resolveSchema } from 'untyped'

export interface ModuleOptions {
  /**
   * A directory to scan for sounds.
   *
   * @default 'public/sounds'
   */
  scan: string | boolean;

  /**
   * An object of sounds to register.
   *
   * The key will be used as an identifier for the sound to use as shortcut for `useSound(id)`.
   *
   * If you enable directory scanning mode, this array will be merged with what gets scanned.
   */
  sounds: Record<string, HowlOptions>;
}

const SUPPORTED_EXTENSIONS = ['mp3', 'mpeg', 'opus', 'ogg', 'oga', 'wav', 'aac', 'caf', 'm4a', 'mp4', 'weba', 'webm', 'dolby', 'flac']

const DEFAULTS: ModuleOptions = {
  scan: 'public/sounds/',
  sounds: {},
}

const CONFIG_KEY = 'sound'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@vueuse/sound',
    configKey: CONFIG_KEY,
    compatibility: {
      nuxt: '>=3.0.0',
      bridge: true,
    },
    defaults: DEFAULTS,
  },
  defaults: DEFAULTS,
  async setup(options, nuxt) {
    const logger = useLogger('🎺')
    const { resolve } = createResolver(import.meta.url)
    const resolveRuntimeModule = (path: string) => resolveModule(path, { paths: resolve('./runtime') })

    // Init Runtime Config
    nuxt.options.runtimeConfig.public = nuxt.options.runtimeConfig.public || {}
    nuxt.options.runtimeConfig.public.sound = nuxt.options.runtimeConfig.public.sound || {
      scanPath: typeof options.scan === 'string' ? options.scan : 'public/sounds/',
    }
    const runtimeConfig = nuxt.options.runtimeConfig.public.sound

    const soundsBuildDir = join(nuxt.options.buildDir, 'sounds')

    const generateSoundType = async (schema: Record<string, HowlOptions>) => {
      return generateTypes(await resolveSchema(schema), {
        addExport: true,
        allowExtraKeys: true,
        interfaceName: 'AvailableSounds',
      })
    }

    const writeSchema = async (schema: Record<string, HowlOptions>) => {
      const schemaPath = join(nuxt.options.buildDir, 'sounds/index.d.ts')
      const pathType = `export type SoundsPaths = ${Object.keys(schema)
        .map(path => `'${path}'`)
        .join(' | \n')}`
      const configType = await generateSoundType(schema)
      await writeFile(schemaPath, `${pathType}\n\n${configType}`)
    }

    const writeOptions = async (schema: Record<string, HowlOptions>) => {
      const optionsPath = join(nuxt.options.buildDir, 'sounds/index.ts')
      await writeFile(optionsPath, `export default ${JSON.stringify(schema, null, 2)}`)
    }

    const writeTargets = async (schema: Record<string, HowlOptions>) => {
      // Create templates directory
      if (!existsSync(soundsBuildDir)) await mkdir(soundsBuildDir, { recursive: true })

      await writeOptions(schema)
      await writeSchema(schema)
    }

    let soundsConfig = options.sounds

    if (options.scan) {
      runtimeConfig.scanPath = runtimeConfig.scanPath || 'public/sounds/'
      if (typeof options.scan === 'string') {
        runtimeConfig.scanPath = options.scan
      }

      const getScannedSounds = async () => {
        let scannedSounds: Record<string, HowlOptions> = {}

        try {
          const paths = (await globby(join(nuxt.options.rootDir, runtimeConfig.scanPath, `**/*.{${SUPPORTED_EXTENSIONS.join(',')}}`))).map(path =>
            withLeadingSlash(path.replace(join(nuxt.options.rootDir), '').replace('public/', '')),
          )

          scannedSounds = paths.reduce((acc, path) => {
            acc[path] = {
              src: path,
              volume: 1,
            }

            return acc
          }, scannedSounds)
        }
        catch (e) {
          // eslint-disable-next-line no-console
          console.log(e)
        }

        return scannedSounds
      }

      soundsConfig = { ...(await getScannedSounds()), ...soundsConfig }

      nuxt.hook('builder:watch', async (type, path) => {
        if (path.includes(runtimeConfig.scanPath)) {
          if (type === 'add') {
            logger.success(`You added the sound: ${chalk.greenBright(path.replace(runtimeConfig.scanPath, ''))}`)
          }

          if (type === 'unlink') {
            logger.success(`You removed the sound: ${chalk.redBright(path.replace(runtimeConfig.scanPath, ''))}`)
          }

          const sounds = await getScannedSounds()
          await writeTargets({ ...sounds, ...options.sounds })
        }
      })
    }

    await writeTargets(soundsConfig)

    nuxt.hook('build:before', async () => await writeTargets(soundsConfig))
    nuxt.hook('prepare:types', async () => await writeTargets(soundsConfig))

    // Transpile necessary packages at build time
    if (!nuxt.options.build.transpile) nuxt.options.build.transpile = []
    const transpileList = ['defu', '@vueuse/sound', 'howler']
    transpileList.forEach((pkgName) => {
      if (!nuxt.options.build.transpile.includes(pkgName)) nuxt.options.build.transpile.push(pkgName)
    })

    // Inject typings
    nuxt.hook('prepare:types', (opts) => {
      opts.references.push({
        path: join(nuxt.options.buildDir, '/sounds/sounds.d.ts'),
      })
      opts.tsConfig.compilerOptions = opts.tsConfig.compilerOptions || {}
      opts.tsConfig.compilerOptions.paths = opts.tsConfig.compilerOptions.paths || {}
      opts.tsConfig.compilerOptions.paths['#sounds'] = ['./.nuxt/sounds/index']
      opts.tsConfig.compilerOptions.paths['#sounds/types'] = ['./.nuxt/sounds/index.d.ts']
    })

    // Add $sounds plugin
    addPlugin({
      src: resolveRuntimeModule('./plugins/sounds.ts'),
    })

    // Add auto imports
    addImports([
      {
        name: 'useSound',
        as: 'useSound',
        from: resolveRuntimeModule('./composables/use-sound.ts'),
      },
    ])
  },
})

interface ModulePublicRuntimeConfig {}

interface ModulePrivateRuntimeConfig {}

declare module '@nuxt/schema' {
  interface ConfigSchema {
    publicRuntimeConfig?: {
      motion: ModulePublicRuntimeConfig;
    };
    privateRuntimeConfig?: {
      motion: ModulePrivateRuntimeConfig;
    };
  }
}
