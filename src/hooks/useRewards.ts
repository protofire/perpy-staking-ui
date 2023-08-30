import { useAccount, useContractReads } from 'wagmi'
import { STAKING_CONTRACT_ADDRESS } from '../consts/contract-addresses'
import { Abi } from 'viem'
import pryABI from '../abi/pryABI.json'
import { normalize } from '../utils'
import { PRY_TOKEN } from '../consts/known-tokens'
import { usePryPrice } from './usePryPrice'

export const useRewards = () => {
  const account = useAccount()

  const { data, isError, isLoading, error } = useContractReads({
    contracts: [
      {
        address: STAKING_CONTRACT_ADDRESS,
        abi: pryABI as Abi,
        args: account.address ? [account.address] : [],
        functionName: 'totalClaimed',
      },
      {
        address: STAKING_CONTRACT_ADDRESS,
        abi: pryABI as Abi,
        args: account.address ? [account.address] : [],
        functionName: 'pendingDividendRewards',
      },
      {
        address: STAKING_CONTRACT_ADDRESS,
        abi: pryABI as Abi,
        args: account.address ? [account.address] : [],
        functionName: 'pendingVestingRewards',
      },
    ],
    watch: true,
    enabled: !!account.address,
  })

  const {
    data: price,
    isError: priceIsError,
    isLoading: priceIsLoading,
    error: priceError,
  } = usePryPrice()

  const dividendRewards = normalize(
    BigInt((data?.[1].result as bigint) ?? 0),
    PRY_TOKEN.decimals,
  )

  const vestingRewards = normalize(
    BigInt((data?.[2].result as bigint) ?? 0),
    PRY_TOKEN.decimals,
  )

  const totalEarned = normalize(
    BigInt((data?.[0].result as bigint) ?? 0) +
      BigInt((data?.[1].result as bigint) ?? 0) +
      BigInt((data?.[2].result as bigint) ?? 0),
    PRY_TOKEN.decimals,
  )

  console.log({ data })

  const claimable = dividendRewards.plus(vestingRewards)

  const dividendRewardsUsd = dividendRewards.multipliedBy(price ?? 0)

  const vestingRewardsUsd = vestingRewards.multipliedBy(price ?? 0)

  const totalEarnedUsd = totalEarned.multipliedBy(price ?? 0)

  const claimableUsd = claimable.multipliedBy(price ?? 0)

  console.log({
    totalEarned: totalEarned.toString(),
    totalEarnedUsd: totalEarnedUsd.toString(),
    claimable: claimable.toString(),
    claimableUsd: claimableUsd.toString(),
    dividendRewards: dividendRewards.toString(),
    vestingRewards: vestingRewards.toString(),
    dividendRewardsUsd: dividendRewardsUsd.toString(),
    vestingRewardsUsd: vestingRewardsUsd.toString(),
    price: price?.toString(),
    data,
    PRY_TOKEN,
  })

  return {
    data: {
      totalEarned,
      totalEarnedUsd,
      claimable,
      claimableUsd,
      dividendRewards,
      vestingRewards,
      dividendRewardsUsd,
      vestingRewardsUsd,
    },
    error: error || priceError,
    isError: isError || priceIsError,
    isLoading: isLoading || priceIsLoading,
  }
}
