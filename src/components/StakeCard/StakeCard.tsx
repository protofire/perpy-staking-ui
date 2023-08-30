import { useCallback, useMemo } from 'react'
import { useSnackbar } from 'notistack'
import BigNumber from 'bignumber.js'
import { useAccount, useBalance } from 'wagmi'
import { Abi, TransactionReceipt } from 'viem'
import { AmountOperation } from '../AmountOperation'
import { Card } from '../Card'
import pryABI from '../../abi/pryABI.json'
import { normalize } from '../../utils'
import { PRY_TOKEN, VPRY_TOKEN } from '../../consts/known-tokens'
import {
  STAKING_CONTRACT_ADDRESS,
  TOKEN_MANAGER_CONTRACT_ADDRESS,
} from '../../consts/contract-addresses'
import { TransactionLink } from '../TransactionLink'
import { decodeStakeLogs, decodeUnstakeLogs } from './utils'
import { useIsClient } from '../../hooks/useIsClient'
import { useStaked } from '../../hooks/useStaked'
import { IconButton } from '@mui/material'
import { CloseOutlined } from '@mui/icons-material'

interface StakeCardProps {
  vested?: boolean
  subtitle?: string
}

export const StakeCard = ({ vested = false, subtitle }: StakeCardProps) => {
  const isClient = useIsClient()

  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const account = useAccount()

  const tokenAddress = useMemo(
    () => (vested ? VPRY_TOKEN.address : PRY_TOKEN.address),
    [vested],
  )

  const {
    data,
    isError: balanceIsError,
    isLoading: balanceIsLoading,
    error: balanceError,
  } = useBalance({
    address: account.address,
    token: tokenAddress,
    watch: true,
  })

  const { value = BigInt(0), decimals = 18, symbol = 'UNK' } = data ?? {}

  const balance = new BigNumber(value.toString()).div(10 ** decimals)

  const {
    data: staked,
    isError: stakedAmountIsError,
    isLoading: stakedAmountIsLoading,
    error: stakedAmountError,
  } = useStaked({
    vested,
  })

  const stakeConfig = useCallback(
    (amount: bigint) => ({
      address: STAKING_CONTRACT_ADDRESS,
      abi: pryABI as Abi,
      args: [amount, vested ? '1' : '0'],
      functionName: 'depositDividend',
      enabled: amount > 0,
    }),
    [vested],
  )

  const unstakeConfig = useCallback(
    (amount: bigint) => ({
      address: STAKING_CONTRACT_ADDRESS,
      abi: pryABI as Abi,
      args: [amount, vested ? '1' : '0'],
      functionName: 'unstake',
      enabled: amount > 0,
    }),
    [vested],
  )

  const handleOnStakeSuccess = useCallback(
    (tx?: TransactionReceipt) => {
      if (tx) {
        const event = decodeStakeLogs(tx)

        const msg = `Staked ${normalize(
          (event.data.args as { amount: bigint }).amount,
          decimals,
        )} ${symbol} successfully!`

        enqueueSnackbar(msg, {
          key: tx.transactionHash,
          variant: 'success',
          autoHideDuration: 20000,
          action: (
            <>
              <TransactionLink hash={tx.transactionHash} />
              <IconButton
                onClick={() => closeSnackbar?.(tx.transactionHash)}
                size="small"
              >
                <CloseOutlined />
              </IconButton>
            </>
          ),
        })
      }
    },
    [decimals, symbol, enqueueSnackbar, closeSnackbar],
  )

  const handleOnUnstakeSuccess = useCallback(
    (tx?: TransactionReceipt) => {
      if (tx) {
        const event = decodeUnstakeLogs(tx)

        const msg = `Staked ${normalize(
          (event.data.args as { amount: bigint }).amount,
          decimals,
        )} ${symbol} successfully!`

        enqueueSnackbar(msg, {
          key: tx.transactionHash,
          variant: 'success',
          autoHideDuration: 20000,
          action: (
            <>
              <TransactionLink hash={tx.transactionHash} />
              <IconButton
                onClick={() => closeSnackbar?.(tx.transactionHash)}
                size="small"
              >
                <CloseOutlined />
              </IconButton>
            </>
          ),
        })
      }
    },
    [decimals, symbol, enqueueSnackbar, closeSnackbar],
  )

  return (
    <Card
      title={isClient ? `Stake ${symbol}` : 'Stake UNK'}
      subTitle={subtitle}
    >
      <AmountOperation
        buttonText="Stake"
        loadingText="Staking..."
        config={stakeConfig}
        tokenAddress={tokenAddress}
        spenderAddress={TOKEN_MANAGER_CONTRACT_ADDRESS}
        tokenDecimals={decimals}
        tokenSymbol={symbol}
        maxAmount={balance}
        disabled={balanceIsError || balanceIsLoading}
        error={balanceError}
        onSuccess={handleOnStakeSuccess}
      />

      <AmountOperation
        label="Staked"
        buttonText="Unstake"
        loadingText="Unstaking..."
        config={unstakeConfig}
        tokenAddress={tokenAddress}
        tokenDecimals={decimals}
        tokenSymbol={symbol}
        maxAmount={staked?.amount ?? new BigNumber(0)}
        disabled={stakedAmountIsError || stakedAmountIsLoading}
        error={stakedAmountError}
        requiresApproval={false}
        onSuccess={handleOnUnstakeSuccess}
      />
    </Card>
  )
}
