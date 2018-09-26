import React, { Component } from 'react';
import './swap.css';
import Network from '../network/network';
import CreateSwap from '../createSwap/createSwap';
import SwapLogs from '../swapLogs/swapLogs';

class Swap extends Component {

  constructor() {
    super();

    this.state = {
      network1: {
        title: '',
        accounts: [],
        currency: '',
      },
      network2: {
        title: '',
        accounts: [],
        currency: '',
      },
      swap: null
    }
  }

  updateNetwork(field, value, network, currency) {
    switch(field) {
      case 'accounts':
        this.setState({
          [network]: {
            title: network,
            accounts: value,
            currency: currency
          }
        })
        break;
      default:
        break;
    }
  }

  swap(swapData) {
    this.setState({
      swap: {
        ...swapData,
        logs: []
      }
    })
  }

  addLog(log) {
    const logs = this.state.swap.logs;
    logs.push(log);
    this.setState({
      swap: {
        ...this.state.swap,
        logs: logs
      }
    })
  }

  checkSwap(network) {
    // TODO: export to lib to avoid double
    if(network === this.state.swap.swapFrom.networkName) {
      return 'swapFrom';
    } else if(network === this.state.swap.swapTo.networkName) {
      return 'swapTo'
    } return null
  }

  deductAccount(sender, value, network) {
    // TOOD: refactor to any separated accounts component

    const account = this.state[network].accounts.find((item)=>{
      return item.address === sender;
    })
    const accounts = this.state[network].accounts.filter((item)=>{
      return item.address !== sender;
    });
    account.balance = Number(account.balance) - Number(value);
    accounts.push(account);
    this.setState({
      [network]: {
        ...this.state[network],
        accounts: accounts
      }
    });
  }
  
  addAmountToAccount(receiver, value, network) {
    const account = this.state[network].accounts.find((item)=>{
      return item.address === receiver;
    })
    const accounts = this.state[network].accounts.filter((item)=>{
      return item.address !== receiver;
    });
    account.balance = Number(account.balance) + Number(value);
    accounts.push(account);
    this.setState({
      [network]: {
        ...this.state[network],
        accounts: accounts
      }
    });
  }

  registerSwapTransaction(transaction, network) {
    let whichSwap = this.checkSwap(network);
    const swap = this.state.swap[whichSwap];

    if(transaction.from === swap.senderAddress){
      this.setState({
        swap: {
          ...this.state.swap,
          [whichSwap]: {
            ...this.state.swap[whichSwap],
            swapAccountBalance: this.state.swap[whichSwap].swapAccountBalance ? 
                                Number(this.state.swap[whichSwap].swapAccountBalance) + 
                                Number(transaction.value) : Number(transaction.value),
            status: (Number(this.state.swap[whichSwap].swapAccountBalance) + Number(transaction.value)) >= this.state.swap[whichSwap].value ? 'completed' : 'open'
          }
        }
      }, () =>{
        if(this.state.swap.swapFrom.status === 'completed' && this.state.swap.swapTo.status === 'completed') {
          this.addLog(`Users completed both swaps, money is transferred to users`);
        this.transferMoneyFromSwaps();
        } else if(this.state.swap[whichSwap].status === 'completed') {
          this.addLog(`Receiver with address ${transaction.from} completed swap ${whichSwap}`);
        }
      })
    }
  }

  transferMoneyFromSwaps() {
    const {swap} = this.state;
    this.addAmountToAccount(swap.swapFrom.receiverAddress, swap.swapFrom.value, swap.swapFrom.networkName);
    this.addAmountToAccount(swap.swapTo.receiverAddress, swap.swapTo.value, swap.swapTo.networkName);
    setTimeout(()=>{
      this.setState({
        swap: null
      });
    }, 5000)
  }

  doTransaction(transaction, network) {
    this.addLog(`Receiver with address ${transaction.from} sent ${transaction.value} coins to ${transaction.to} address`);
    this.deductAccount(transaction.from, transaction.value, network);
    if(transaction.to === 'swap') {
      this.registerSwapTransaction(transaction, network);
    } else {
      this.addAmountToAccount(transaction.to, transaction.value, network);
    }
  }

  renderNetworks() {
    return(
      <div id="networks">
        <Network 
          name={'network1'}
          accounts={this.state.network1.accounts}
          status={this.state.status} 
          currency={'RAD'} 
          update={(field, value)=>this.updateNetwork(field, value, 'network1', 'RAD')}
          sendMoney={(transaction)=>{this.doTransaction(transaction, 'network1')}}
          swap={this.state.swap}/>
        <Network 
          name={'network2'}
          accounts={this.state.network2.accounts}
          currency={'FAB'} 
          update={(field, value)=>this.updateNetwork(field, value, 'network2', 'FAB')}
          sendMoney={(transaction)=>{this.doTransaction(transaction, 'network2')}}
          swap={this.state.swap}/>
          <div className="clearfix"></div>
      </div>
    )
  }

  renderCreateSwap() {
    return ( <CreateSwap createSwap={(swapData)=>{this.swap(swapData)}} networks={[this.state.network1, this.state.network2]}/> )
  }

  renderSwapLogs() {
    return (<SwapLogs swap={this.state.swap}/>)
  }

  render() {
    return (
      <div className="swap">
        {this.renderNetworks()}
        {
          !this.state.swap && 
          this.state.network1.accounts.length >= 2 && 
          this.state.network2.accounts.length >= 2 && 
          this.renderCreateSwap()
        }
        {
          !this.state.swap && 
          (this.state.network1.accounts.length < 2 || 
          this.state.network2.accounts.length < 2) && 
          <p class="info">You have to add at least 2 accounts in every network to get possibility to create swap.</p>
        }
        {this.state.swap && (
          this.renderSwapLogs()
        )}
      </div>
    );
  }
}

export default Swap;
