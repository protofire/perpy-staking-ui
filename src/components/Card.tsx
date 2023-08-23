import { Box, Typography } from '@mui/material'
import { styled } from '@mui/system'
import Image from 'next/image'

type BoxProps = Parameters<typeof Box>[0]

type HighlightProps = BoxProps & {
  highlight?: boolean
}

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
        50% 50% at calc(100% + 64px) calc(100% - 40px),
        #6419b7 0%,
        rgba(100, 25, 183, 0) 100%
      ),
    #2a1f36;

  background-clip: padding-box;
`

interface CardProps {
  title: string
  subTitle?: string
  highlight?: boolean
  img?: string
  children?: React.ReactNode
}

export const Card = (props: CardProps) => {
  return (
    <BorderBox highlight={props.highlight ? true : undefined}>
      <StyledBox
        highlight={props.highlight ? true : undefined}
        sx={{
          padding: !!props.subTitle ? '10px 16px' : '20px 26px',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            paddingBottom: '4px',
          }}
        >
          {props.title}
        </Typography>
        {!!props.subTitle && (
          <Typography color="#E6E0E9">{props.subTitle}</Typography>
        )}

        <Box
          sx={{
            paddingTop: '24px',
          }}
        >
          {props.children}
        </Box>
      </StyledBox>
      {!!props.img && (
        <Box
          sx={{
            position: 'absolute',
            top: '-24px',
            right: '32px',
          }}
        >
          <Image src={props.img} width={165} height={76} alt="card-image" />
        </Box>
      )}
    </BorderBox>
  )
}
