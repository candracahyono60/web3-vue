<script setup lang="ts">
import WalletIcon from './WalletIcon.vue'

const { disabled } = defineProps<{
  disabled: boolean
}>()

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const { wallet, disconnect, disconnecting } = useWallet()

const content = computed(() => {
  if (disconnecting.value)
    return 'Disconnecting ...'
  if (wallet.value)
    return 'Disconnect'
  return 'Disconnect Wallet'
})

const handleClick = (event: MouseEvent) => {
  emit('click', event)
  if (event.defaultPrevented)
    return
  disconnect().catch(() => {})
}

const scope = {
  wallet,
  disconnecting,
  disabled,
  content,
  handleClick,
}
</script>

<template>
  <slot v-bind="scope">
    <button
      class="swv-button swv-button-trigger"
      :disabled="disabled || disconnecting || !wallet"
      @click="handleClick"
    >
      <WalletIcon v-if="wallet" :wallet="wallet" />
      <p v-text="content" />
    </button>
  </slot>
</template>
