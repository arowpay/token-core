/**
 * mnemonic flow test
 *
 * import -> sign -> export -> delete
 */

import signTx from './base/signTx'

import {
  MNEMONIC_12,
  PASSWORD,
  BITCOINCASH_MAINNET_MNEMONIC_12_ADDRESS,
} from '../../constant'
import { formatHdStoreParams } from '../../chain'

// sign tx
export const SIGN_TX = [{
  mnemonic: MNEMONIC_12,
  network: "MAINNET",
  segWit: "NONE",
  signature: "0100000001e2986a004630cb451921d9e7b4454a6671e50ddd43ea431c34f6011d9ca4c309000000006a473044022064fb81c11181e6604aa56b29ed65e31680fc1203f5afb6f67c5437f2d68192d9022022282d6c3c35ffdf64a427df5e134aa0edb8528efb6151cb1c3b21422fdfd6e041210251492dfb299f21e426307180b577f927696b6df0b61883215f88eb9685d3d449ffffffff020e6d0100000000001976a9142af4c2c085cd9da90c13cd64c6ae746fa139956e88ac22020000000000001976a914bedf37acf35504c9bfd18b09d989d0fb23fd269688ac00000000",

  password: PASSWORD,
  chainType: "BITCOINCASH",
  address: BITCOINCASH_MAINNET_MNEMONIC_12_ADDRESS,
  input: {
    to: "qq40fskqshxem2gvz0xkf34ww3h6zwv4dcr7pm0z6s",
    amount: 93454,
    unspents: [{
      txHash: "09c3a49c1d01f6341c43ea43dd0de571664a45b4e7d9211945cb3046006a98e2",
      vout: 0,
      amount: 100000,
      address: BITCOINCASH_MAINNET_MNEMONIC_12_ADDRESS,
      scriptPubKey: "76a91488d9931ea73d60eaf7e5671efc0552b912911f2a88ac",
      derivedPath: "1/0",
      sequence: 0
    }],
    memo: "",
    fee: 6000,
    changeIdx: 1,
    changeAddress: "",
    network: "MAINNET",
    segWit: "NONE"
  }
}]

export default function () {
  describe('⏳ signTx flow', () => {
    for (const txIndex in SIGN_TX) {
      const tx = SIGN_TX[txIndex]
      const { mnemonic, chainType, password, network, segWit, input, address, signature } = tx
      const inputStr = JSON.stringify(input)

      it(`should sign ${inputStr} by ${chainType} wallet, and the expected signature is ${signature}`, async () => {
        const params = formatHdStoreParams({
          mnemonic,
          chainType,
          password,
          network,
          segWit,
        })
        await signTx({ ...params, input: inputStr, address, signature })
      })
    }
  })
}
