import SHA256 from '../libs/sha256.js'
import Base58 from '../libs/Base58.js'
import qora from '../libs/qora.js'

export default {
  accountSeed: '',
  keyPair: '',
  base58: {
    addressSeed: '',
    AccountSeed: '',
    AccountPublicKey: '',
    AccountPrivateKey: '',
    AccountAddress: ''
  },

  generateSeed (passphrase) {
    var byteSeed = new Uint8Array(SHA256.digest(SHA256.digest(passphrase)))
    var base58BaseSeed = Base58.encode(byteSeed)

    this.accountSeed = base58BaseSeed
    return this.accountSeed
  },

  createAddress (seed58) {
    var seed = Base58.decode(seed58)

    if (seed.length !== 32) {
      window.alert('invalid seed!')
      return
    }

    // console.log(Base58.encode(seed))

    // var accountSeed = qora.generateAccountSeed(seed, 0, false)

    /* var creds = {
      keyPair: qora.getKeyPairFromSeed(seed),
      addressSeed: Base58.encode(seed)
    } */

    // creds.address = qora.getAccountAddressFromPublicKey(creds.keyPair.publicKey)

    this.generateKeys(seed)

    var address = qora.getAccountAddressFromPublicKey(this.keyPair.publicKey)

    return address

    // this.accountFromSeed(this.base58.addressSeed)

    // context.base58 = this.base58
  },

  accountFromSeed (base58AccountSeed) {
    if (base58AccountSeed) {
      this.base58.AccountSeed = base58AccountSeed
    } else {
      base58AccountSeed = this.base58.AccountSeed
    }

    if (Base58.decode(base58AccountSeed).length !== 32) {
      this.base58.AccountPublicKey = ''
      this.base58.AccountPrivateKey = ''
      this.base58.AccountAddress = ''
      this.response = 'invalid seed!'
      return
    }

    // this.keyPair = qora.getKeyPairFromSeed(base58AccountSeed, false)
    // this.base58.AccountPublicKey = Base58.encode(this.keyPair.publicKey)
    // this.base58.AccountPrivateKey = Base58.encode(this.keyPair.privateKey)

    this.generateKeys(base58AccountSeed)

    this.base58.AccountAddress = qora.getAccountAddressFromPublicKey(this.keyPair.publicKey)
  },

  generateKeys (base58AccountSeed) {
    this.keyPair = qora.getKeyPairFromSeed(base58AccountSeed, false)
    this.base58.AccountPublicKey = Base58.encode(this.keyPair.publicKey)
    this.base58.AccountPrivateKey = Base58.encode(this.keyPair.privateKey)
  }
}
