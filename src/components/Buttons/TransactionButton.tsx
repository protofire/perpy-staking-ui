import { ReactNode } from 'react'
import { ConnectButton } from './ConnectButton'
import {
  UsePrepareContractWriteConfig,
  useAccount,
  useChainId,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi'
import { chains } from '../../wagmi.config'
import { Box, Typography } from '@mui/material'
import { parseError } from '../../utils'

export type TransactionButtonProps = Parameters<typeof ConnectButton>[0] & {
  loadingText?: ReactNode
  config: UsePrepareContractWriteConfig
  fullWidth?: boolean
  error?: Error | null
  showErrors?: boolean
}

export const TransactionButton = (props: TransactionButtonProps) => {
  const account = useAccount()
  const chainId = useChainId()

  const isChainSupported =
    chains.find((chain) => chain.id === chainId) !== undefined

  const { config, error: prepareError } = usePrepareContractWrite({
    ...props.config,
    enabled: !!account.address && isChainSupported && !props.error,
  })

  const { isLoading, write, error } = useContractWrite(config)

  console.log({
    error,
    prepareError,
  })

  return (
    <>
      <ConnectButton
        {...props}
        disabled={props.disabled || isLoading}
        variant="default"
        custom
        onClick={write}
        sx={{
          ...props.sx,
          width: props.fullWidth ? '100%' : 'auto',
        }}
      >
        {isLoading ? props.loadingText : props.children}
      </ConnectButton>
      {!!props.showErrors && (!!props.error || !!prepareError || !!error) && (
        <Box
          sx={{
            textAlign: 'center',
          }}
        >
          <Typography color="error">
            {parseError(props.error ?? prepareError ?? error)}
          </Typography>
        </Box>
      )}
    </>
  )
}
