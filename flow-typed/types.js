// @flow

/**
 * NOTE: It's just example
 */

/**
 * General
 */
declare type Index = number
declare type EthereumAddress = 'Ethereum'
declare type Address = string | EthereumAddress
declare type Addresses = Array<Address>
declare type Decimals = number
declare type Balances = { [Address]: number }
declare type AddressBalancePairs = Array<[Address, number]>
declare type LanguageCode = 'en' | 'ko' | 'zh' | 'ja'

declare type FormFields = { [string]: ?string }

declare type FSA = {
  +type: string,
  +payload: Object,
  +meta: Object,
  +error: boolean,
}

declare type Next = FSA => FSA
declare type Dispatch = Object => Next
declare type GetState = () => State

declare type Store = {
  dispatch: Dispatch,
  getState: GetState,
}

/**
 * Networks
 */
declare type NetworkId = string
declare type NetworkTitleById = { [NetworkId]: string }

declare type Network = {
  id: NetworkId,
  title: string,
  rpcaddr: string,
  rpcport: string,
  ssl: boolean,
  isCustom: boolean,
}

declare type Networks = Array<Network>

declare type NetworksData = {
  +items: Networks,
  +invalidFields: FormFields,
  +customNetworkRPC: string,
  +isLoading: boolean,
  +isInitialised: boolean,
  +currentNetwork: ?NetworkId,
}

/**
 * Entire state
 */
declare type State = {
  +networks: NetworksData,
}
