import { resolve } from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

/** @type {import('vite').UserConfig} */
const config = {
  root: './example',

  resolve: {
    dedupe: ['vue'],
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },

  plugins: [
    Vue({
      reactivityTransform: true, // https://vuejs.org/guide/extras/reactivity-transform.html
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ['vue', '@vueuse/core', {
        '~/composables/wallet': ['initWallet', 'useWallet'],
        '~/composables/anchorWallet': ['useAnchorWallet'],
      }],
      dts: '../src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
      },
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      dirs: ['../src/components'],
      extensions: ['vue'],
      dts: '../src/components.d.ts',
    }),
  ],

  define: {
    'process.env': {},
  },

  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'crypto-wallets-vue',
    },

    rollupOptions: {
      external: ['vue', '@solana/web3.js', '@solana/wallet-adapter-base'],
      output: {
        // exports: 'named',
        globals: {
          'vue': 'Vue',
          '@solana/web3.js': 'SolanaWeb3',
          '@solana/wallet-adapter-base': 'SolanaWalletAdapterBase',
        },
      },
    },

    sourcemap: true,
    minify: false,
  },

  test: {
    include: ['tests/**/*.test.ts'],
    // environment: 'jsdom',
    deps: {
      inline: ['@vue', '@vueuse', 'vue-demi'],
    },
  },
}

// https://vitejs.dev/config
export default defineConfig(({ command }) => {
  if (command === 'serve')
    return config

  // command === 'build'
  return config
})
