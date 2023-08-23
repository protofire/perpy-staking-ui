import { createContext, useContext, useState } from 'react'
import { Transaction } from 'viem'

export const TransactionContext = createContext<{
  transactions: Transaction[]
  addTransaction: (transaction: Transaction) => void
}>({
  transactions: [],
  addTransaction: (transaction: Transaction) => {},
})

export const TransactionProvider = ({ children }: any) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const addTransaction = (transaction: Transaction) => {
    setTransactions((transactions) => [...transactions, transaction])
  }

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

export const useTransactionContext = () => {
  const context = useContext(TransactionContext)

  if (context === undefined) {
    throw new Error(
      'useTransactionContext must be used within a TransactionProvider',
    )
  }
  return context
}
