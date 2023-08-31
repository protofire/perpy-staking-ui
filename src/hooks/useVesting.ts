import { useAccount, useContractReads } from 'wagmi'
import { STAKING_CONTRACT_ADDRESS } from '../consts/contract-addresses'
import pryABI from '../abi/pryABI.json'
import { Abi } from 'viem'
import { useActiveIndexes } from './useActiveIndexes'

interface VestingStake {
  result: {
    amount: bigint
    startTime: bigint
    vestingDuration: bigint
  }
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
    data: vestingStakes,
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
    enabled: !!account.address,
    watch: true,
  })

  const extras = (vestingStakes as VestingStake[])?.map(
    (stake: VestingStake, i) => {
      const timeLeft =
        Number(stake.result.startTime + stake.result.vestingDuration) -
        Date.now() / 1000

      return {
        input: stake.result.amount,
        output: withdrawableTokens?.[i].result,
        timeLeft: `${Math.floor(timeLeft / 86400)} days ${Math.floor(
          (timeLeft % 86400) / 3600,
        )}:${Math.floor((timeLeft % 3600) / 60)}`,
      }
    },
  )

  return {
    data: {
      activeIndexes: activeIndexes as bigint[] | undefined,
      vestingStakes: vestingStakes as bigint[] | undefined,
      extras,
    },
    error: activeIndexesError || vestingStakeError || withdrawableTokensError,
    isError:
      activeIndexesIsError || vestingStakeIsError || withdrawableTokensIsError,
    isLoading:
      activeIndexesIsLoading ||
      vestingStakeIsLoading ||
      withdrawableTokensIsLoading,
  }
}
