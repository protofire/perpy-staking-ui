import { useContractRead } from 'wagmi'
import { PRY_TOKEN } from '../consts/known-tokens'
import { STAKING_CONTRACT_ADDRESS } from '../consts/contract-addresses'
import { Abi } from 'viem'
import { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import pryABI from '../abi/pryABI.json'
import { usePryPrice } from './usePryPrice'

export const useTotalEarned = () => {
  const { data: amount } = useContractRead({
    address: STAKING_CONTRACT_ADDRESS,
    abi: pryABI as Abi,
    functionName: 'totalEarned',
    watch: true,
  })

  const normalizedAmount = useMemo(
    () =>
      new BigNumber(amount?.toString() ?? '0').div(10 ** PRY_TOKEN.decimals),
    [amount],
  )

  const {
    data: pryPrice,
    error: pryPriceError,
    isError: pryPriceIsError,
    isLoading: pryPriceIsLoading,
  } = usePryPrice()

  return {
    data: normalizedAmount
      ? {
          amount: normalizedAmount,
          amountUsd: normalizedAmount?.multipliedBy(pryPrice ?? 0),
        }
      : undefined,
    error: pryPriceError,
    isError: pryPriceIsError,
    isLoading: pryPriceIsLoading,
  }
}
