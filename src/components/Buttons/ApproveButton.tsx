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
  onSuccess?: (hash: `0x${string}`) => void
  skipApproval?: boolean
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
  skipApproval,
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

  const approved =
    skipApproval || (allowance !== undefined && allowance >= denormalizedAmount)

  const handleSuccess = useCallback(
    (hash: `0x${string}`) => {
      if (approved) {
        onSuccess?.(hash)
      } else {
        enqueueSnackbar(`Approved ${token?.symbol} successfully!`, {
          key: hash,
          variant: 'success',
          autoHideDuration: 20000,
          action: hash ? (
            <>
              <TransactionLink hash={hash} />
              <IconButton
                onClick={() => closeSnackbar?.(hash)}
                size="small"
                sx={{
                  color: 'white',
                }}
              >
                <CloseOutlined />
              </IconButton>
            </>
          ) : null,
        })
      }
    },
    [approved, enqueueSnackbar, onSuccess, token?.symbol, closeSnackbar],
  )

  const handleFail = useCallback(
    (e: Error) => {
      const { details = 'An error occurred!' } = e as {
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
            sx={{
              color: 'white',
            }}
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
      tokenAddress,
      spenderAddress,
      denormalizedAmount,
      allowanceIsLoading,
      allowanceIsError,
      approved,
      config,
    ],
  )

  return (
    <TransactionButton
      {...props}
      fullWidth={fullWidth}
      loadingText={approved ? loadingText : 'Approving...'}
      config={txConfig}
      onSuccess={handleSuccess}
      onFail={handleFail}
      disabled={allowanceIsLoading || allowanceIsError || props.disabled}
      error={error ?? allowanceError}
    >
      {allowanceIsLoading ? 'Loading...' : approved ? label : 'Approve'}
    </TransactionButton>
  )
}
