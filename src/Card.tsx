import { Box, Typography } from '@mui/material'
import { styled } from '@mui/system'

const BorderBox = styled(Box)<{
  highlight?: boolean
}>`
  background: linear-gradient(
      0deg,
      rgba(42, 31, 54, 0.6),
      rgba(42, 31, 54, 0.6)
    ),
    linear-gradient(
      151.06deg,
      #ac57e9 0.89%,
      rgba(111, 42, 173, 0.697396) 36.83%,
      rgba(81, 47, 112, 0.3) 99.48%
    );

  min-width: 360px;

  width: 100%;
  border-radius: 12px;
  position: relative;

  ${(props) =>
    props.highlight &&
    `box-shadow: 0px 0px 20px 0px #e0b9ff,
    0px 0px 45px 0px rgba(255, 185, 255, 0.2),
    0px 0px 75px 0px rgba(104, 31, 185, 0.5),
    0px 0px 85px 0px rgba(104, 31, 185, 0.6),
    0px 0px 100px 0px rgba(104, 31, 185, 0.8);
    `}
`

const StyledBox = styled(Box)<{
  highlight?: boolean
}>`
  border-radius: 12px;
  position: relative;
  box-sizing: border-box;
  border: solid 1px transparent;
  min-height: 480px;
  background-color: #2a1f36;
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
        600px 600px at 130% 160%,
        #6419b7 0%,
        rgba(100, 25, 183, 0) 100%
      )
      no-repeat,
    linear-gradient(43deg, #2a1f36 0%, #2a1f36 100%);

  background-clip: padding-box;
`

interface CardProps {
  title: string
  subTitle?: string
  highlight?: boolean
  img?: string
}

export const Card = (props: CardProps) => {
  return (
    <BorderBox highlight={props.highlight}>
      <StyledBox
        highlight={props.highlight}
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
        {!!props.subTitle && <Typography>{props.subTitle}</Typography>}
      </StyledBox>
      {!!props.img && (
        <Box
          sx={{
            position: 'absolute',
            top: '-24px',
            right: '32px',
          }}
        >
          <img src={props.img} alt="vault" />
        </Box>
      )}
    </BorderBox>
  )
}
