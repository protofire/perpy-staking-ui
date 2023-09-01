import { Abi, TransactionReceipt } from 'viem'
import pryAbi from '../../abi/pryABI.json'
import { decodeLogs, secondsToDays } from '../../utils'
import { STAKING_CONTRACT_ADDRESS } from '../../consts/contract-addresses'

export const decodeCancelLogs = (tx: TransactionReceipt) =>
  decodeLogs({
    logs: tx.logs,
    abi: pryAbi as Abi,
    eventName: 'Cancel',
    contractAddresses: [STAKING_CONTRACT_ADDRESS],
  })?.[0]

export const decodeRedeemLogs = (tx: TransactionReceipt) =>
  decodeLogs({
    logs: tx.logs,
    abi: pryAbi as Abi,
    eventName: 'Withdraw',
    contractAddresses: [STAKING_CONTRACT_ADDRESS],
  })?.[0]

export const getTimeLeft = (startTime: bigint, vestingDuration: bigint) => {
  const now = BigInt(Math.floor(Date.now() / 1000))
  const endTime = startTime + vestingDuration
  const timeLeft = endTime - now
  return timeLeft
}

export const formatTimeLeft = (timeLeft: bigint) => {
  const days = secondsToDays(timeLeft)
  const hours = (timeLeft / BigInt(60 * 60)) % BigInt(24)
  const minutes = (timeLeft / BigInt(60)) % BigInt(60)
  return `${days}d ${hours}h ${minutes}m `
}
