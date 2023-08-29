import { ReactNode } from 'react'
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
  onSuccess?: (hash: `0x${string}`) => void
  onFail?: (error: Error) => void
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
    onFail,
    ...attrs
  } = props

  const account = useAccount()
  const chainId = useChainId()

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

  const { isLoading, writeAsync, error: writeError } = useContractWrite(config)

  const execute = async () => {
    if (props.config?.enabled) {
      try {
        const result = await writeAsync?.()
        if (result?.hash) {
          onSuccess?.(result?.hash)
        }
      } catch (e) {
        onFail?.(e as Error)
      }
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
