import { useAccount, useContractRead } from 'wagmi'
import { PRY_TOKEN, VPRY_TOKEN } from '../consts/known-tokens'
import { STAKING_CONTRACT_ADDRESS } from '../consts/contract-addresses'
import { Abi } from 'viem'
import { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import pryABI from '../abi/pryABI.json'
import { usePryPrice } from './usePryPrice'

interface UseStakedProps {
  vested?: boolean
}

export const useStaked = ({ vested = false }: UseStakedProps) => {
  const account = useAccount()

  const token = useMemo(() => (vested ? VPRY_TOKEN : PRY_TOKEN), [vested])

  const {
    data,
    isError: stakedAmountIsError,
    isLoading: stakedAmountIsLoading,
    error: stakedAmountError,
  } = useContractRead({
    address: STAKING_CONTRACT_ADDRESS,
    abi: pryABI as Abi,
    args: [account.address],
    functionName: vested ? 'dividendVestedPRYStakes' : 'dividendPRYStakes',
    enabled: !!account.address,
    watch: true,
  })

  const [amount] = (data as [bigint]) || []

  const stakedAmountNormalized = useMemo(
    () =>
      token
        ? new BigNumber(amount?.toString() ?? '0').div(10 ** token.decimals)
        : undefined,
    [amount, token],
  )

  const {
    data: pryPrice,
    error: pryPriceError,
    isError: pryPriceIsError,
    isLoading: pryPriceIsLoading,
  } = usePryPrice()

  return {
    data: stakedAmountNormalized
      ? {
          amount: stakedAmountNormalized,
          amountUsd: stakedAmountNormalized?.multipliedBy(pryPrice ?? 0),
        }
      : undefined,
    error: stakedAmountError || pryPriceError,
    isError: stakedAmountIsError || pryPriceIsError,
    isLoading: stakedAmountIsLoading || pryPriceIsLoading,
  }
}
