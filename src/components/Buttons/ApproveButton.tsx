import { UsePrepareContractWriteConfig, useToken } from 'wagmi'
import { TransactionButton } from './TransactionButton'
import { ConnectButton } from './ConnectButton'
import { erc20ABI } from 'wagmi'
import { useAllowance } from '../../hooks/useAllowance'
import BigNumber from 'bignumber.js'
import { ETH_DECIMALS } from '../../consts/consts'
import { useCallback, useMemo } from 'react'
import { useSnackbar } from 'notistack'
import { TransactionLink } from '../TransactionLink'
import { IconButton } from '@mui/material'
import { CloseOutlined } from '@mui/icons-material'

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
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { data: token } = useToken({ address: tokenAddress })

  const {
    allowance = BigInt(0),
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

  const handleSuccess = useCallback(
    (hash: `0x${string}`) => {
      if (approved) {
        onSuccess?.(hash)
      } else {
        enqueueSnackbar(`Approved ${token?.symbol} successfully!`, {
          key: hash,
          variant: 'success',
          autoHideDuration: 20000,
          action: (
            <>
              <TransactionLink hash={hash} />
              <IconButton onClick={() => closeSnackbar?.(hash)} size="small">
                <CloseOutlined />
              </IconButton>
            </>
          ),
        })
      }
    },
    [approved, enqueueSnackbar, onSuccess, token?.symbol, closeSnackbar],
  )

  const handlefail = useCallback(
    (error: Error) => {
      const { details = 'An unknown error occurred' } = error as {
        details?: string
      }

      enqueueSnackbar(details, {
        key: 'approve-error',
        variant: 'error',
        autoHideDuration: 20000,
        action: (
          <IconButton
            onClick={() => closeSnackbar?.('approve-error')}
            size="small"
          >
            <CloseOutlined />
          </IconButton>
        ),
      })
    },
    [enqueueSnackbar, closeSnackbar],
  )

  const txConfig = useMemo(
    () =>
      approved
        ? config
        : {
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
          },
    [
      approved,
      config,
      tokenAddress,
      spenderAddress,
      denormalizedAmount,
      allowanceIsLoading,
      allowanceIsError,
    ],
  )

  return (
    <TransactionButton
      {...props}
      fullWidth={fullWidth}
      loadingText={approved ? loadingText : 'Approving...'}
      config={txConfig}
      disabled={allowanceIsLoading || allowanceIsError || props.disabled}
      error={error ?? allowanceError}
      onSuccess={handleSuccess}
      onFail={handlefail}
    >
      {approved ? label : allowanceIsLoading ? 'Loading...' : 'Approve'}
    </TransactionButton>
  )
}
