<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/solid'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import {
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import type { WalletStoreProps } from '~/createWalletStore'

const {
  theme = 'light',
  providers = 'phantom, slope, solflare',
  autoConnect = false,
  withChevron = true,
  text = 'Select Wallet',
} = defineProps<{
  theme?: string
  providers?: string
  autoConnect: boolean
  withChevron?: boolean
  text?: string
}>()

// eslint-disable-next-line no-console
console.log('theme', theme)

const wallets: (PhantomWalletAdapter | SlopeWalletAdapter | SolflareWalletAdapter)[] = []

if (providers.includes('phantom'))
  wallets.push(new PhantomWalletAdapter())

if (providers.includes('slope'))
  wallets.push(new SlopeWalletAdapter())

if (providers.includes('solflare'))
  wallets.push(new SolflareWalletAdapter({ network: WalletAdapterNetwork.Devnet }))

const options: WalletStoreProps = {
  wallets,
  autoConnect,
}

initWallet(options)

const { publicKey, wallet, connect } = useWallet()

const publicKeyBase58 = $computed(() => publicKey.value?.toBase58())

// eslint-disable-next-line no-console
console.log('publicKeyBase58', publicKeyBase58)

const publicKeyTrimmed = computed(() => {
  if (!wallet.value || !publicKeyBase58)
    return null
  return `${publicKeyBase58.slice(0, 4)}..${publicKeyBase58.slice(-4)}`
})

// eslint-disable-next-line no-console
console.log('publicKeyTrimmed', publicKeyTrimmed)

// const { copy, copied: addressCopied, isSupported: canCopy } = useClipboard()
// const copyAddress = () => publicKeyBase58 && copy(publicKeyBase58)
</script>

<template>
  <div class="px-4">
    <Popover v-slot="{ open }" class="relative">
      <PopoverButton
        :class="open ? '' : 'text-opacity-90'"
        class="inline-flex items-center px-3 py-2 text-base font-medium text-white bg-indigo-700 rounded-md group hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        <span>{{ text }}</span>
        <ChevronDownIcon
          v-if="withChevron"
          :class="open ? '' : 'text-opacity-70'"
          class="w-5 h-5 ml-2 text-indigo-300 transition duration-150 ease-in-out group-hover:text-opacity-80"
          aria-hidden="true"
        />
      </PopoverButton>

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-1 opacity-0"
      >
        <PopoverPanel
          class="absolute z-10 w-screen max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:w-48"
        >
          <div
            class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
          >
            <div class="relative grid gap-8 bg-white p-7 lg:grid-cols-1">
              <a
                v-for="item in wallets"
                :key="item.name"
                class="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-50 cursor-pointer"
                @click="connect()"
              >
                <div class="flex justify-between items-center w-full">
                  <h2 class="text-lg font-medium text-gray-900">
                    {{ item.name }}
                  </h2>
                  <div
                    class="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white"
                  >
                    <WalletIcon v-if="item" :wallet="item" />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>
  </div>
</template>
