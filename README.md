# Web3 Vue Components

This library will be a collection of somewhat opinionated, yet configurable components for Vue 3. In our current state, we integrate with Solana wallets. Future drivers to be coming. Readme in wip

<!-- ⚡️ [View demo](https://web3-vue.netlify.app/) / [Browse demo code](./example) -->

<!-- todo: add screenshot here -->

## Installation

To get started, you'll need to install the `web3-vue` npm package as well as the wallets adapters provided by Solana.

```shell
npm install @opencrypto/web3-vue
```

## Setup

Next, you can install Solana Wallets Vue as a plugin like so.

```js
import { createApp } from 'vue'
import SolanaWallets from 'web3-vue'

import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'

import {
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import App from './App.vue'

const walletOptions = {
  wallets: [
    new PhantomWalletAdapter(),
    new SlopeWalletAdapter(),
    new SolflareWalletAdapter({ network: WalletAdapterNetwork.Devnet }),
  ],
  autoConnect: true,
}

createApp(App)
  .use(SolanaWallets, walletOptions)
  .mount('#app')
```

This will initialize the wallet store and create a new `$wallet` global property that you can access inside any component.

Note that you can also initialize the wallet store manually using the `initWallet` method like so.

```js
import { initWallet } from 'web3-vue'
initWallet(walletOptions)
```

Finally, import and render the `WalletMultiButton` component to allow users to select a wallet et connect to it.

```vue
<script setup>
import { WalletMultiButton } from 'web3-vue'
</script>

<template>
  <wallet-multi-button />
</template>
```
