import { Link } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { getExplorerLink } from '../utils'

interface TransactionLinkProps {
  hash: string
}

export const TransactionLink = ({ hash }: TransactionLinkProps) => (
  <Link
    href={getExplorerLink(hash)}
    color="#ffffff"
    target="_blank"
    rel="noopener noreferrer"
  >
    <OpenInNewIcon
      sx={{
        fontSize: 18,
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
    />
  </Link>
)
