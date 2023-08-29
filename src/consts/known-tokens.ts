import { wagmiConfig } from '../wagmi.config'

const TOKENS: ContractsConfig = {
  PRY: {
    42161: {
      address: '0x3fAeDb824A226Af1646dA0ec4dD7fAA3ba736382',
    },
    421613: {
      address: '0x3fAeDb824A226Af1646dA0ec4dD7fAA3ba736382',
    },
  },
  vPRY: {
    42161: {
      address: '0x9640b27bBc8FBc85dd03b2B10827423b2853D5fD',
    },
    421613: {
      address: '0x9640b27bBc8FBc85dd03b2B10827423b2853D5fD',
    },
  },
} as const

export const PRY_TOKEN_ADDRESS =
  TOKENS.PRY[wagmiConfig.publicClient.chain.id].address

export const vPRY_TOKEN_ADDRESS =
  TOKENS.vPRY[wagmiConfig.publicClient.chain.id].address
