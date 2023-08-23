import { ReactNode } from 'react'
import { Navbar } from './Navbar'
import styles from '../../styles/Home.module.css'
import Head from 'next/head'
import { Box, Link, Slider, Typography } from '@mui/material'
import { Badge } from './Badge'
import { Card } from './Card'
import { ApproveButton } from './Buttons/ApproveButton'
import { AmountSlider } from './AmountSlider'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Perpy Staking</title>
        <link href="/logo.svg" rel="icon" />
      </Head>
      <Navbar />
      <Box>
        <Typography variant="h3" pb="12px">
          Stake
        </Typography>
        <Typography>
          Stake your PRY and xPRY to earn real yield in the form of PRY.{' '}
          <Link>Learn more</Link>
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'stretch',
          gap: '24px',
          paddingTop: '36px',
        }}
      >
        <Badge
          value="55.032"
          subValue="$42.209"
          label="Staked xPRY"
          img="/vault.svg"
        />
        <Badge
          value="620.144"
          subValue="$930.781"
          label="Staked PRY"
          img="/vault.svg"
        />
        <Badge value="45.72%" label="APR" img="/apr.svg" />
        <Badge value="$764.280" label="Total Earned" img="/earnings.svg" />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'stretch',
          gap: '24px',
          paddingTop: '36px',
        }}
      >
        <Card title="Stake xPRY" subTitle="Get 2x weight in the staking pool.">
          <AmountSlider
            valueLabelDisplay="auto"
            marks={Array.from(Array(9).keys()).map((_, value) => ({
              value: value * 10 + 10,
            }))}
            unit="xPRY"
          />
          <ApproveButton
            tokenAddress="0xfd064A18f3BF249cf1f87FC203E90D8f650f2d63"
            spenderAddress="0x87Fe8eBa753076a943BD2A5f6c3556188064797E"
            amount="100"
            fullWidth
            sx={{
              marginBottom: '32px',
            }}
          />
          <AmountSlider
            valueLabelDisplay="auto"
            marks={Array.from(Array(9).keys()).map((_, value) => ({
              value: value * 10 + 10,
            }))}
            label="Staked"
            unit="xPRY"
          />
          <ApproveButton
            tokenAddress="0xfd064A18f3BF249cf1f87FC203E90D8f650f2d63"
            spenderAddress="0x87Fe8eBa753076a943BD2A5f6c3556188064797E"
            amount="100"
            fullWidth
          />
        </Card>

        <Card title="Stake PRY" subTitle="Get 1x weight in the staking pool.">
          <AmountSlider
            valueLabelDisplay="auto"
            marks={Array.from(Array(9).keys()).map((_, value) => ({
              value: value * 10 + 10,
            }))}
            unit="PRY"
          />
          <ApproveButton
            tokenAddress="0xfd064A18f3BF249cf1f87FC203E90D8f650f2d63"
            spenderAddress="0x87Fe8eBa753076a943BD2A5f6c3556188064797E"
            amount="100"
            fullWidth
            sx={{
              marginBottom: '32px',
            }}
          />
          <AmountSlider
            valueLabelDisplay="auto"
            marks={Array.from(Array(9).keys()).map((_, value) => ({
              value: value * 10 + 10,
            }))}
            label="Staked"
            unit="PRY"
          />
          <ApproveButton
            tokenAddress="0xfd064A18f3BF249cf1f87FC203E90D8f650f2d63"
            spenderAddress="0x87Fe8eBa753076a943BD2A5f6c3556188064797E"
            amount="100"
            fullWidth
          />
        </Card>
        <Card title="Rewards" img="/coins.svg" highlight />
      </Box>
      {children}
    </div>
  )
}
