import { wagmiConfig } from '../wagmi.config'

const CONTRACTS: ContractsConfig = {
  tokenManager: {
    42161: {
      address: '0xa86a14E9E237bA939fBDA8735d8709FAa82173ef',
    },
    421613: {
      address: '0xa86a14E9E237bA939fBDA8735d8709FAa82173ef',
    },
  },
  staking: {
    42161: {
      address: '0xc881e4bE73945Bc627DD731745916c6FCCe49bE9',
    },
    421613: {
      address: '0xc881e4bE73945Bc627DD731745916c6FCCe49bE9',
    },
  },
} as const

export const STAKING_CONTRACT_ADDRESS =
  CONTRACTS.staking[wagmiConfig.publicClient.chain.id].address

export const TOKEN_MANAGER_CONTRACT_ADDRESS =
  CONTRACTS.tokenManager[wagmiConfig.publicClient.chain.id].address
