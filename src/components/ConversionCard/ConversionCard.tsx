import { useCallback, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { AmountSlider } from '../AmountSlider'
import { Card } from '../Card'
import { TokenAmounts } from './TokenAmounts'
import { tiltWrap } from '../../theme'
import { ApproveButton } from '../Buttons/ApproveButton'
import { PRY_TOKEN, VPRY_TOKEN } from '../../consts/known-tokens'
import { useAccount, useBalance, UsePrepareContractWriteConfig } from 'wagmi'

import {
  STAKING_CONTRACT_ADDRESS,
  TOKEN_MANAGER_CONTRACT_ADDRESS,
} from '../../consts/contract-addresses'
import tokenManagerAbi from '../../abi/tokenManagerABI.json'
import pryAbi from '../../abi/pryABI.json'

import { Abi, parseUnits } from 'viem'
import { useSnackbar } from 'notistack'
import { normalize, secondsToDays } from '../../utils'
import { decodeConversionLogs, decodeDepositVestingLogs } from './utils'
import { waitForTransaction } from '@wagmi/core'
import { TransactionAction } from '../TransactionAction'
import { MARKS, MAX_DAYS, MIN_DAYS } from './consts'

export const ConversionCard = () => {
  const { enqueueSnackbar } = useSnackbar()

  const [tokens, setTokens] = useState(['PRY', 'vPRY'] as [string, string])
  const [value, setValue] = useState('0')
  const [vestingDuration, setVestingDuration] = useState(MIN_DAYS)
  const account = useAccount()
  const {
    data: balance,
    isLoading,
    isError,
  } = useBalance({
    token: tokens[0] === 'PRY' ? PRY_TOKEN.address : VPRY_TOKEN.address,
    address: account.address,
    watch: true,
  })

  const redeemPercentage = 50 + ((vestingDuration - 15) * 50) / (180 - 15)
  const redeemablePRY = (redeemPercentage / 100) * Number(value)

  const handleChange = (value: string) => {
    setValue(value)
  }

  const handleFlip = () => {
    setTokens([tokens[1], tokens[0]])
  }

  const handleVestingDurationChange = (
    event: Event,
    value: number | number[],
  ) => {
    setVestingDuration(value as number)
  }

  const config: UsePrepareContractWriteConfig =
    tokens[0] === 'PRY'
      ? {
          address: TOKEN_MANAGER_CONTRACT_ADDRESS,
          functionName: 'convertToken',
          abi: tokenManagerAbi as Abi,
          args: [parseUnits(value, PRY_TOKEN.decimals)],
          enabled: Number(value) > 0,
        }
      : {
          address: STAKING_CONTRACT_ADDRESS,
          functionName: 'depositVesting',
          abi: pryAbi as Abi,
          args: [parseUnits(value, PRY_TOKEN.decimals), vestingDuration],
          enabled: Number(value) > 0,
        }

  const handleSuccess = useCallback(
    async (hash: `0x${string}`) => {
      setValue('0')
      setVestingDuration(0)

      const receipt = await waitForTransaction({
        hash,
      })

      let event = decodeConversionLogs(receipt)

      let msg: string | undefined = undefined

      if (event !== undefined) {
        msg = `Converted ${normalize(
          (event.data.args as { amount: bigint }).amount,
          PRY_TOKEN.decimals,
        )} ${PRY_TOKEN.symbol} to ${VPRY_TOKEN.symbol} successfully!`
      } else {
        event = decodeDepositVestingLogs(receipt)

        if (event !== undefined) {
          const { amount, endTime } = event.data.args as {
            amount: bigint
            endTime: bigint
          }

          msg = `Deposited ${normalize(amount, VPRY_TOKEN.decimals)} ${
            VPRY_TOKEN.symbol
          } for ${secondsToDays(endTime)} day(s) successfully!`
        }
      }

      if (msg !== undefined) {
        enqueueSnackbar(msg, {
          key: hash,
          variant: 'success',
          autoHideDuration: 20000,
          action: <TransactionAction hash={hash} />,
        })
      }
    },
    [enqueueSnackbar],
  )

  return (
    <Card
      title="Conversion"
      subTitle="Customize your vesting schedule."
      sx={{
        flex: '0 1 auto',
      }}
    >
      <TokenAmounts
        tokens={tokens}
        value={value}
        onChange={handleChange}
        onFlip={handleFlip}
        sx={{
          marginBottom: '36px',
        }}
        maxAmount={balance?.formatted}
        disabled={isLoading || isError}
      />
      {tokens[0] === 'PRY' ? (
        <Box
          sx={{
            height: '157px',
            marginBottom: '32px',
          }}
        />
      ) : (
        <>
          <AmountSlider
            label="Vesting Duration"
            unit="DAYS"
            min={MIN_DAYS}
            max={MAX_DAYS}
            valueLabelDisplay="auto"
            marks={MARKS}
            value={vestingDuration}
            onChange={handleVestingDurationChange}
          />
          <Box>
            <Typography color="text.surface">
              Redeem Percentage{' '}
              <Typography
                fontFamily={tiltWrap.style.fontFamily}
                fontSize="16px"
              >
                {+redeemPercentage.toFixed(2)}%
              </Typography>
            </Typography>
          </Box>
          <Box sx={{ paddingBottom: '32px' }}>
            <Typography color="text.surface">
              Redeemable PRY{' '}
              <Typography
                fontFamily={tiltWrap.style.fontFamily}
                fontSize="16px"
              >
                {+redeemablePRY.toFixed(2)}
              </Typography>
            </Typography>
          </Box>
        </>
      )}

      <ApproveButton
        config={config}
        label="Convert"
        tokenAddress={
          tokens[0] === 'PRY' ? PRY_TOKEN.address : VPRY_TOKEN.address
        }
        amount={value}
        fullWidth
        loadingText="Converting..."
        spenderAddress={TOKEN_MANAGER_CONTRACT_ADDRESS}
        onSuccess={handleSuccess}
        disabled={!config.enabled}
      />
    </Card>
  )
}
