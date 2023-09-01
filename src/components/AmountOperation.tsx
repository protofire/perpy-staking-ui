import { Box } from '@mui/material'
import { useMemo, useState } from 'react'
import { UsePrepareContractWriteConfig } from 'wagmi'
import { parseUnits, TransactionReceipt } from 'viem'
import BigNumber from 'bignumber.js'
import { AmountSlider } from './AmountSlider'
import { ApproveButton } from './Buttons/ApproveButton'
import { TransactionButton } from './Buttons/TransactionButton'
import { waitForTransaction } from '@wagmi/core'
import { useIsClient } from '../hooks/useIsClient'

interface AmountOperationProps {
  tokenAddress: `0x${string}`
  tokenDecimals: number
  tokenSymbol: string
  maxAmount: BigNumber
  config:
    | UsePrepareContractWriteConfig
    | ((amount: bigint) => UsePrepareContractWriteConfig)
  label?: string
  buttonText: string
  loadingText: string
  spenderAddress?: `0x${string}`
  disabled?: boolean
  error?: Error | null
  requiresApproval?: boolean
  onSuccess?: (tx: TransactionReceipt) => void
}

export const AmountOperation = (props: AmountOperationProps) => {
  const {
    tokenAddress,
    tokenDecimals,
    tokenSymbol,
    config,
    label,
    buttonText,
    loadingText,
    spenderAddress,
    maxAmount,
    disabled,
    error,
    requiresApproval = true,
    onSuccess,
  } = props
  const [amount, setAmount] = useState<number>(0)
  const isClient = useIsClient()

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setAmount(newValue as number)
  }

  const handleTransactionSuccess = async (hash: `0x${string}`) => {
    const receipt = await waitForTransaction({
      hash,
    })

    onSuccess?.(receipt)

    setAmount(0)
  }

  const realConfig = useMemo(
    () =>
      typeof config === 'function'
        ? config(parseUnits(amount.toString(), tokenDecimals))
        : config,
    [config, amount, tokenDecimals],
  )

  const marks = useMemo(() => {
    if (maxAmount.gt(9)) {
      return Array.from(Array(9).keys()).map((_, value) => ({
        value:
          ((value * 10 + 10) * maxAmount.decimalPlaces(2).toNumber()) / 100,
      }))
    }

    return Array.from(Array(maxAmount.decimalPlaces(0).toNumber()).keys()).map(
      (_, value) => ({
        value: value + 1,
      }),
    )
  }, [maxAmount])

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        marginBottom: '32px',
      }}
    >
      <AmountSlider
        valueLabelDisplay="auto"
        marks={isClient ? marks : []}
        label={isClient ? label : ''}
        value={isClient ? amount : 0}
        unit={isClient ? tokenSymbol : 'UNK'}
        onChange={handleSliderChange}
        max={isClient ? maxAmount.decimalPlaces(2).toNumber() ?? 0 : 0}
        disabled={isClient ? disabled || maxAmount.isZero() : true}
      />
      {requiresApproval ? (
        <ApproveButton
          label={buttonText}
          loadingText={loadingText}
          config={realConfig}
          tokenAddress={tokenAddress}
          spenderAddress={spenderAddress ?? realConfig.address}
          amount={amount}
          disabled={
            disabled ||
            maxAmount.isZero() ||
            amount === 0 ||
            realConfig.address === undefined ||
            !realConfig.enabled
          }
          error={error}
          onSuccess={handleTransactionSuccess}
          fullWidth
        />
      ) : (
        <TransactionButton
          loadingText={loadingText}
          config={realConfig}
          disabled={
            disabled ||
            maxAmount.isZero() ||
            amount === 0 ||
            realConfig.address === undefined ||
            !realConfig.enabled
          }
          error={error}
          onSuccess={handleTransactionSuccess}
          fullWidth
        >
          {buttonText}
        </TransactionButton>
      )}
    </Box>
  )
}
