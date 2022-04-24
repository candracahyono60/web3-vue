<script setup lang="ts">
import { useWallet } from '~/useWallet'

const {
  featured = 3,
  logo,
  dark = false,
} = defineProps<{
  featured?: Number
  logo?: String
  dark?: Boolean
}>()

const { publicKey, wallet, disconnect } = useWallet()

const dropdownPanel = ref<HTMLElement>()
let dropdownOpened = $ref(false)
const openDropdown = () => (dropdownOpened = true)
const closeDropdown = () => (dropdownOpened = false)

onClickOutside(dropdownPanel, closeDropdown)

const publicKeyBase58 = $computed(() => publicKey.value?.toBase58())
const publicKeyTrimmed = computed(() => {
  if (!wallet.value || !publicKeyBase58)
    return null
  return `${publicKeyBase58.slice(0, 4)}..${publicKeyBase58.slice(-4)}`
})

const { copy, copied: addressCopied, isSupported: canCopy } = useClipboard()
const copyAddress = () => publicKeyBase58 && copy(publicKeyBase58)

// Define the bindings given to scoped slots.
const scope = {
  featured,
  logo,
  dark,
  wallet,
  publicKey,
  publicKeyTrimmed,
  publicKeyBase58,
  canCopy,
  addressCopied,
  dropdownPanel,
  dropdownOpened,
  openDropdown,
  closeDropdown,
  copyAddress,
  disconnect,
}
</script>

<template>
  <WalletModalProvider :featured="featured" :logo="logo" :dark="dark">
    <template #default="modalScope">
      <slot v-bind="{ ...modalScope, ...scope }">
        <button v-if="!wallet" class="text-red-600 swv-button swv-button-trigger" @click="modalScope.openModal">
          Select Wallet
        </button>
        <WalletConnectButton v-else-if="!publicKeyBase58" />
        <div v-else class="swv-dropdown">
          <slot name="dropdown-button" v-bind="{ ...modalScope, ...scope }">
            <button
              class="swv-button swv-button-trigger"
              :style="{ pointerEvents: dropdownOpened ? 'none' : 'auto' }"
              :aria-expanded="dropdownOpened"
              :title="publicKeyBase58"
              @click="openDropdown"
            >
              <WalletIcon :wallet="wallet" />
              <p v-text="publicKeyTrimmed" />
            </button>
          </slot>
          <slot name="dropdown" v-bind="{ ...modalScope, ...scope }">
            <ul
              ref="dropdownPanel"
              aria-label="dropdown-list"
              class="swv-dropdown-list"
              :class="{ 'swv-dropdown-list-active': dropdownOpened }"
              role="menu"
            >
              <slot name="dropdown-list" v-bind="{ ...modalScope, ...scope }">
                <li v-if="canCopy" class="swv-dropdown-list-item" role="menuitem" @click="copyAddress">
                  {{ addressCopied ? "Copied" : "Copy address" }}
                </li>
                <li class="swv-dropdown-list-item" role="menuitem" @click="modalScope.openModal(); closeDropdown();">
                  Change wallet
                </li>
                <li class="swv-dropdown-list-item" role="menuitem" @click="disconnect">
                  Disconnect
                </li>
              </slot>
            </ul>
          </slot>
        </div>
      </slot>
    </template>

    <!-- Enable modal overrides. -->
    <template #overlay="modalScope">
      <slot name="modal-overlay" v-bind="{ ...modalScope, ...scope }" />
    </template>
    <template #modal="modalScope">
      <slot name="modal" v-bind="{ ...modalScope, ...scope }" />
    </template>
  </WalletModalProvider>
</template>
