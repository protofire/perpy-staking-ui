interface ContractMeta {
  address: `0x${string}`
}

interface ChainConfig {
  [chainId: number]: ContractMeta
}

interface ContractsConfig {
  [entry: string]: ChainConfig
}
