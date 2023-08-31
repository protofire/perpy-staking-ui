import { useAccount, useContractRead } from 'wagmi'
import { STAKING_CONTRACT_ADDRESS } from '../consts/contract-addresses'
import { Abi } from 'viem'
import pryABI from '../abi/pryABI.json'

export const useActiveIndexes = () => {
  const account = useAccount()
  const {
    data: activeIndexes,
    error: activeIndexesError,
    isLoading: activeIndexesIsLoading,
    isError: activeIndexesIsError,
  } = useContractRead({
    address: STAKING_CONTRACT_ADDRESS,
    abi: pryABI as Abi,
    functionName: 'getActiveIndexes',
    args: [account.address],
    enabled: !!account.address,
    watch: true,
  })

  return {
    data: activeIndexes as bigint[] | undefined,
    error: activeIndexesError,
    isError: activeIndexesIsError,
    isLoading: activeIndexesIsLoading,
  }
}
