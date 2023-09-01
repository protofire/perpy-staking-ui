import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { Card } from '../Card'
import { VestingBanner } from '../VestingBanner'
import { useVesting } from '../../hooks/useVesting'
import { formatCurrency, normalize } from '../../utils'
import { useIsClient } from '../../hooks/useIsClient'
import { UsePrepareContractWriteConfig } from 'wagmi'
import pryAbi from '../../abi/pryABI.json'
import { Abi } from 'viem'
import { STAKING_CONTRACT_ADDRESS } from '../../consts/contract-addresses'
import { useCallback } from 'react'
import { waitForTransaction } from '@wagmi/core'
import { decodeCancelLogs, decodeRedeemLogs } from './utils'
import { VPRY_TOKEN } from '../../consts/known-tokens'
import { TransactionAction } from '../TransactionAction'
import { ApproveButton } from '../Buttons/ApproveButton'
import { useSnackbar } from 'notistack'
import { TimeLeft } from './TimeLeft'

export const VestingCard = () => {
  const isClient = useIsClient()
  const { enqueueSnackbar } = useSnackbar()
  const { data: vestingStakes, isLoading, isError } = useVesting()

  const cancelConfig = useCallback(
    (index: bigint): UsePrepareContractWriteConfig => ({
      address: STAKING_CONTRACT_ADDRESS,
      abi: pryAbi as Abi,
      functionName: 'cancel',
      args: [index],
    }),
    [],
  )

  const redeemConfig = useCallback(
    (index: bigint): UsePrepareContractWriteConfig => ({
      address: STAKING_CONTRACT_ADDRESS,
      abi: pryAbi as Abi,
      functionName: 'withdrawVesting',
      args: [index],
    }),
    [],
  )

  const handleCancelSuccess = useCallback(
    async (hash: `0x${string}`) => {
      const receipt = await waitForTransaction({
        hash,
      })

      const event = decodeCancelLogs(receipt)

      if (event) {
        const { sentAmount, burnedAmount } = event.data.args as {
          sentAmount: bigint
          burnedAmount: bigint
        }

        const msg = `Cancelled vesting for ${formatCurrency(
          normalize(sentAmount, VPRY_TOKEN.decimals),
          VPRY_TOKEN.symbol,
        )} and burned ${formatCurrency(
          normalize(burnedAmount, VPRY_TOKEN.decimals),
          VPRY_TOKEN.symbol,
        )}!`

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

  const handleRedeemSuccess = useCallback(
    async (hash: `0x${string}`) => {
      const receipt = await waitForTransaction({
        hash,
      })

      const event = decodeRedeemLogs(receipt)

      if (event) {
        const { amount, vestedBurn } = event.data.args as {
          amount: bigint
          vestedBurn: bigint
        }

        const msg = `Redeemed ${formatCurrency(
          normalize(amount, VPRY_TOKEN.decimals),
          VPRY_TOKEN.symbol,
        )} and burned ${formatCurrency(
          normalize(vestedBurn, VPRY_TOKEN.decimals),
          VPRY_TOKEN.symbol,
        )}!`

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
      title="Vesting"
      subTitle="Vested vPRY is entitled to 50% of the real yield."
      sx={{
        flex: '1 0 66%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'stretch',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'stretch',
            width: '100%',
            marginBottom: '32px',
          }}
        >
          <VestingBanner
            value="15 days"
            title="Min. Vesting"
            sx={{
              flex: '1 1 auto',
            }}
          />
          <VestingBanner
            value="180 days"
            title="Max. Vesting"
            sx={{
              flex: '1 1 auto',
            }}
          />
          <VestingBanner
            value="50%"
            title="Min. Ratio"
            sx={{
              flex: '1 1 auto',
            }}
          />
          <VestingBanner
            value="100%"
            title="Max. Ratio"
            sx={{
              flex: '1 1 auto',
            }}
          />
        </Box>

        <TableContainer
          component={Box}
          sx={{
            maxHeight: '260px',
          }}
        >
          <Table sx={{ minWidth: '100%', tableLayout: 'fixed' }} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>vPRY Input</TableCell>
                <TableCell>PRY Output</TableCell>
                <TableCell>Time Left</TableCell>
                <TableCell width={180}>Cancel/Redeem</TableCell>
                <TableCell>Rewards</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isClient ? (
                vestingStakes?.map((vestingStake, index) => {
                  const extra = vestingStakes[index]

                  return (
                    <TableRow key={vestingStake.index.toString()}>
                      <TableCell>{formatCurrency(extra.input)}</TableCell>
                      <TableCell>{formatCurrency(extra.output ?? 0)}</TableCell>
                      <TableCell>
                        <TimeLeft
                          startTime={extra.startTime}
                          vestingDuration={extra.vestingDuration}
                        />
                      </TableCell>
                      <TableCell>
                        {extra.isRedeemable ? (
                          <ApproveButton
                            variant="outlined"
                            label="REDEEM"
                            loadingText="Redeeming..."
                            config={redeemConfig(extra.index)}
                            disabled={extra.isCancelled || extra.isWithdrawn}
                            onSuccess={handleRedeemSuccess}
                            skipApproval
                          />
                        ) : (
                          <ApproveButton
                            variant="outlined"
                            label="CANCEL"
                            loadingText="Cancelling..."
                            config={cancelConfig(extra.index)}
                            disabled={extra.isCancelled}
                            onSuccess={handleCancelSuccess}
                            skipApproval
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(extra?.rewards ?? 0)}
                      </TableCell>
                    </TableRow>
                  )
                })
              ) : isLoading ? (
                <TableRow>
                  <TableCell colSpan={5}>Loading...</TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={5}>Error...</TableCell>
                </TableRow>
              ) : null}

              {!vestingStakes?.length && !isLoading && !isError && (
                <TableRow>
                  <TableCell colSpan={5}>No vesting stakes found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Card>
  )
}
