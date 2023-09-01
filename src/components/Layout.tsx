import { ReactNode } from 'react'
import { Navbar } from './Navbar'
import styles from '../../styles/Home.module.css'
import Head from 'next/head'
import { Box, Link, Typography } from '@mui/material'
import { Badge } from './Badge'
import { StakeCard } from './StakeCard/StakeCard'
import { StakedBadge } from './Badges/StakedBadge'
import { TotalEarnedBadge } from './Badges/TotalEarnedBadge'
import { VestingCard } from './VestinCard/VestingCard'
import { RewardsCard } from './RewardsCard'
import { ConversionCard } from './ConversionCard/ConversionCard'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'stretch',
        minHeight: '100vh',
        background: `
        radial-gradient(
          at 0% 120%,
          rgb(115, 56, 162) 12%,
          rgba(75, 34, 112, 1) 20%,
          #160632 30%,
          #05001C 55%,
          transparent 60%
        ) fixed,
        linear-gradient(160deg, #010011 30%, #0b021f 65%, #4b2270 100%) fixed`,
      }}
    >
      <Box className={styles.container}>
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
            Stake your PRY and vPRY to earn real yield in the form of PRY.{' '}
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
          <StakedBadge symbol="vPRY" vested />
          <StakedBadge symbol="PRY" />

          <Badge value="0%" label="APY" img="/apy.svg" />
          <TotalEarnedBadge />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'stretch',
            gap: '24px',
            paddingTop: '36px',
          }}
        >
          <StakeCard vested subtitle="Get 2x weight in the staking pool." />

          <StakeCard subtitle="Get 1x weight in the staking pool." />

          <RewardsCard />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'stretch',
            gap: '24px',
            paddingTop: '36px',
          }}
        >
          <VestingCard />
          <ConversionCard />
        </Box>
        {children}
      </Box>
    </Box>
  )
}
