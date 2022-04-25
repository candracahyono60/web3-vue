import type { App } from 'vue'
import type { WalletStoreProps } from './createWalletStore'

export * from './components/index'
export * from './createWalletStore'
export * from './errors'
export * from './composables/anchorWallet'
export * from './composables/wallet'

export default {
  install: (app: App, options: WalletStoreProps = {}) => {
    initWallet(options)
    app.config.globalProperties.$wallet = useWallet()
  },
}
