import { UsePrepareContractWriteConfig, useToken } from 'wagmi'
import { TransactionButton } from './TransactionButton'
import { ConnectButton } from './ConnectButton'
import { erc20ABI } from 'wagmi'
import { useAllowance } from '../../hooks/useAllowance'
import BigNumber from 'bignumber.js'
import { ETH_DECIMALS } from '../../consts/consts'
import { use, useEffect, useMemo, useState } from 'react'
import { TransactionReceipt } from 'viem'
import { useSnackbar } from 'notistack'
import { TransactionLink } from '../TransactionLink'

type ApproveButtonProps = Parameters<typeof ConnectButton>[0] & {
  tokenAddress?: `0x${string}`
  spenderAddress?: `0x${string}`
  amount: number | string
  fullWidth?: boolean
  config: UsePrepareContractWriteConfig
  loadingText?: string
  label: string
  error?: Error | null
  onSuccess?: (hash?: `0x${string}`) => void
}

export const ApproveButton = ({
  tokenAddress,
  spenderAddress,
  amount,
  fullWidth,
  config,
  loadingText,
  label,
  error,
  onSuccess,
  ...props
}: ApproveButtonProps) => {
  const { enqueueSnackbar } = useSnackbar()
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

  const approved = allowance !== undefined && allowance >= denormalizedAmount

  const handleApprovalSuccess = (hash?: `0x${string}`) => {
    enqueueSnackbar(`Approved ${token?.symbol} successfully!`, {
      variant: 'success',
      autoHideDuration: 20000,
      action: hash ? <TransactionLink hash={hash} /> : null,
    })
  }

  const handleSuccess = (hash?: `0x${string}`) => {
    onSuccess?.(hash)
    enqueueSnackbar(`Approved ${token?.symbol} successfully!`, {
      variant: 'success',
      autoHideDuration: 20000,
      action: hash ? <TransactionLink hash={hash} /> : null,
    })
  }

  const aprrovalConfig = useMemo(
    () => ({
      address: tokenAddress,
      abi: erc20ABI,
      args: [spenderAddress, denormalizedAmount],
      functionName: 'approve',
      enabled:
        !!tokenAddress &&
        !!spenderAddress &&
        !!denormalizedAmount &&
        !allowanceIsLoading &&
        !allowanceIsError &&
        !approved,
    }),
    [
      tokenAddress,
      spenderAddress,
      denormalizedAmount,
      allowanceIsLoading,
      allowanceIsError,
      approved,
    ],
  )

  if (approved) {
    return (
      <TransactionButton
        {...props}
        fullWidth={fullWidth}
        loadingText={loadingText}
        config={config}
        onSuccess={handleSuccess}
      >
        {label}
      </TransactionButton>
    )
  }

  return (
    <TransactionButton
      {...props}
      fullWidth={fullWidth}
      loadingText="Approving..."
      config={aprrovalConfig}
      disabled={allowanceIsLoading}
      error={error ?? allowanceError}
      onSuccess={handleApprovalSuccess}
    >
      {allowanceIsLoading ? 'Loading...' : 'Approve'}
    </TransactionButton>
  )
}
