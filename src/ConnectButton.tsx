import styled from '@emotion/styled'
import { Button } from '@mui/material'
import { ConnectButton as RKConnectButton } from '@rainbow-me/rainbowkit'

export const ConnectButton = () => {
  return (
    <RKConnectButton.Custom>
      {({ openAccountModal, openConnectModal, mounted, account, chain }) => {
        const connected = mounted && account && chain

        if (connected)
          return (
            <div>
              <Button variant="default" onClick={openAccountModal}>
                {account.displayName}
              </Button>
            </div>
          )

        return (
          <div>
            <Button variant="default" onClick={openConnectModal}>
              CONNECT WALLET
            </Button>
          </div>
        )
      }}
    </RKConnectButton.Custom>
  )
}
