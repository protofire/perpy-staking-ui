import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { Card } from '../Card'
import { VestingBanner } from '../VestingBanner'

export const VestingCard = () => {
  return (
    <Card
      title="Vesting"
      subTitle="Vested xPRY is entitled to 50% of the real yield."
      sx={{
        flex: '1 0 66%',
        display: 'flex',
        flexDirection: 'column',
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

        <TableContainer component={Box}>
          <Table sx={{ minWidth: '100%', tableLayout: 'fixed' }}>
            <TableHead>
              <TableRow>
                <TableCell>xPRY Input</TableCell>
                <TableCell>PRY Output</TableCell>
                <TableCell>Time Left</TableCell>
                <TableCell>Cancel/Redeem</TableCell>
                <TableCell>Rewards</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1000</TableCell>
                <TableCell>1000</TableCell>
                <TableCell>5:22</TableCell>
                <TableCell>
                  <Button variant="outlined">CANCEL</Button>
                </TableCell>
                <TableCell>32</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>950</TableCell>
                <TableCell>564</TableCell>
                <TableCell>19:34</TableCell>
                <TableCell>
                  <Button variant="outlined">REDEEM</Button>
                </TableCell>
                <TableCell>5</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>350</TableCell>
                <TableCell>624</TableCell>
                <TableCell>50:01</TableCell>
                <TableCell>
                  <Button variant="outlined" disabled>
                    Cancel
                  </Button>
                </TableCell>
                <TableCell>12</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Card>
  )
}
