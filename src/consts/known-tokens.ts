import { ContractsConfig, TokenMeta } from '../types'
import { wagmiConfig } from '../wagmi.config'

const TOKENS: ContractsConfig<TokenMeta> = {
  PRY: {
    42161: {
      address: '0x1824a51c106efc27d35a74efb56d9bf54ddb22d4',
      symbol: 'PRY',
      decimals: 18,
    },
    421613: {
      address: '0xE4F69E0Ce7AbE7d56695b6661D1da57eCD0CB7c3',
      symbol: 'PRY',
      decimals: 18,
    },
  },
  vPRY: {
    42161: {
      address: '0x0', // @TODO: replace once deployed
      symbol: 'vPRY',
      decimals: 18,
    },
    421613: {
      address: '0x85E9C15c77Cf42c84A00156De97280945B270cd0',
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
