import { Badge } from '../Badge'
import { useIsClient } from '../../hooks/useIsClient'
import { formatCurrency } from '../../utils'
import { useTotalEarned } from '../../hooks/useTotalEarned'

export const TotalEarnedBadge = () => {
  const isClient = useIsClient()

  const { data: totalEarned } = useTotalEarned()

  return (
    <Badge
      value={formatCurrency(
        isClient ? totalEarned?.amountUsd.decimalPlaces(3).toString() ?? 0 : 0,
        'USD',
      )}
      label="Total Earned"
      img="/earnings.svg"
    />
  )
}
