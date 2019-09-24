import Web3 from 'web3'
import cookie from 'js-cookie'
import { ADDRESS, ABI } from './constants'

export function setSeenCookie () {
  cookie.set('seen', true)
}

export async function getWeb3 () {
  return new Promise(async function (resolve, reject) {
    const web3js = window.ethereum
    if (web3js) {
      const web3 = new Web3(web3js)

      try {
        await window.ethereum.enable()

        const isInjectedWeb3 = !!await web3.eth.getAccounts()
        if (!isInjectedWeb3) {
          reject(new Error('Unable to connect to Metamask'))
        }

        resolve({
          web3
        })
      } catch (error) {
        reject(error)
      }
    } else {
      reject(new Error('Metamask not found'))
    }
  })
}

export async function checkMetamaskStatus (web3) {
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    return accounts.length ? 'success' : { error: 'unlock' }
  } else {
    return window.ethereum ? { error: 'unlock' } : { error: 'install' }
  }
}

export async function getContract (web3Provider) {
  return new web3Provider.eth.Contract(ABI, ADDRESS)
}
