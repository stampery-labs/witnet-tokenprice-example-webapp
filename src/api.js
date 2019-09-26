export const api = {
  async placeBet (tokenId) {
    return delay({ result: '' })
  },
  resolve () {
    return delay({ result: '' })
  },
  payout () {
    return delay({ result: '' })
  },
  totalAmountTokenDay () {
    return delay({ result: '10' })
  },
  readMyBetsDay () {
    return delay({ result: [{
      address: '0x97BcBE5185A929FfBC493f3d7CF4692797029fF0',
      amount: '9',
      ticker: 'eth'
    },
    {
      address: '0x27BcBE5185A929FfBC493f3d7CF4692797029fF0',
      amount: '8',
      ticker: 'link'
    },
    {
      address: '0x07BcBE5185A929FfBC493f3d7CF4692797029fF0',
      amount: '7',
      ticker: 'rep'
    },
    {
      address: '0x27BcBE5185A929FfBC493f3d7CF4692797029fF0',
      amount: '6',
      ticker: 'btc'
    },
    {
      address: '0x07BcBE5185A929FfBC493f3d7CF4692797029fF0',
      amount: '5',
      ticker: 'bch'
    },
    {
      address: '0x27BcBE5185A929FfBC493f3d7CF4692797029fF0',
      amount: '5',
      ticker: 'grin'
    },
    {
      address: '0x07BcBE5185A929FfBC493f3d7CF4692797029fF0',
      amount: '4',
      ticker: 'ada'
    },
    {
      address: '0x27BcBE5185A929FfBC493f3d7CF4692797029fF0',
      amount: '3',
      ticker: 'mkr'
    },
    {
      address: '0x07BcBE5185A929FfBC493f3d7CF4692797029fF0',
      amount: '2',
      ticker: 'xmr'
    },
    {
      address: '0x07BcBE5185A929FfBC493f3d7CF4692797029fF0',
      amount: '1',
      ticker: 'xlm'
    }]
    })
  },
  getDayInfo () {
    return delay({ result: [
      {
        totalAmount: 100,
        grandPrize: 80,
        result: [],
        ranking: 1000000,
        witnetRequestId: '#witasdfadsfadsf'

      }
    ] })
  },
  calculateDay () {
    return delay({ result: '' })
  },
  rank () {
    return delay({ result: '' })
  }
}

async function delay (value) {
  await setTimeout(() => null, 1000)
  return value
}
