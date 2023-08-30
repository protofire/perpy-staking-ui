import { alpha, createTheme, darken } from '@mui/material'
import { Tilt_Warp, Inter, Roboto } from 'next/font/google'

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    default: true
    error: true
  }
}

export const tiltWrap = Tilt_Warp({ subsets: ['latin'] })
const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({ subsets: ['latin'], weight: '500' })

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
    success: {
      main: '#EDF7ED',
      contrastText: '#1E4620',
    },
    error: {
      main: '#FDEDED',
      contrastText: '#5F2120',
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
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h2',
          h2: 'h2',
          h3: 'h2',
          h4: 'h2',
          h5: 'h2',
          h6: 'h2',
          subtitle1: 'h2',
          subtitle2: 'h2',
          body1: 'span',
          body2: 'span',
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'default' },
          style: {
            minWidth: '180px',
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
            '&.Mui-disabled': {
              border: '1px solid rgba(0, 0, 0, 0.12)',
              color: 'rgba(0, 0, 0, 0.38)',
              boxShadow: 'none',
              background: 'rgba(0, 0, 0, 0.12)',
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            color: '#8525DB',
            fontWeight: 500,
            fontSize: 15,
            lineHeight: '26px',
            letterSpacing: 0.46,
            fontFamily: roboto.style.fontFamily,
            borderRadius: '50px',
            height: '42px',
            padding: ['8px 22px'],
            border: '1px solid #8525DB',
            boxShadow:
              '0px 3px 1px -2px rgba(0, 0, 0, 0.20), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)',

            '&:hover': {
              border: '1px solid #8525DB',
              background: 'rgba(156, 39, 176, 0.04)',
            },

            '&.Mui-disabled': {
              border: '1px solid rgba(0, 0, 0, 0.12)',
              color: 'rgba(0, 0, 0, 0.38)',
              boxShadow: 'none',
            },
          },
        },
        {
          props: { variant: 'error' },
          style: {
            minWidth: '180px',
            background: alpha('#D32F2F', 0.1),
            color: '#D32F2F',
            border: `1px solid ${darken('#D32F2F', 0.1)}`,
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
    MuiSlider: {
      styleOverrides: {
        root: {
          color: '#8525DB',
        },
        rail: {
          color: '#E6E0E9',
          opacity: 1,
        },
        mark: {
          backgroundColor: '#49454F',
        },
        markActive: {
          backgroundColor: '#E6E0E9',
        },
        thumb: {
          '&:hover': {
            boxShadow: `0px 0px 0px 8px ${alpha('#AC57E91F', 0.12)}`,
          },
          '&.Mui-focusVisible': {
            boxShadow: `0px 0px 0px 8px ${alpha('#AC57E91F', 0.12)}`,
          },
          '&.Mui-active': {
            boxShadow: `0px 0px 0px 14px ${alpha('#AC57E91F', 0.12)}`,
          },
        },
        valueLabel: {
          fontFamily: roboto.style.fontFamily,
          borderRadius: '14px',
          minWidth: '28px',
          backgroundColor: '#6419B7',
          padding: '0.25rem 0.3rem',
          '&:before': {
            width: '14px',
            height: '14px',
            bottom: '4px',
            zIndex: -1,
          },
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          color: '#fff',
          padding: '16px 0px 16px 4px',
          fontFamily: inter.style.fontFamily,
          fontSize: '14px',
          fontWeight: 400,
          lineHeight: '143%',
          letterSpacing: '0.17px',
          borderColor: '#6419B7',
        },

        head: {
          color: '#AC57E9',
          fontWeight: 500,
          lineHeight: '24px',
          padding: '7px 0px 7px 4px',
          borderColor: 'rgba(0, 0, 0, 0.12)',
        },
      },
    },
  },
})
