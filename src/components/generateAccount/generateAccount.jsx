import React, { Component } from 'react';
import sha256 from 'crypto-js/sha256';
import './generateAccount.css';
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');


class GenerateAccount extends Component {
  generateKeys() {
    const keys = ec.genKeyPair();
    return keys;
  }
  getPrivKey(keys) {
    return keys.priv.toString('hex');
  }
  getPublicKey(keys) {
    const publicPoint = keys.getPublic();
    const publicKey = publicPoint.encode('hex');
    return publicKey;
  }

  generateAccount() {
    const keys = this.generateKeys();
    const privateKey = this.getPrivKey(keys);
    const publicKey = this.getPublicKey(keys);
    const address = `0x${sha256(publicKey).toString()}`;
    const account = {
      privateKey,
      publicKey,
      address,
      balance: 1000000000000
    }
    this.props.generate(account);
  }

  render() {
    return (
      <div className="generate_account">
        <button onClick={()=>this.generateAccount()}>Generate account</button>
      </div>
    );
  }
}

export default GenerateAccount;
