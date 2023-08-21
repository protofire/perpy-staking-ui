import { ReactNode } from 'react'
import { Navbar } from './Navbar'
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import { Box, Link, Typography } from '@mui/material'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Perpy Staking</title>
        <link href="/logo.scg" rel="icon" />
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
      {children}
    </div>
  )
}
