import { styled } from '@mui/material'
import {
  MaterialDesignContent,
  SnackbarProvider as NotistackSnackbarProvider,
} from 'notistack'

const StyledMaterialDesignContent = styled(MaterialDesignContent)`
  &.notistack-MuiContent-success {
    background-color: ${({ theme }) => theme.palette.success.main};
    color: ${({ theme }) => theme.palette.success.contrastText};

    & svg {
      color: ${({ theme }) => theme.palette.success.icon};
    }
  }

  &.notistack-MuiContent-error {
    background-color: ${({ theme }) => theme.palette.error.main};
    color: ${({ theme }) => theme.palette.error.contrastText};

    & svg {
      color: ${({ theme }) => theme.palette.error.icon};
    }
  }
`

export const SnackbarProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <NotistackSnackbarProvider
      maxSnack={3}
      Components={{
        success: StyledMaterialDesignContent,
        error: StyledMaterialDesignContent,
      }}
    >
      {children}
    </NotistackSnackbarProvider>
  )
}
