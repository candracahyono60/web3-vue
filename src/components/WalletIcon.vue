<script setup lang="ts">
import type { Wallet } from '~/createWalletStore'

const { wallet } = defineProps<{
  wallet: Wallet
}>()
</script>

<template>
  <i class="swv-button-icon">
    <img v-if="wallet" :src="wallet.icon" :alt="`${wallet.name} icon`">
  </i>
</template>
