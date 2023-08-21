import styled from '@emotion/styled'
import { Button } from '@mui/material'
import { ConnectButton as RKConnectButton } from '@rainbow-me/rainbowkit'

export const ConnectButton = () => {
  return (
    <RKConnectButton.Custom>
      {() => (
        <div>
          <Button variant="default">CONNECT WALLET</Button>
        </div>
      )}
    </RKConnectButton.Custom>
  )
}
