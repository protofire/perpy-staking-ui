import { useEffect, useMemo, useState } from 'react'
import { formatTimeLeft, getTimeLeft } from './utils'

interface TimeLeftProps {
  startTime: bigint
  vestingDuration: bigint
}

export const TimeLeft = ({ startTime, vestingDuration }: TimeLeftProps) => {
  const [value, setValue] = useState(
    useMemo(
      () => getTimeLeft(startTime, vestingDuration),
      [startTime, vestingDuration],
    ),
  )

  useEffect(() => {
    const interval = setInterval(() => {
      const timeLeft = getTimeLeft(startTime, vestingDuration)
      setValue(timeLeft)
    }, 1000 * 60)

    return () => {
      clearInterval(interval)
    }
  }, [startTime, vestingDuration])

  return <>{formatTimeLeft(value)}</>
}
