import '@rainbow-me/rainbowkit/styles.css'
import { ThemeProvider } from '@mui/material'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiConfig } from 'wagmi'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { theme } from '../src/theme'
import { TransactionProvider } from '../src/contexts/TransactionContext'
import { chains, wagmiConfig } from '../src/wagmi.config'
import { SnackbarProvider } from 'notistack'

declare global {
  interface BigInt {
    toJSON(): string
  }
}

BigInt.prototype.toJSON = function () {
  return this.toString()
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <TransactionProvider>
          <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3}>
              <Component {...pageProps} />
            </SnackbarProvider>
          </ThemeProvider>
        </TransactionProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default MyApp
