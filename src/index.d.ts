import type { App } from 'vue'
import type { WalletStoreProps } from './createWalletStore'
export * from './components/index'
export * from './createWalletStore'
export * from './errors'
export * from './useAnchorWallet'
export * from './useWallet'
declare const _default: {
  install: (app: App, options?: WalletStoreProps) => void
}
export default _default
