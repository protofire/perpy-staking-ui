import { createTheme } from '@mui/material'
import { Tilt_Warp, Inter } from 'next/font/google'

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    default: true
  }
}

const tiltWrap = Tilt_Warp({ subsets: ['latin'] })
const inter = Inter({ subsets: ['latin'] })

export const theme = createTheme({
  typography: {
    fontFamily: tiltWrap.style.fontFamily,
    h2: {
      fontSize: 32,
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: 0.5,
      color: '#fff',
    },
    h3: {
      fontSize: '48px',
      fontWeight: 400,
      lineHeight: '56.02px',
      color: '#fff',
    },
    h5: {
      fontSize: '24px',
      fontWeight: 400,
      lineHeight: '32px',
      color: '#fff',
      letterSpacing: 0.15,
    },
    h6: {
      fontSize: '20px',
      fontWeight: 400,
      lineHeight: '32px',
      color: '#fff',
      letterSpacing: 0.15,
    },

    body1: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '20px',
      color: '#fff',
      letterSpacing: 0.25,
      fontFamily: inter.style.fontFamily,
    },
  },
  palette: {
    text: {
      primary: '#fff',
      secondary: '#AC57E9',
    },
    primary: {
      main: '#2196F3',
      contrastText: '#fff',
    },
    secondary: {
      main: '#9C27B0',
      contrastText: '#fff',
    },
    error: {
      main: '#D32F2F',
      contrastText: '#fff',
    },
    warning: {
      main: '#EF6C00',
      contrastText: '#fff',
    },
    info: {
      main: '#0288D1',
      contrastText: '#fff',
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'default' },
          style: {
            background: 'linear-gradient(180deg, #38bcf4 0%, #6419b7 100%)',
            color: '#fff',
            fontWeight: 500,
            fontSize: 15,
            lineHeight: '26px',
            letterSpacing: 0.46,
            fontFamily: inter.style.fontFamily,
            borderRadius: '50px',
            height: '42px',
            padding: ['8px 22px'],
          },
        },
      ],
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#8525DB',
          fontWeight: 500,
          fontSize: '15px',
          lineHeight: '26px',
          letterSpacing: 0.46,
          fontFamily: inter.style.fontFamily,
          textTransform: 'uppercase',
          textDecoration: 'none',
        },
      },
    },
  },
})
