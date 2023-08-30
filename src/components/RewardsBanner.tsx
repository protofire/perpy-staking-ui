import { Box, BoxProps, Tooltip, Typography } from '@mui/material'
import { ReactNode } from 'react'
import { tiltWrap } from '../theme'

type RewardsBannerProps = BoxProps & {
  title: ReactNode
  value: ReactNode
  subValue?: ReactNode
  loading?: boolean
  tooltip?: ReactNode
  subTooltip?: ReactNode
}

export const RewardsBanner = (props: RewardsBannerProps) => {
  const { title, value, subValue, loading, tooltip, subTooltip, ...boxProps } =
    props

  return (
    <Box
      {...boxProps}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: '16px 12px',
        borderRadius: '4px',
        background:
          'linear-gradient(333deg, #6419B7 0%, rgba(100, 25, 183, 0.00) 100%)',
        ...boxProps.sx,
      }}
    >
      <Typography
        component="label"
        fontWeight={600}
        lineHeight="150%"
        textTransform="uppercase"
        letterSpacing="0.15px"
      >
        {title}
      </Typography>
      <Tooltip title={tooltip}>
        <Typography
          fontSize={34}
          textAlign="right"
          fontFamily={tiltWrap.style.fontFamily}
          lineHeight="123.5%"
        >
          {loading ? '...' : value}
        </Typography>
      </Tooltip>
      <Tooltip title={subTooltip}>
        <Typography
          fontSize={16}
          textAlign="right"
          letterSpacing="0.15px"
          lineHeight="150%"
          fontWeight={400}
        >
          {loading ? '...' : subValue}
        </Typography>
      </Tooltip>
    </Box>
  )
}
