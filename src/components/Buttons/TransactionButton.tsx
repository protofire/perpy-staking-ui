import { ReactNode, useCallback } from 'react'
import {
  useAccount,
  useChainId,
  useContractWrite,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
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

  const execute = useCallback(async () => {
    if (props.config?.enabled !== false) {
      let hash: `0x${string}` | undefined = undefined

      try {
        const result = await writeAsync?.()

        hash = result?.hash
      } catch (error) {
        onFail?.(error as Error)
      }

      if (hash !== undefined) {
        onSuccess?.(hash)
      }
    }
  }, [props.config?.enabled, writeAsync, onFail, onSuccess])

  return (
    <>
      <ConnectButton
        variant="default"
        {...attrs}
        disabled={disabled || isLoading}
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
