import { Box, Typography } from '@mui/material'
import { styled } from '@mui/system'

const BorderBox = styled(Box)`
  background: linear-gradient(180deg, #6419b7 0%, rgba(100, 25, 183, 0) 100%);
  min-width: 265px;
  width: 100%;
  height: 102px;
  border-radius: 12px;
`

const StyledBox = styled(Box)`
  background-color: #241532;
  border-radius: 12px;
  background-repeat: no-repeat;
  background-position: -14px -24px;
  padding: 25px 16px 25px 104px;
  position: relative;
  box-sizing: border-box;
  background-clip: padding-box;
  border: solid 1px transparent;
`

interface BadgeProps {
  label: string
  value: string
  subValue?: string
  img: string
}

export const Badge = (props: BadgeProps) => {
  return (
    <BorderBox>
      <StyledBox
        sx={{
          backgroundImage: `url(${props.img})`,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 1,
          }}
        >
          <Typography variant="h6">{props.value}</Typography>
          <Typography component="span" color="secondary">
            {props.subValue}
          </Typography>
        </Box>
        <Typography>{props.label}</Typography>
      </StyledBox>
    </BorderBox>
  )
}
