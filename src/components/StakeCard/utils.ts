import { Abi, TransactionReceipt } from 'viem'
import { decodeLogs } from '../../utils'
import pryABI from '../../abi/pryABI.json'
import { STAKING_CONTRACT_ADDRESS } from '../../consts/contract-addresses'

export const decodeStakeLogs = (tx: TransactionReceipt) =>
  decodeLogs({
    logs: tx.logs,
    abi: pryABI as Abi,
    eventName: 'DepositDividend',
    contractAddresses: [STAKING_CONTRACT_ADDRESS],
  })?.[0]

export const decodeUnstakeLogs = (tx: TransactionReceipt) =>
  decodeLogs({
    logs: tx.logs,
    abi: pryABI as Abi,
    eventName: 'Unstake',
    contractAddresses: [STAKING_CONTRACT_ADDRESS],
  })?.[0]
