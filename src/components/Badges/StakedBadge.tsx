import { Badge } from '../Badge'
import { useIsClient } from '../../hooks/useIsClient'
import { useStaked } from '../../hooks/useStaked'
import { formatCurrency } from '../../utils'

interface StakedBadgeProps {
  vested?: boolean
  symbol: string
}

export const StakedBadge = ({ vested = false, symbol }: StakedBadgeProps) => {
  const isClient = useIsClient()

  const { data: staked } = useStaked({
    vested,
  })

  return (
    <Badge
      value={formatCurrency(
        isClient ? staked?.amount.decimalPlaces(3).toString() ?? 0 : 0,
      )}
      subValue={formatCurrency(
        isClient ? staked?.amountUsd.decimalPlaces(3).toString() ?? 0 : 0,
        'USD',
      )}
      label={`Staked ${symbol}`}
      img="/vault.svg"
    />
  )
}
