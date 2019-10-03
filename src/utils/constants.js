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

export const ADDRESS = '0xAfE1C0DaB27D692239981fFb9d5e6E6E53a755Fd'
export const ABI = TokenPriceContestABI.abi

export const TOKENS = [
  {
    ticker: 'ATOM',
    name: 'Cosmos',
    position: 0
  },
  {
    ticker: 'BTC',
    name: 'Bitcoin',
    position: 1
  },
  {
    ticker: 'ETC',
    name: 'Ethereum Classic',
    position: 2
  },
  {
    ticker: 'ETH',
    name: 'Ethereum',
    position: 3
  },
  {
    ticker: 'GNT',
    name: 'Golem',
    position: 4
  },
  {
    ticker: 'LINK',
    name: 'Chainlink',
    position: 5
  },
  {
    ticker: 'MKR',
    name: 'Maker',
    position: 6
  },
  {
    ticker: 'REP',
    name: 'Augur',
    position: 7
  },
  {
    ticker: 'XTZ',
    name: 'Tezos',
    position: 8
  },
  {
    ticker: 'ZEC',
    name: 'Zcash',
    position: 9
  }
]

export const ITEMS_PER_PAGE = 3

// BET -> You can bet with no restriction
// WAIT -> You have to wait until RESOLVE
// RESOLVE -> You can click the button to resolve market
// WAIT_RESULT -> You have to listen the wbi event or read the state of the wbi. If result is true show Button to withdraw. The states changes auto to PAYOUT
// PAYOUT -> You can withdraw. Show button
// INVALID -> You are trying to read a future day
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
