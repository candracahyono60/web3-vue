<script setup lang="ts">
import { useWallet } from '~/useWallet'

const { disabled } = defineProps<{
  disabled: boolean
}>()

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const { wallet, connect, connecting, connected } = useWallet()

// let disabled = computed(() => disabled || !wallet || connecting || connected)

const content = $computed(() => {
  if (connecting)
    return 'Connecting ...'
  if (connected)
    return 'Connected'
  if (wallet)
    return 'Connect'
  return 'Connect Wallet'
})

const onClick = (event: MouseEvent) => {
  emit('click', event)

  if (event.defaultPrevented)
    return

  connect().catch(() => {})
}

const scope = {
  wallet,
  disabled,
  connecting,
  connected,
  content,
  onClick,
}
</script>

<template>
  <slot v-bind="scope">
    <button
      class="swv-button swv-button-trigger"
      :disabled="true"
      @click="onClick"
    >
      <WalletIcon v-if="wallet" :wallet="wallet" />
      <p v-text="content" />
    </button>
  </slot>
</template>
