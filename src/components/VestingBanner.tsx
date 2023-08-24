import { Box, BoxProps, Typography } from '@mui/material'
import { ReactNode } from 'react'
import { tiltWrap } from '../theme'

type VestingBannerProps = BoxProps & {
  value: ReactNode
  title: ReactNode
}

export const VestingBanner = (props: VestingBannerProps) => {
  const { value, title, ...boxProps } = props

  return (
    <Box
      {...boxProps}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: '16px 12px',
        borderRadius: '4px',
        boxShadow:
          '0px 0px 15px 0px #E0B9FF, 0px 0px 35px 0px rgba(255, 185, 255, 0.20), 0px 0px 55px 0px rgba(104, 31, 185, 0.50), 0px 0px 75px 0px rgba(104, 31, 185, 0.60), 0px 0px 90px 0px rgba(104, 31, 185, 0.80)',
        background:
          'linear-gradient(333deg, #6419B7 0%, rgba(100, 25, 183, 0.00) 100%)',
        ...boxProps.sx,
      }}
    >
      <Typography
        fontSize={16}
        letterSpacing="0.25px"
        lineHeight="20px"
        fontWeight={400}
      >
        {title}
      </Typography>
      <Typography
        fontSize={24}
        fontFamily={tiltWrap.style.fontFamily}
        lineHeight="133.4%"
      >
        {value}
      </Typography>
    </Box>
  )
}
