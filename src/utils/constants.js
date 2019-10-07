import TokenPriceContestABI from './TokenPriceContestABI'

export const MINIMUM_BET = 0.01

export const NUM_PARTICIPANTS = 10

export const MEDIUM_VIEWPORT_BREAKPOINT = 1264
export const SMALL_VIEWPORT_BREAKPOINT = 960

export const ETHEREUM_NETWORKS = {
  MAINET: {
    id: 1,
    name: 'MAINNET'
  },
  ROPSTEN: {
    id: 3,
    name: 'ROPSTEN'
  },
  RINKEBY: {
    id: 4,
    name: 'RINKEBY'
  },
  GOERLI: {
    id: 5,
    name: 'GOERLI'
  }
}

export const ETHEREUM_NETWORK = ETHEREUM_NETWORKS.RINKEBY
export const ETHEREUM_NETWORK_ID = ETHEREUM_NETWORK.id

export const ERRORS = {
  METAMASK_LOCKED: 'METAMASK_LOCKED',
  METAMASK_NOTFOUND: 'METAMASK_NOTFOUND',
  WRONG_NETWORK: 'WRONG_NETWORK',
  CONTRACT_NOT_AVAILABLE: 'CONTRACT_NOT_AVAILABLE'
}

export const ADDRESS = '0x5f0aBcb84A2dB73Ed9A5b3192a2aD0A7E6aDA716'
export const ABI = TokenPriceContestABI.abi

// ALGO,BTC,EOS,ETC,ETH,LINK,MKR,REP,XTZ,ZEC
export const TOKENS = [
  {
    ticker: 'ALGO',
    name: 'Algorand',
    nameid: 'algorand',
    position: 0
  },
  {
    ticker: 'BTC',
    name: 'Bitcoin',
    nameid: 'bitcoin',
    position: 1
  },
  {
    ticker: 'EOS',
    name: 'EOSIO',
    nameid: 'eosio',
    position: 2
  },
  {
    ticker: 'ETC',
    name: 'Ethereum Classic',
    nameid: 'ethereum-classic',
    position: 3
  },
  {
    ticker: 'ETH',
    name: 'Ethereum',
    nameid: 'ethereum',
    position: 4
  },
  {
    ticker: 'LINK',
    name: 'Chainlink',
    nameid: 'chainlink',
    position: 5
  },
  {
    ticker: 'MKR',
    name: 'Maker',
    nameid: 'maker',
    position: 6
  },
  {
    ticker: 'REP',
    name: 'Augur',
    nameid: 'augur',
    position: 7
  },
  {
    ticker: 'XTZ',
    name: 'Tezos',
    nameid: 'tezos',
    position: 8
  },
  {
    ticker: 'ZEC',
    name: 'Zcash',
    nameid: 'zcash',
    position: 9
  }
]

export const ITEMS_PER_PAGE = 5

export const STATES = {
  BET: 'BET',
  WAIT: 'WAIT',
  RESOLVE: 'RESOLVE',
  WAIT_RESULT: 'WAIT_RESULT',
  PAYOUT: 'PAYOUT',
  INVALID: 'INVALID'
}

export const pollStatesMap = {
  0: STATES.BET,
  1: STATES.WAIT,
  2: STATES.RESOLVE,
  3: STATES.WAIT_RESULT,
  4: STATES.PAYOUT,
  5: STATES.INVALID,

  [STATES.BET]: 0,
  [STATES.WAIT]: 1,
  [STATES.RESOLVE]: 2,
  [STATES.WAIT_RESULT]: 3,
  [STATES.PAYOUT]: 4,
  [STATES.INVALID]: 5
}
