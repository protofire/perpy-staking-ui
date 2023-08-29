import { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { ConnectButton as RKConnectButton } from '@rainbow-me/rainbowkit'
import { HoverButton } from './HoverButton'

type ConnectButtonProps = Parameters<typeof Button>[0] & {
  custom?: boolean
}

export const ConnectButton = ({ custom, ...props }: ConnectButtonProps) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <RKConnectButton.Custom>
      {({
        openAccountModal,
        openConnectModal,
        openChainModal,
        mounted,
        account,
        chain,
      }) => {
        const connected = mounted && !!account && !!chain

        if (chain?.unsupported && isClient) {
          return (
            <Button {...props} variant="error" onClick={openChainModal}>
              WRONG NETWORK
            </Button>
          )
        }

        if (connected && isClient) {
          if (custom) {
            return <Button {...props} />
          }

          return (
            <HoverButton
              {...props}
              variant="default"
              onClick={openAccountModal}
              hoverProps={{ children: 'Disconnect', variant: 'error' }}
            >
              {account?.displayName}
            </HoverButton>
          )
        }

        return (
          <Button
            {...props}
            variant="default"
            onClick={openConnectModal}
            disabled={isClient ? props.disabled : true}
          >
            CONNECT WALLET
          </Button>
        )
      }}
    </RKConnectButton.Custom>
  )
}
