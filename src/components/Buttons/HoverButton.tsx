import { Button } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

type HoverButtonProps = Parameters<typeof Button>[0] & {
  hoverProps?: Parameters<typeof Button>[0]
}

export const HoverButton = ({ hoverProps, ...props }: HoverButtonProps) => {
  const ref = useRef<HTMLButtonElement | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const [buttonProps, setButtonProps] =
    useState<Exclude<HoverButtonProps, 'hoverProps'>>(props)

  const handleMouseEnter = () => {
    if (!isClient) return
    setButtonProps({ ...props, ...hoverProps })
  }

  const handleMouseLeave = () => {
    setButtonProps(props)
  }

  return (
    <Button
      ref={ref}
      {...buttonProps}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  )
}
