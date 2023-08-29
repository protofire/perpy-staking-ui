import { ReactNode, useState } from 'react'
import {
  UsePrepareContractWriteConfig,
  useAccount,
  useChainId,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi'
import { chains } from '../../wagmi.config'
import { ConnectButton } from './ConnectButton'
import { Box, Typography } from '@mui/material'
import { parseError } from '../../utils'

export type TransactionButtonProps = Parameters<typeof ConnectButton>[0] & {
  loadingText?: ReactNode
  config: UsePrepareContractWriteConfig
  fullWidth?: boolean
  error?: Error | null
  showErrors?: boolean
  onSuccess?: (hash?: `0x${string}`) => void
}

export const TransactionButton = (props: TransactionButtonProps) => {
  const {
    error,
    showErrors,
    sx,
    children,
    loadingText,
    fullWidth,
    disabled,
    onSuccess,
    ...attrs
  } = props

  const account = useAccount()
  const chainId = useChainId()
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const isChainSupported =
    chains.find((chain) => chain.id === chainId) !== undefined

  const { config, error: prepareError } = usePrepareContractWrite({
    ...props.config,
    enabled:
      props.config?.enabled &&
      !!account.address &&
      isChainSupported &&
      !props.error,
  })

  const {
    isLoading,
    writeAsync,
    error: writeError,
    isSuccess,
    data,
  } = useContractWrite(config)

  const execute = async () => {
    if (props.config?.enabled) {
      const result = await writeAsync?.()
      onSuccess?.(result?.hash)
      setSnackbarOpen(true)
    }
  }

  return (
    <>
      <ConnectButton
        {...attrs}
        disabled={disabled || isLoading}
        variant="default"
        custom
        onClick={execute}
        sx={{
          ...sx,
          width: fullWidth ? '100%' : 'auto',
        }}
      >
        {isLoading ? loadingText : children}
      </ConnectButton>
      {!!showErrors && (!!error || !!prepareError || !!writeError) && (
        <Box
          sx={{
            textAlign: 'center',
          }}
        >
          <Typography color="error">
            {parseError(error ?? prepareError ?? writeError)}
          </Typography>
        </Box>
      )}
    </>
  )
}
