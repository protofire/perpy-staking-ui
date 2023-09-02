import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import { arbitrum, arbitrumGoerli } from 'viem/chains'
import { configureChains, createConfig } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { ALCHEMY_API_KEY } from './consts/consts'
import { injectedWallet } from '@rainbow-me/rainbowkit/wallets'

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true'
      ? [arbitrumGoerli]
      : []),
  ],
  [alchemyProvider({ apiKey: ALCHEMY_API_KEY })],
)

export const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [injectedWallet({ chains })],
  },
])

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})
