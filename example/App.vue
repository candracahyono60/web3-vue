<script>
import { computed, ref, watchEffect } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { Connection, Keypair, PublicKey, SystemProgram, clusterApiUrl } from '@solana/web3.js'
import { AnchorProvider, Program } from '@project-serum/anchor'
import { useAnchorWallet } from '../src'
import WalletLogin from '../src/components/WalletLogin.vue'
import idl from './idl.json'

const programID = new PublicKey(idl.metadata.address)
const preflightCommitment = 'processed'

export default {
  components: {
    WalletLogin,
  },

  setup() {
    const dark = ref(false)
    const wallet = useAnchorWallet()
    const connection = new Connection(clusterApiUrl('devnet'), preflightCommitment)
    const provider = computed(() => new AnchorProvider(connection, wallet.value, { preflightCommitment }))
    const program = computed(() => new Program(idl, programID, provider.value))

    const counterPublicKey = useLocalStorage('counterPublicKey', null)
    const counter = ref(0)
    watchEffect(async() => {
      if (!counterPublicKey.value)
        return
      const account = await program.value.account.baseAccount.fetch(counterPublicKey.value)
      counter.value = account.count.toNumber()
    })

    const createCounter = async() => {
      if (!wallet.value)
        // eslint-disable-next-line no-console
        return console.log('Connect your wallet first.')

      const newCounter = Keypair.generate()
      await program.value.rpc.create({
        accounts: {
          baseAccount: newCounter.publicKey,
          user: wallet.value.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [newCounter],
      })
      counterPublicKey.value = newCounter.publicKey
    }

    const incrementCounter = async() => {
      if (!wallet.value)
        // eslint-disable-next-line no-console
        return console.log('Connect your wallet first.')
      else if (!counterPublicKey.value)
        // eslint-disable-next-line no-console
        return console.log('Create a new counter first.')

      await program.value.rpc.increment({
        accounts: {
          baseAccount: counterPublicKey.value,
        },
      })
      counter.value += 1
    }

    return {
      dark,
      counterPublicKey,
      counter,
      createCounter,
      incrementCounter,
    }
  },
}
</script>

<template>
  <div class="h-screen w-screen flex" :class="dark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-700'">
    <div class="absolute top-0 right-0 p-8 flex items-center space-x-8">
      <WalletLogin
        :theme="dark ? 'dark' : 'light'"
        provider="phantom, slope, solflare"
        auto-connect="true"
      />

      <button class="rounded-full p-3" :class="dark ? 'bg-white/10 hover:bg-white/20 text-gray-200' : 'bg-black/10 hover:bg-black/20 text-gray-600'" @click="dark = !dark">
        <svg v-if="dark" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </button>
    </div>

    <!-- Centered. -->
    <div class="m-auto w-full max-w-md p-8">
      <div class="shadow-xl rounded-xl" :class="dark ? 'bg-gray-700' : 'bg-white'">
        <div class="p-8 text-center">
          <p class="uppercase text-xs tracking-widest text-gray-400 font-semibold">
            Counter
          </p>
          <p
            class="font-bold text-5xl mt-2"
            :class="dark ? 'text-white' : 'text-gray-900'"
            v-text="counterPublicKey ? counter : 'Not Set'"
          />
        </div>

        <div class="flex">
          <button
            class="flex-1 py-4 px-2 rounded-bl-xl"
            :class="dark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'"
            @click="createCounter"
          >
            New Counter
          </button>
          <button
            class="flex-1 py-4 px-2 rounded-br-xl"
            :class="dark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'"
            @click="incrementCounter"
          >
            Increment Counter
          </button>
        </div>
      </div>

      <div class="text-sm mt-8">
        <p class="text-xs font-semibold text-gray-400">
          Wallet address:
        </p>
        <p>{{ $wallet.publicKey.value?.toBase58() ?? 'Not connected' }}</p>
        <p class="text-xs font-semibold text-gray-400 mt-4">
          Counter address:
        </p>
        <p>{{ counterPublicKey ?? 'Not created' }}</p>
      </div>
    </div>
  </div>
</template>
