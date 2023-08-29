import { useContractRead } from 'wagmi'
import camelotPairAbi from '../abi/camelotPairAbi.json'
import { CAMELOT_PAIR_CONTRACT_ADDRESS } from '../consts/contract-addresses'
import { useMemo } from 'react'
import { normalize } from '../utils'
import { PRY_TOKEN, USDC_TOKEN } from '../consts/known-tokens'

export const usePryPrice = () => {
  const { data, error, isError, isLoading } = useContractRead({
    abi: camelotPairAbi,
    address: CAMELOT_PAIR_CONTRACT_ADDRESS,
    functionName: 'getReserves',
    watch: true,
    chainId: 42161,
  })

  const price = useMemo(() => {
    if (!data) return undefined
    const [reserve0, reserve1] = data as [bigint, bigint]
    return normalize(reserve0, PRY_TOKEN.decimals).div(
      normalize(reserve1, USDC_TOKEN.decimals),
    )
  }, [data])

  return {
    data: price,
    error,
    isError,
    isLoading,
  }
}
