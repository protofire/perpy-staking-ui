import { Box, BoxProps, styled, Typography } from '@mui/material'
import Image from 'next/image'
import { tiltWrap } from '../theme'

const Banner = styled(Box)`
  display: flex;
  justify-items: stretch;
  border-radius: 12px;
  width: 100%;
  height: 125px;
  display: flex;
  padding: 0 16px;
  gap: 16px;
  justify-content: stretch;
  align-items: center;
  background: linear-gradient(
      134deg,
      rgba(0, 0, 0, 0) 60.9%,
      rgba(255, 255, 255, 0.05) 61%,
      rgba(255, 255, 255, 0.02) 80%
    ),
    linear-gradient(180deg, #38bcf4 0%, #330b5f 100%);
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3),
    0px 1px 3px 1px rgba(0, 0, 0, 0.15);
`

const AvatarOuterBorderBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(
    180deg,
    rgba(133, 37, 219, 0) 0%,
    #4c5fba 70%,
    #2894d1 100%
  );
`

const Avatar = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 92px;
  height: 92px;
  border-radius: 50%;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.15) 0%,
    #c3c0c500 100%
  );
`

const StyledImage = styled(Image)`
  border-radius: 50%;
`

const NFT = styled(Box)`
  border-radius: 4px;
  border: 4px solid rgba(29, 105, 148, 0.6);
  width 78px;
  height: 78px;
`

interface UserBannerProps extends BoxProps {}

export const UserBanner = (props: UserBannerProps) => {
  return (
    <Banner {...props}>
      <AvatarOuterBorderBox>
        <Avatar>
          <StyledImage src="/user.jpeg" width={83} height={83} alt="user" />
        </Avatar>
      </AvatarOuterBorderBox>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRight: '1px solid rgba(0,0,0,0.12)',
          height: '100%',
          justifyContent: 'center',
          padding: '12px 32px 0 12px',
        }}
      >
        <Typography
          color="#E6E0E9"
          fontSize="20px"
          fontFamily={tiltWrap.style.fontFamily}
          lineHeight="160%"
        >
          John Doe
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: '24px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography color="#68D7F8">Staked</Typography>
            <Typography color="#E6E0E9">596.470 PRY</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography color="#68D7F8">Fees reductions level</Typography>
            <Typography color="#E6E0E9">10%</Typography>
          </Box>
        </Box>
      </Box>
      <NFT>
        <Image src="/nft.jpeg" width={70} height={70} alt="nft" />
      </NFT>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography color="#68D7F8">NFT</Typography>
        <Typography color="#E6E0E9">Pepey #1206</Typography>
      </Box>
    </Banner>
  )
}
