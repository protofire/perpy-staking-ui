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

export type TransactionButtonProps = Parameters<typeof ConnectButton>[0] & {
  loadingText?: ReactNode
  config: UsePrepareContractWriteConfig
  fullWidth?: boolean
}

export const TransactionButton = (props: TransactionButtonProps) => {
  const account = useAccount()
  const chainId = useChainId()

  const isChainSupported =
    chains.find((chain) => chain.id === chainId) !== undefined

  const { config } = usePrepareContractWrite({
    ...props.config,
    enabled: !!account.address && isChainSupported,
  })

  const { data, error, isLoading, write } = useContractWrite(config)

  return (
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
  )
}
