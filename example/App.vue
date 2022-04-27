<script setup lang="ts">
import { WalletLoginButton } from '../src/components/index'
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
