import { ReactNode } from 'react'
import { Navbar } from './Navbar'
import styles from '../../styles/Home.module.css'
import Head from 'next/head'
import { Box } from '@mui/material'

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
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
        {children}
      </Box>
    </Box>
  )
}
