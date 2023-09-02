![Logo](https://s2.coinmarketcap.com/static/img/coins/64x64/23933.png)

# Perpy Staking UI

A web3 decentralized app (dApp) to manage PRY token staking and vesting.

## Tech Stack

Typescript
React
NextJS
Material-ui
RainbowKit
Wagmi
Viem

## Installation

Install dependencies

```bash
  yarn install
```

## Setup environment variables

```bash
  touch .env.local
```

Edit `.env.local` file and set up the folowing variables:

```
# Set-up a project id on [WalletConnect Cloud](https://cloud.walletconnect.com/sign-in) to use here
NEXT_PUBLIC_PROJECT_ID=
# Set true to enable Arbitrum Goerli testnet
NEXT_PUBLIC_ENABLE_TESTNETS=
# Alchemy API key
NEXT_PUBLIC_ALCHEMY_API_KEY=
```

## Run

Run dev environment

```bash
  yarn dev
```

Build

```bash
  yarn build
```

Run production environment

```bash
  yarn start
```

## Deployment

Vercel deployment URL: [perpy-staking-ui-muvy.vercel.app](https://perpy-staking-ui-muvy.vercel.app/)

## Learn more

To learn more about this stack, take a look at the following resources:

- [RainbowKit Documentation](https://rainbowkit.com) - Learn how to customize your wallet connection flow.
- [wagmi Documentation](https://wagmi.sh) - Learn how to interact with Ethereum.
- [Next.js Documentation](https://nextjs.org/docs) - Learn how to build a Next.js application.
