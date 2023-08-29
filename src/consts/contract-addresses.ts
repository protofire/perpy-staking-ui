import { ContractMeta, ContractsConfig } from '../types'
import { wagmiConfig } from '../wagmi.config'

const CONTRACTS: ContractsConfig<ContractMeta> = {
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
  camelotPair: {
    42161: {
      address: '0x264e2900FdB1F2e28b7A35346aCC650b3d235226',
    },
  },
} as const

export const STAKING_CONTRACT_ADDRESS =
  CONTRACTS.staking[wagmiConfig.publicClient.chain.id].address

export const TOKEN_MANAGER_CONTRACT_ADDRESS =
  CONTRACTS.tokenManager[wagmiConfig.publicClient.chain.id].address

export const CAMELOT_PAIR_CONTRACT_ADDRESS =
  CONTRACTS.camelotPair[42161].address
