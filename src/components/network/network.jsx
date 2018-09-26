import React, { Component } from 'react';
import './network.css';
import GenerateAccount from '../generateAccount/generateAccount';

class Network extends Component {

  constructor() {
    super();

    this.state = {
      transaction: {}
    }
  }
  
  generateAccount(account) {
    const accounts = this.props.accounts;
    accounts.push(account);
    this.props.update('accounts', accounts);
  }

  onChange(value, type) {
    this.setState({
      transaction: {
        ...this.state.transaction,
        [type]: value
      }
    })
  }

  doTransaction() {
    this.props.sendMoney(this.state.transaction);
  }

  defineSwapNetwork() {
    if(this.props.swap.swapFrom.networkName === this.props.name) {
      return {
        ...this.props.swap.swapFrom,
        swapType: 'swap from',
      };
    } else if(this.props.swap.swapTo.networkName === this.props.name) {
      return {
        ...this.props.swap.swapTo,
        swapType: 'swap to',
      };
    }
  }

  renderAccounts() {
    let swap = null;
    if(this.props.swap) {
      swap = this.defineSwapNetwork();
    }
    return (
      <div>
        {this.props.accounts.length > 0 && (
          <div className="network_info">
            <p>Accounts in the network: </p>
            <ul>
              {this.props.accounts.map((account, index)=>{
                return (
                  <li key={index}>
                  <span>Address: {account.address.substring(0, 12)}...</span>
                  <span>Balance: {account.balance} {this.props.currency}</span>
                  </li>
                )
              })}
              {swap && (
                <li>
                  <span>Address: swap</span>
                  <span>Balance: {swap.swapAccountBalance} {this.props.currency}</span>
                </li>
              )}
            </ul>
            {swap && (
              <div className="transaction">
                <p>Do transaction (to send to swap type 'swap' in the address field)</p>
                <input onChange={(e)=>{this.onChange(e.target.value, 'from')}} type="text" placeholder="from"/>
                <input onChange={(e)=>{this.onChange(e.target.value, 'to')}} type="text" placeholder="to"/>
                <input onChange={(e)=>{this.onChange(e.target.value, 'value')}} type="number" placeholder="value"/>
                <button onClick={()=>{this.doTransaction()}}>Send</button>
              </div>
              )}
            
          </div>
        )}
      </div>
    )
  }

  renderNetworkInfo() {
    return(
      <div>
        {this.renderAccounts()}
      </div>
    )
  }

  render() {
    return (
      <div className="column">
        <h3>{this.props.name}</h3>
        <GenerateAccount generate={(acc)=>this.generateAccount(acc)}/>
        {this.renderNetworkInfo()}
      </div>
    );
  }
}

export default Network;
