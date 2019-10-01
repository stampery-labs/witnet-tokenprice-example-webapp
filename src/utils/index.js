import Web3 from 'web3'
import { ADDRESS, ABI, ETHEREUM_NETWORK_ID, ERRORS, TOKENS } from '@/utils/constants'

export function setAgreeFlag () {
  localStorage.setItem('agree', true)
}

export function readAgreeFlag () {
  return localStorage.getItem('agree')
}

export function setSeenFlag () {
  localStorage.setItem('seen', true)
}

export function readSeenFlag () {
  return localStorage.getItem('seen')
}

export async function getWeb3 () {
  const web3js = window.ethereum
  if (web3js) {
    const web3 = new Web3(web3js)

    try {
      await window.ethereum.enable()

      const isInjectedWeb3 = !!await web3.eth.getAccounts()
      if (!isInjectedWeb3) {
        return ERRORS.METAMASK_LOCKED
      }

      return { web3 }
    } catch (error) {
      return ERRORS.METAMASK_NOT_FOUND
    }
  } else {
    return ERRORS.METAMASK_NOT_FOUND
  }
}

export async function checkMetamaskStatus (web3) {
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    if (!accounts) {
      throw Error(ERRORS.METAMASK_LOCKED)
    }
  } else {
    if (window.ethereum) {
      throw Error(ERRORS.METAMASK_LOCKED)
    } else {
      throw Error(ERRORS.METAMASK_NOT_FOUND)
    }
  }
}

export async function checkEthereumNetwork (web3) {
  if (web3) {
    const network = await web3.eth.net.getId()
    console.log('network', network)
    console.log('NET', ETHEREUM_NETWORK_ID)
    if (network !== ETHEREUM_NETWORK_ID) {
      throw Error(ERRORS.WRONG_NETWORK)
    }
    return network
  } else {
    checkMetamaskStatus()
  }
}

export async function getContract (web3Provider) {
  try {
    const contract = await new web3Provider.eth.Contract(ABI, ADDRESS)
    if (!contract) {
      throw Error(ERRORS.CONTRACT_NOT_AVAILABLE)
    }
    return contract
  } catch (error) {
    throw Error(ERRORS.CONTRACT_NOT_AVAILABLE)
  }
}

export async function getTotalTokensAmountByDay (contractInstance, day) {
  const tokens = { }

  for (let token of TOKENS) {
    let amount = await contractInstance.methods.getTotalAmountTokenDay(day, parseInt(token.position)).call()
    tokens[token.ticker] = {
      name: token.name,
      ticker: token.ticker,
      amount
    }
  }

  return tokens
}
