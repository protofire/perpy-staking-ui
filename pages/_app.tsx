import '@rainbow-me/rainbowkit/styles.css'
import { ThemeProvider, styled } from '@mui/material'
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

import { MaterialDesignContent } from 'notistack'

const StyledMaterialDesignContent = styled(MaterialDesignContent)`
  &.notistack-MuiContent-success {
    background-color: ${({ theme }) => theme.palette.success.main};
    color: ${({ theme }) => theme.palette.success.contrastText};

    & svg {
      color: #2e7d32;
    }
  }

  &.notistack-MuiContent-error {
    background-color: ${({ theme }) => theme.palette.error.main};
    color: ${({ theme }) => theme.palette.error.contrastText};

    & svg {
      color: #d32f2f;
    }
  }
`

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <TransactionProvider>
          <ThemeProvider theme={theme}>
            <SnackbarProvider
              maxSnack={3}
              Components={{
                success: StyledMaterialDesignContent,
                error: StyledMaterialDesignContent,
              }}
            >
              <Component {...pageProps} />
            </SnackbarProvider>
          </ThemeProvider>
        </TransactionProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default MyApp
