import type { App } from 'vue'
import type { WalletStoreProps } from '~/composables'

export * from './components/index'
export * from './errors'
export * from './composables'

export default {
  install: (app: App, options: WalletStoreProps = {}) => {
    initWallet(options)
    app.config.globalProperties.$wallet = useWallet()
  },
}
