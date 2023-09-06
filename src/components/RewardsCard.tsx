import { STAKING_CONTRACT_ADDRESS } from '../consts/contract-addresses'
import { PRY_TOKEN } from '../consts/known-tokens'
import { useIsClient } from '../hooks/useIsClient'
import { useRewards } from '../hooks/useRewards'
import { formatCurrency } from '../utils'
import { ApproveButton } from './Buttons/ApproveButton'
import { Card } from './Card'
import { RewardsBanner } from './RewardsBanner'
import pryABI from '../abi/pryABI.json'
import { Abi } from 'viem'
import { useAccount } from 'wagmi'
import { useActiveIndexes } from '../hooks/useActiveIndexes'

export const RewardsCard = () => {
  const isClient = useIsClient()

  const {
    data: {
      totalEarned,
      totalEarnedUsd,
      claimable,
      claimableUsd,
      dividendRewards,
      dividendRewardsUsd,
      vestingRewards,
      vestingRewardsUsd,
    },
    error,
    isLoading,
    isError,
  } = useRewards()

  const account = useAccount()

  const {
    data: activeIndexes,
    error: activeIndexesError,
    isLoading: activeIndexesIsLoading,
    isError: activeIndexesIsError,
  } = useActiveIndexes()

  const config = dividendRewards.eq(0)
    ? {
        address: STAKING_CONTRACT_ADDRESS,
        abi: pryABI as Abi,
        functionName: 'claimVesting',
        args: [activeIndexes],
        enabled:
          !!account.address &&
          !activeIndexesIsLoading &&
          !activeIndexesIsError &&
          activeIndexes !== undefined &&
          activeIndexes.length > 0,
      }
    : {
        address: STAKING_CONTRACT_ADDRESS,
        abi: pryABI as Abi,
        functionName: 'claimDividend',
      }

  return (
    <Card title="Rewards" img="/coins.svg" highlight>
      <RewardsBanner
        title="Total earned"
        value={isClient ? formatCurrency(totalEarnedUsd, 'USD') : '$0'}
        subValue={
          isClient ? formatCurrency(totalEarned, PRY_TOKEN.symbol) : '0 PRY'
        }
        sx={{
          marginBottom: '32px',
          marginTop: '8px',
        }}
        loading={isClient ? isLoading : false}
      />
      <RewardsBanner
        title="Claimable"
        value={isClient ? formatCurrency(claimableUsd, 'USD') : '$0'}
        subValue={
          isClient ? formatCurrency(claimable, PRY_TOKEN.symbol, 8) : '0 PRY'
        }
        sx={{
          marginBottom: '32px',
        }}
        loading={isClient ? isLoading : false}
        tooltip={
          isClient
            ? `
                Dividend rewards ${formatCurrency(
                  dividendRewardsUsd,
                  'USD',
                )} + Vesting rewards ${formatCurrency(vestingRewardsUsd, 'USD')}
            `
            : ''
        }
        subTooltip={
          isClient
            ? `
                    Dividend rewards ${formatCurrency(
                      dividendRewards,
                      PRY_TOKEN.symbol,
                    )} + Vesting rewards ${formatCurrency(
                vestingRewards,
                PRY_TOKEN.symbol,
              )}
                `
            : ''
        }
      />
      <ApproveButton
        label={
          isClient && claimable.gt(0)
            ? dividendRewards.eq(0)
              ? `Claim vesting rewards`
              : 'Claim dividend rewards'
            : 'Claim'
        }
        loadingText="Claiming..."
        config={config}
        fullWidth
        disabled={isClient ? isLoading || isError || claimable.eq(0) : false}
        error={error ?? activeIndexesError}
        skipApproval
      />
    </Card>
  )
}
