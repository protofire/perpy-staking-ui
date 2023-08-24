import { useToken } from 'wagmi'
import { TransactionButton } from './TransactionButton'
import { ConnectButton } from './ConnectButton'
import { erc20ABI } from 'wagmi'
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
  const { data: token } = useToken({ address: tokenAddress })

  const {
    allowance,
    isError: allowanceIsError,
    isLoading: allowanceIsLoading,
    error: allowanceError,
  } = useAllowance(tokenAddress, spenderAddress)

  const denormalizedAmount = BigInt(
    new BigNumber(amount)
      .times(new BigNumber(10).pow(token?.decimals ?? ETH_DECIMALS))
      .toFixed(0),
  )

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
      error={allowanceError}
    >
      {allowanceIsLoading ? 'Loading...' : 'Approve'}
    </TransactionButton>
  )
}
