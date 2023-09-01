import { decodeLogs } from '../../utils'
import tokenManagerAbi from '../../abi/tokenManagerABI.json'
import pryAbi from '../../abi/pryABI.json'

import { Abi, TransactionReceipt } from 'viem'
import {
  STAKING_CONTRACT_ADDRESS,
  TOKEN_MANAGER_CONTRACT_ADDRESS,
} from '../../consts/contract-addresses'

export const decodeConversionLogs = (tx: TransactionReceipt) =>
  decodeLogs({
    logs: tx.logs,
    abi: tokenManagerAbi as Abi,
    eventName: 'Converted',
    contractAddresses: [TOKEN_MANAGER_CONTRACT_ADDRESS],
  })?.[0]

export const decodeDepositVestingLogs = (tx: TransactionReceipt) =>
  decodeLogs({
    logs: tx.logs,
    abi: pryAbi as Abi,
    eventName: 'DepositVesting',
    contractAddresses: [STAKING_CONTRACT_ADDRESS],
  })?.[0]

export const secondsToDays = (seconds: number | bigint) =>
  Number(BigInt(seconds) / BigInt(24 * 60 * 60))
