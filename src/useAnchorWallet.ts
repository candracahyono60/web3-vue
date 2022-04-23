import type { PublicKey, Transaction } from '@solana/web3.js'
import type { Ref } from 'vue'
import { computed } from 'vue'
import { useWallet } from './useWallet'

export interface AnchorWallet {
  publicKey: PublicKey
  signTransaction(transaction: Transaction): Promise<Transaction>
  signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>
}

export function useAnchorWallet(): Ref<AnchorWallet | undefined> {
  const walletStore = useWallet()

  return computed<AnchorWallet | undefined>(() => {
    // ensure the wallet store was initialized by a WalletProvider
    if (!walletStore)
      return

    // ensure the wallet is connected and supports the right methods
    const { signTransaction, signAllTransactions, publicKey } = walletStore
    if (!publicKey.value || !signTransaction.value || !signAllTransactions.value)
      return

    return {
      publicKey: publicKey.value,
      signTransaction: signTransaction.value,
      signAllTransactions: signAllTransactions.value,
    }
  })
}
