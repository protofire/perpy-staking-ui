import { useAccount, useContractRead, useToken } from 'wagmi'
import { PRY_TOKEN_ADDRESS, vPRY_TOKEN_ADDRESS } from '../consts/known-tokens'
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

  const {
    data: token,
    error,
    isError,
    isLoading,
  } = useToken({
    address: vested ? vPRY_TOKEN_ADDRESS : PRY_TOKEN_ADDRESS,
  })

  const {
    data,
    isError: stakedAmountIsError,
    isLoading: stakedAmountIsLoading,
    error: stakedAmountError,
  } = useContractRead({
    address: STAKING_CONTRACT_ADDRESS,
    abi: pryABI as Abi,
    args: [account.address],
    functionName: vested ? 'dividendVestedWINRStakes' : 'dividendWINRStakes',
    enabled: !!account.address,
    watch: true,
  })

  const [amount] = (data as [bigint]) || []

  const stakedAmountNormalized = useMemo(
    () =>
      token
        ? new BigNumber(amount?.toString() ?? '0').div(10 ** token.decimals)
        : undefined,
    [amount],
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
    error: error || stakedAmountError || pryPriceError,
    isError: isError || stakedAmountIsError || pryPriceIsError,
    isLoading: isLoading || stakedAmountIsLoading || pryPriceIsLoading,
  }
}
