import { useAccount, useContractReads } from 'wagmi'
import { STAKING_CONTRACT_ADDRESS } from '../consts/contract-addresses'
import pryABI from '../abi/pryABI.json'
import { Abi } from 'viem'
import { useActiveIndexes } from './useActiveIndexes'
import { normalize, secondsToDays } from '../utils'
import { PRY_TOKEN } from '../consts/known-tokens'

interface VestingStake {
  amount: bigint
  startTime: bigint
  vestingDuration: bigint
  cancelled: boolean
  withdrawn: boolean
}
interface VestingStakeResult {
  result?: unknown
  status: 'success' | 'failure'
}

export const useVesting = () => {
  const account = useAccount()

  const {
    data: activeIndexes,
    error: activeIndexesError,
    isError: activeIndexesIsError,
    isLoading: activeIndexesIsLoading,
  } = useActiveIndexes()

  const {
    data: vestingStakesData,
    isError: vestingStakeIsError,
    isLoading: vestingStakeIsLoading,
    error: vestingStakeError,
  } = useContractReads({
    contracts:
      activeIndexes?.map((index) => ({
        address: STAKING_CONTRACT_ADDRESS,
        abi: pryABI as Abi,
        args: account.address ? [account.address, index] : [],
        functionName: 'getVestingStake',
      })) ?? [],
    enabled: !!account.address,
    watch: true,
  })

  const {
    data: withdrawableTokens,
    isError: withdrawableTokensIsError,
    isLoading: withdrawableTokensIsLoading,
    error: withdrawableTokensError,
  } = useContractReads({
    contracts:
      activeIndexes?.map((index) => ({
        address: STAKING_CONTRACT_ADDRESS,
        abi: pryABI as Abi,
        args: account.address ? [account.address, index] : [],
        functionName: 'withdrawableTokens',
      })) ?? [],
    enabled: !!account.address && !!activeIndexes?.length,
    watch: true,
  })

  const {
    data: pendingVestingByIndex,
    isError: pendingVestingByIndexIsError,
    isLoading: pendingVestingByIndexIsLoading,
    error: pendingVestingByIndexError,
  } = useContractReads({
    contracts:
      activeIndexes?.map((index) => ({
        address: STAKING_CONTRACT_ADDRESS,
        abi: pryABI as Abi,
        args: account.address ? [account.address, index] : [],
        functionName: 'pendingVestingByIndex',
      })) ?? [],
    enabled: !!account.address && !!activeIndexes?.length,
    watch: true,
  })

  const vestingStakes = vestingStakesData
    ?.filter((stake: VestingStakeResult) => stake.status === 'success')
    .map((stake: VestingStakeResult, i) => {
      const stakeData = stake.result as VestingStake

      const input = normalize(stakeData.amount, PRY_TOKEN.decimals)

      const output = withdrawableTokens?.[i].result
        ? normalize(
            withdrawableTokens?.[i].result as bigint,
            PRY_TOKEN.decimals,
          )
        : undefined

      const rewards = pendingVestingByIndex?.[i].result
        ? normalize(
            pendingVestingByIndex?.[i].result as bigint,
            PRY_TOKEN.decimals,
          )
        : undefined

      const timeLeft = Math.max(
        Math.floor(
          Number(stakeData.startTime + stakeData.vestingDuration) -
            Date.now() / 1000,
        ),
        0,
      )

      const days = secondsToDays(timeLeft)

      const remainingTime = timeLeft - days * 24 * 60 * 60

      const hours = Math.floor(remainingTime / 60 / 60)

      const minutes = Math.floor((remainingTime - hours * 60 * 60) / 60)

      return {
        index: activeIndexes?.[i] ?? BigInt(0),
        input,
        output,
        timeLeft: `${days} days ${hours}:${`00${minutes}`.slice(-2)}`,
        rewards,
        isRedeemable: timeLeft === 0,
        isCancelled: stakeData.cancelled,
        isWithdrawn: stakeData.withdrawn,
        startTime: stakeData.startTime,
        vestingDuration: stakeData.vestingDuration,
      }
    })
    .sort((a, b) => {
      if (
        (a.isWithdrawn === true && b.isWithdrawn === false) ||
        (a.isCancelled === false && b.isCancelled === true)
      ) {
        return -1
      }
      return 1
    })

  return {
    data: vestingStakes,
    error:
      activeIndexesError ||
      vestingStakeError ||
      withdrawableTokensError ||
      pendingVestingByIndexError,
    isError:
      activeIndexesIsError ||
      vestingStakeIsError ||
      withdrawableTokensIsError ||
      pendingVestingByIndexIsError,
    isLoading:
      activeIndexesIsLoading ||
      vestingStakeIsLoading ||
      withdrawableTokensIsLoading ||
      pendingVestingByIndexIsLoading,
  }
}
