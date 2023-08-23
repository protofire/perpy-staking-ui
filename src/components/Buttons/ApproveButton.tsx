import {
  useAccount,
  useChainId,
  useContractWrite,
  usePrepareContractWrite,
  useToken,
} from 'wagmi'
import { TransactionButton } from './TransactionButton'
import { ConnectButton } from './ConnectButton'
import { erc20ABI } from 'wagmi'
import { chains } from '../../wagmi.config'
import { useAllowance } from '../../hooks/useAllowance'
import BigNumber from 'bignumber.js'
import { ETH_DECIMALS } from '../../consts'

type ApproveButtonProps = Parameters<typeof ConnectButton>[0] & {
  tokenAddress: `0x${string}`
  spenderAddress: `0x${string}`
  amount: string
  fullWidth?: boolean
}

export const ApproveButton = ({
  tokenAddress,
  spenderAddress,
  amount,
  fullWidth,
  ...props
}: ApproveButtonProps) => {
  const account = useAccount()
  const chainId = useChainId()

  const isChainSupported =
    chains.find((chain) => chain.id === chainId) !== undefined

  const {
    data: token,
    error: tokenError,
    isLoading: tokenIsLoading,
  } = useToken({ address: tokenAddress })

  const {
    allowance,
    isError: allowanceIsError,
    isLoading: allowanceIsLoading,
  } = useAllowance(tokenAddress, spenderAddress)

  const denormalizedAmount = BigInt(
    new BigNumber(amount)
      .times(new BigNumber(10).pow(token?.decimals ?? ETH_DECIMALS))
      .toFixed(0),
  )

  const { config } = usePrepareContractWrite({
    address: tokenAddress,
    abi: erc20ABI,
    args: [spenderAddress, denormalizedAmount],
    functionName: 'approve',
    enabled:
      !!account.address &&
      isChainSupported &&
      !allowanceIsLoading &&
      !allowanceIsError &&
      allowance !== undefined &&
      allowance <= denormalizedAmount,
  })

  const { data, error, isLoading, writeAsync } = useContractWrite(config)

  return (
    <TransactionButton
      {...props}
      fullWidth={fullWidth}
      loadingText="Approving..."
      config={{
        address: tokenAddress,
        abi: erc20ABI,
        args: [spenderAddress, denormalizedAmount],
        functionName: 'approve',
        enabled:
          !allowanceIsLoading &&
          !allowanceIsError &&
          allowance !== undefined &&
          allowance <= denormalizedAmount,
      }}
      disabled={allowanceIsLoading}
    >
      {allowanceIsLoading ? 'Loading...' : 'Approve'}
    </TransactionButton>
  )
}
