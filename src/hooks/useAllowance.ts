import { formatUnits, zeroAddress } from 'viem'
import {
  erc20ABI,
  useAccount,
  useChainId,
  useContractRead,
  useToken,
} from 'wagmi'
import { chains } from '../wagmi.config'
import { ETH_DECIMALS } from '../consts'

export const useAllowance = (
  tokenAddress: `0x${string}`,
  spenderAddress: `0x${string}`,
) => {
  const account = useAccount()
  const chainId = useChainId()

  const { data: tokenData } = useToken({
    address: tokenAddress,
  })

  const isChainSupported =
    chains.find((chain) => chain.id === chainId) !== undefined

  const {
    data: allowance,
    isError,
    isLoading,
    error,
  } = useContractRead({
    address: tokenAddress,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [account.address ?? zeroAddress, spenderAddress],
    enabled: !!account.address && isChainSupported,
    chainId,
  })

  return {
    allowance,
    formattedAllowance: allowance
      ? formatUnits(BigInt(0), tokenData?.decimals ?? ETH_DECIMALS)
      : undefined,
    isError,
    isLoading,
    error,
  }
}
