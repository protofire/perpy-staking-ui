export interface ContractMeta {
  address: `0x${string}`
}

export interface TokenMeta {
  address: `0x${string}`
  symbol: string
  decimals: number
}

export interface ChainConfig<T extends TokenMeta | ContractMeta> {
  [chainId: number]: T
}

export interface ContractsConfig<T extends TokenMeta | ContractMeta> {
  [entry: string]: ChainConfig<T>
}
