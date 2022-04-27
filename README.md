# Web3 Vue Components

This library will be a collection of somewhat opinionated, yet configurable "web3 components" for Vue 3. In our current state, we integrate with the Solana blockchain. Future blockchain drivers to be coming.

<!-- ⚡️ [View demo](https://web3-vue.netlify.app/) / [Browse demo code](./example) -->

<!-- todo: add screenshot here -->

## Features 🐙

This library is meant to help ease the "onboarding & learning curve" when "jumping" into the web3 territory by providing a library of all sorts of useful composables.

- `<WalletLoginButton />`
  - quickly & simply integrate Solana wallets
-
- Peer-reviewed blockchain integrations

Read more about these features in their respective [docs](https://meema.xyz/docs).

## Get Started 💡

To get started, you simply need to install the `web3-vue` npm package.

```shell
npm install @openweb/web3-vue
pnpm install @openweb/web3-vue
yarn add @openweb/web3-vue
```

Next up, we need to make use of one of the components.

```vue
<script setup>
import { WalletLoginButton } from 'web3-vue'
</script>

<template>
  <WalletLoginButton
    theme="light"
    providers="phantom, slope, solflare"
    :auto-connect="false"
    :with-chevron="true"
    text="Select Wallet"
  />
</template>
```

_Please note, the above syntax assumes you are using Vue's `reactivityTransform: true`. Read more [https://vuejs.org/guide/extras/reactivity-transform.html](here).
_

## Globally Accessible

The following is a list of all the easily, globally accessible methods & variables:

```js
// wallet
initWallet(walletOptions)

// other
isDark // boolean which indicates current state of "dark mode"
toggleDark() // toggles the isDark boolean
```
