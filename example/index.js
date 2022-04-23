import { createApp } from 'vue'
import {
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import SolanaWallets from '../src/index'
import App from './App.vue'
import '../src/styles/index.css'

const walletOptions = {
  wallets: [
    new PhantomWalletAdapter(),
    new SlopeWalletAdapter(),
    new SolflareWalletAdapter({ network: 'devnet' }),
    new TorusWalletAdapter(),
    new SolletWalletAdapter({ network: 'devnet' }),
    new SolletExtensionWalletAdapter({ network: 'devnet' }),
  ],
  autoConnect: true,
}

createApp(App)
  .use(SolanaWallets, walletOptions)
  .mount('#app')
