import { ReactNode } from 'react'
import {
  Abi,
  DecodeEventLogReturnType,
  Log,
  decodeEventLog,
  encodeEventTopics,
} from 'viem'
import BigNumber from 'bignumber.js'
import { wagmiConfig } from './wagmi.config'

export const parseError = <T>(error: T | null) => {
  if (error !== null && typeof error === 'object' && 'shortMessage' in error) {
    return error.shortMessage as ReactNode
  }
}

export const getExplorerLink = (txHash: string) => {
  wagmiConfig.publicClient.chain.blockExplorers?.default.url
  return `${wagmiConfig.publicClient.chain.blockExplorers?.default.url}/tx/${txHash}`
}

export const normalize = (value: bigint, decimals: number) => {
  return new BigNumber(value.toString()).dividedBy(
    new BigNumber(10).pow(decimals),
  )
}

export interface DecodedLog {
  readonly log: Log
  readonly data: DecodeEventLogReturnType
}

export function decodeLogs(args: {
  abi: Abi
  readonly eventName: string
  readonly logs: readonly Log[]
  readonly contractAddresses?: readonly string[]
}): readonly DecodedLog[] {
  const { abi, eventName, logs, contractAddresses } = args
  const event = abi.find(
    (item) => (item as { name?: string }).name === eventName,
  )

  if (event === undefined) {
    throw new Error(`Event ${eventName} not found in passed ABI`)
  }

  const signature = encodeEventTopics({
    abi,
    eventName,
  })

  const matchingLogs = logs.filter((l) => {
    if (contractAddresses !== undefined) {
      if (
        undefined ===
        contractAddresses.find(
          (address) => address.toLowerCase() === l.address.toLowerCase(),
        )
      ) {
        return false
      }
    }

    return l.topics[0] === signature[0]
  })

  return matchingLogs.map((l) => ({
    log: l,
    data: decodeEventLog({
      abi,
      eventName,
      topics: l.topics,
      data: l.data,
    }),
  }))
}
