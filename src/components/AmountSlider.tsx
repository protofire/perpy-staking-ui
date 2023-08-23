import { Box, Slider, Typography } from '@mui/material'

type AmountSliderProps = Parameters<typeof Slider>[0] & {
  unit?: string
  label?: string
}

export const AmountSlider = ({ ...props }: AmountSliderProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '32px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '26px',
        }}
      >
        <Typography fontSize={16} color="#E6E0E9" lineHeight="24px">
          {props.label}
        </Typography>
        <Typography>
          <Typography
            variant="body2"
            fontSize={16}
            marginRight="6px"
            lineHeight="20px"
          >
            {Number(props.value ?? 0)}
          </Typography>
          <Typography
            variant="body1"
            fontSize={14}
            color="#CAC4D0"
            lineHeight="20px"
          >
            {props.unit}
          </Typography>
        </Typography>
      </Box>
      <Box
        sx={{
          paddingX: '8px',
        }}
      >
        <Slider {...props} />
      </Box>
    </Box>
  )
}
