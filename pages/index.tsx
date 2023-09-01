import type { NextPage } from 'next'
import { Layout } from '../src/components/Layout'
import { Box, Link, Typography } from '@mui/material'
import { StakedBadge } from '../src/components/Badges/StakedBadge'
import { RewardsCard } from '../src/components/RewardsCard'
import { VestingCard } from '../src/components/VestinCard/VestingCard'
import { ConversionCard } from '../src/components/ConversionCard/ConversionCard'
import { StakeCard } from '../src/components/StakeCard/StakeCard'
import { TotalEarnedBadge } from '../src/components/Badges/TotalEarnedBadge'
import { Badge } from '../src/components/Badge'
import { UserBanner } from '../src/components/UserBanner'

const Home: NextPage = () => {
  return (
    <Layout>
      <Box>
        <Typography variant="h3" pb="12px">
          Stake
        </Typography>
        <Typography>
          Stake your PRY and vPRY to earn real yield in the form of PRY.{' '}
          <Link>Learn more</Link>
        </Typography>
      </Box>
      <UserBanner
        sx={{
          marginTop: '45px',
          marginBottom: '10px',
        }}
      />
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
    </Layout>
  )
}

export default Home
