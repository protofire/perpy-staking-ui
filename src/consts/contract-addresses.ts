import { ContractMeta, ContractsConfig } from '../types'
import { wagmiConfig } from '../wagmi.config'

const CONTRACTS: ContractsConfig<ContractMeta> = {
  tokenManager: {
    42161: {
      address: '0x0', // @TODO: replace once deployed
    },
    421613: {
      address: '0x0B6c49a0778CA5F28CAEAB2f8Fae476C24EC0c62',
    },
  },
  staking: {
    42161: {
      address: '0x0', // @TODO: replace once deployed
    },
    421613: {
      address: '0xffea7e8CF441277d580CD60307A6b3cFB9719C57',
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
