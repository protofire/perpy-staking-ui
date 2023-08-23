import { Box, styled } from '@mui/material'
import { Logo } from './Logo'
import { ConnectButton } from './Buttons/ConnectButton'

const Ol = styled('ol')(({ theme }) => ({
  display: 'flex',
  listStyle: 'none',
  gap: 10,
  color: theme.palette.text.primary,
}))

const Li = styled('li')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 15,
  fontWeight: 500,
  lineHeight: '26px',
  letterSpacing: '0.46px',
  textTransform: 'uppercase',
  cursor: 'pointer',
  '&:hover': {
    color: theme.palette.text.secondary,
  },
  minWidth: 94,
  textAlign: 'center',
}))

export const Navbar = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '30px',
      }}
    >
      <Logo />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <nav>
          <Ol>
            <Li>DOCS</Li>
            <Li>STAKE</Li>
            <Li>EARN</Li>
            <Li>VOTE</Li>
          </Ol>
        </nav>
        <ConnectButton />
      </Box>
    </Box>
  )
}
