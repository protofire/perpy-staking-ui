import { Box, Typography } from '@mui/material'
import Image from 'next/image'

export const Logo = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
      }}
    >
      <Image src="/logo.svg" alt="logo" width="32" height="38" />
      <Typography variant="h2" color="mai">
        Perpy
      </Typography>
    </Box>
  )
}
