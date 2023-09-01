import { IconButton } from '@mui/material'
import { TransactionLink } from './TransactionLink'
import { CloseOutlined } from '@mui/icons-material'
import { useSnackbar } from 'notistack'

interface TransactionActionProps {
  hash: `0x${string}`
}

export const TransactionAction = ({ hash }: TransactionActionProps) => {
  const { closeSnackbar } = useSnackbar()

  return (
    <>
      <TransactionLink hash={hash} />
      <IconButton onClick={() => closeSnackbar?.(hash)} size="small">
        <CloseOutlined />
      </IconButton>
    </>
  )
}
