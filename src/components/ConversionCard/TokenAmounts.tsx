import {
  Box,
  BoxProps,
  Button,
  IconButton,
  Input,
  styled,
  Tooltip,
  Typography,
} from '@mui/material'
import { roboto, tiltWrap } from '../../theme'
import Image from 'next/image'
import { useAccount, useBalance } from 'wagmi'
import { PRY_TOKEN, VPRY_TOKEN } from '../../consts/known-tokens'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import { useIsClient } from '../../hooks/useIsClient'
import { formatCurrency, normalize } from '../../utils'
import BigNumber from 'bignumber.js'

const NumberInput = styled(Input)`
  &:before,
  &:after,
  &:hover:not(.Mui-disabled, .Mui-error):before,
  &:hover:not(.Mui-disabled, .Mui-error):after {
    content: none;
  }

  & .MuiInput-input {
    width: auto;
    padding: 0;
    max-width: 70px;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    -moz-appearance: textfield;
  }

  display: inline-block;

  max-width: 70px;
  min-width: 20px;
  width: auto;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 20px;
  font-weight: 400;
  line-height: 160%;
  color: #fff;
  margin-right: 8px;
  overflow: hidden;
  text-wrap: nowrap;
  text-overflow: ellipsis;
`

interface TokenAmountsProps extends Omit<BoxProps, 'onChange'> {
  value?: string
  onChange?: (value: string) => void
  onFlip?: () => void
  tokens: [string, string]
  maxAmount?: string
  disabled?: boolean
}

export const TokenAmounts = (props: TokenAmountsProps) => {
  const {
    value = '0',
    onChange,
    tokens,
    onFlip,
    maxAmount,
    disabled,
    ...boxProps
  } = props
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

  const isClient = useIsClient()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value.trim()
    const numVal = Number(val)
    if (maxAmount === undefined || numVal < Number(maxAmount)) {
      onChange?.(event.target.value.trim().replace(/^0+(?=\d)/, '') || '0')
    }
  }

  const handleMaxClick = () => {
    const normalizedBalance = normalize(
      balance?.value ?? BigInt('0'),
      PRY_TOKEN.decimals,
    )

    onChange?.(normalizedBalance.toString())
  }

  const size = value?.length ?? 1

  return (
    <Box
      {...boxProps}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '95px',
        gap: '-21px',
        position: 'relative',
        ...props.sx,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '4px',
          background:
            'linear-gradient(283deg, #6419B7 5.41%, rgba(100, 25, 183, 0.00) 100.69%)',
          padding: '16px 24px 16px 12px',
          width: '165px',
          alignItems: 'flex-start',
          height: '116px',
        }}
      >
        <Typography color="text.secondary" fontWeight={600} lineHeight="150%">
          From
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '8px',
            width: '100%',
          }}
        >
          <NumberInput
            value={value}
            onChange={handleChange}
            inputProps={{
              size,
              sx: {
                paddingTop: '2px',
                maxWidth: '130px',
              },
            }}
            type="number"
            disabled={disabled}
          />
          <Typography
            color="#fff"
            fontFamily={tiltWrap.style.fontFamily}
            fontSize="20px"
            fontWeight={400}
            lineHeight="160%"
          >
            {tokens[0]}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
            title={
              isClient
                ? formatCurrency(
                    new BigNumber(balance?.formatted ?? '0').toPrecision(5),
                    tokens[0],
                  )
                : '0 PRY'
            }
          >
            <AccountBalanceWalletIcon
              sx={{
                color: 'text.surface',
                fontSize: '20px',
                marginRight: '4px',
              }}
            />
            <Typography
              fontSize="12px"
              color="text.surface"
              textOverflow="ellipsis"
              overflow="hidden"
              sx={{
                textWrap: 'nowrap',
              }}
            >
              {isClient || isLoading || isError
                ? formatCurrency(
                    new BigNumber(balance?.formatted ?? '0').toPrecision(5),
                    tokens[0],
                  )
                : '0 PRY'}
            </Typography>
          </Box>
          <Button
            variant="text"
            size="small"
            sx={{
              fontSize: '12px',
              fontWeight: 400,
              fontFamily: roboto.style.fontFamily,
              minWidth: 'auto',
              color: 'text.secondary',
              borderRadius: '8px',
            }}
            onClick={handleMaxClick}
          >
            MAX
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '4px',
          background:
            'linear-gradient(283deg, #6419B7 5.41%, rgba(100, 25, 183, 0.00) 100.69%)',
          padding: '16px 12px 16px 24px',
          width: '165px',
          alignItems: 'flex-start',
          overflow: 'hidden',
          height: '116px',
        }}
      >
        <Typography color="text.secondary" fontWeight={600} lineHeight="150%">
          To
        </Typography>
        <Tooltip title={`${value} ${tokens[1]}`}>
          <Box
            sx={{
              display: 'flex',
              gap: '8px',
              maxWidth: '100%',
            }}
          >
            <Typography
              color="#fff"
              fontFamily={tiltWrap.style.fontFamily}
              fontSize="20px"
              fontWeight={400}
              lineHeight="160%"
              sx={{
                textWrap: 'nowrap',
                textOverflow: 'ellipsis',
                display: 'inline-block',
                overflow: 'hidden',
              }}
            >
              {value}
            </Typography>

            <Typography
              color="#fff"
              fontFamily={tiltWrap.style.fontFamily}
              fontSize="20px"
              fontWeight={400}
              lineHeight="160%"
              sx={{
                textWrap: 'nowrap',
                textOverflow: 'ellipsis',
                maxWidth: '92px',
              }}
            >
              {tokens[1]}
            </Typography>
          </Box>
        </Tooltip>
      </Box>
      <IconButton
        onClick={onFlip}
        sx={{
          position: 'absolute',
          right: '50%',
          top: '50%',
          transform: 'translate(50%, -50%)',
        }}
      >
        <Image src="/swap.svg" alt="logo" width="43" height="43" />
      </IconButton>
    </Box>
  )
}
