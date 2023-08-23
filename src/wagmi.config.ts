import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { arbitrum, arbitrumGoerli } from 'viem/chains'
import { configureChains, createConfig } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { ALCHEMY_API_KEY } from './consts'

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true'
      ? [arbitrumGoerli]
      : []),
  ],
  [alchemyProvider({ apiKey: ALCHEMY_API_KEY })],
)

export const { connectors } = getDefaultWallets({
  appName: 'Perpy Staking',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID ?? '',
  chains,
})

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})
