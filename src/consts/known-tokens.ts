import { ContractsConfig, TokenMeta } from '../types'
import { wagmiConfig } from '../wagmi.config'

const TOKENS: ContractsConfig<TokenMeta> = {
  PRY: {
    42161: {
      address: '0x3fAeDb824A226Af1646dA0ec4dD7fAA3ba736382',
      symbol: 'PRY',
      decimals: 18,
    },
    421613: {
      address: '0x3fAeDb824A226Af1646dA0ec4dD7fAA3ba736382',
      symbol: 'PRY',
      decimals: 18,
    },
  },
  vPRY: {
    42161: {
      address: '0x9640b27bBc8FBc85dd03b2B10827423b2853D5fD',
      symbol: 'vPRY',
      decimals: 18,
    },
    421613: {
      address: '0x9640b27bBc8FBc85dd03b2B10827423b2853D5fD',
      symbol: 'vPRY',
      decimals: 18,
    },
  },
  USDC: {
    42161: {
      address: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
      symbol: 'USDC',
      decimals: 6,
    },
  },
} as const

export const PRY_TOKEN = TOKENS.PRY[wagmiConfig.publicClient.chain.id]
export const VPRY_TOKEN = TOKENS.vPRY[wagmiConfig.publicClient.chain.id]
export const USDC_TOKEN = TOKENS.USDC[42161]
