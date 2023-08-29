import { Box, Typography } from '@mui/material'
import { styled } from '@mui/system'
import Image from 'next/image'

type BoxProps = Parameters<typeof Box>[0]

type HighlightProps = BoxProps & {
  highlight?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BorderBox = styled(({ highlight, ...props }: HighlightProps) => (
  <Box {...props} />
))<HighlightProps>`
  background: linear-gradient(
    151.06deg,
    #ac57e9 0%,
    #6f2aadb2 36.83%,
    #512f704d 100%
  );

  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3),
    0px 1px 3px 1px rgba(0, 0, 0, 0.15);

  min-width: 360px;

  width: 100%;
  border-radius: 12px;
  position: relative;

  ${(props) =>
    !!props.highlight &&
    `box-shadow: 0px 0px 20px 0px #e0b9ff,
    0px 0px 45px 0px rgba(255, 185, 255, 0.2),
    0px 0px 75px 0px rgba(104, 31, 185, 0.5),
    0px 0px 85px 0px rgba(104, 31, 185, 0.6),
    0px 0px 100px 0px rgba(104, 31, 185, 0.8);
    `}
`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledBox = styled(({ highlight, ...props }: HighlightProps) => (
  <Box {...props} />
))<HighlightProps>`
  border-radius: 12px;
  position: relative;
  box-sizing: border-box;
  border: solid 1px transparent;
  min-height: 480px;
  background: ${(props) =>
        !!props.highlight &&
        `linear-gradient(
    134deg,
    rgba(0, 0, 0, 0) 60.9%,
    rgba(255, 255, 255, 0.02) 61%,
    rgba(255, 255, 255, 0) 80%
  ) no-repeat, linear-gradient(
    180deg,
    rgba(133, 37, 219, 0.6) 0%,
    rgba(42, 31, 54, 0) 100%
  ),`}
      radial-gradient(
        50% 50% at 340px calc(100% + 100px),
        #6419b7 0%,
        rgba(100, 25, 183, 0) 100%
      ),
    #2a1f36;

  background-clip: padding-box;
`

type CardProps = Parameters<typeof BorderBox>[0] & {
  title: string
  subTitle?: string
  img?: string
  children?: React.ReactNode
}

export const Card = (props: CardProps) => {
  const { children, highlight, title, subTitle, img, ...boxProps } = props

  return (
    <BorderBox {...boxProps} highlight={highlight ? true : undefined}>
      <StyledBox
        highlight={highlight ? true : undefined}
        sx={{
          padding: !!subTitle ? '10px 16px' : '20px 26px',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            paddingBottom: '4px',
            ...(highlight && {
              lineHeight: '133.4%',
            }),
          }}
        >
          {title}
        </Typography>
        {!!subTitle && <Typography color="#E6E0E9">{subTitle}</Typography>}

        <Box
          sx={{
            paddingTop: '24px',
          }}
        >
          {children}
        </Box>
      </StyledBox>
      {!!img && (
        <Box
          sx={{
            position: 'absolute',
            top: '-24px',
            right: '32px',
          }}
        >
          <Image src={img} width={165} height={76} alt="card-image" />
        </Box>
      )}
    </BorderBox>
  )
}
