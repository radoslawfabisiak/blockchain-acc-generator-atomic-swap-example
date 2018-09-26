import React, { Component } from 'react';
import './createSwap.css';

class CreateSwap extends Component {

  constructor() {
    super();

    this.state = {
      swapFrom: {
        network: null,
        networkName: '',
        senderAddress: '',
        receiverAddress: '',
        value: 0,
        swapAccountBalance: 0,
      },
      swapTo: {
        network: null,
        networkName: '',
        senderAddress: '',
        receiverAddress: '',
        value: 0,
        swapAccountBalance: 0,
      },
    }
  }

  selectChanged(value, type) {
    switch(type) {
      case 'from':
        this.setState({
          swapFrom: {
            ...this.state.swapFrom,
            network: value,
            networkName: this.props.networks[value].title
          }
        })
        break;
      case 'swapFromSenderAddress':
        this.setState({
          swapFrom: {
            ...this.state.swapFrom,
            senderAddress: value,
          }
        })
        break;
      case 'swapFromReceiverAddress':
        this.setState({
          swapFrom: {
            ...this.state.swapFrom,
            receiverAddress: value,
          }
        })
        break;
      case 'swapFromValue':
        this.setState({
          swapFrom: {
            ...this.state.swapFrom,
            value: value,
          }
        })
        break;
      case 'to':
        this.setState({
          swapTo: {
            ...this.state.swapTo,
            network: value,
            networkName: this.props.networks[value].title
          }
        })
        break;
      case 'swapToSenderAddress':
        this.setState({
          swapTo: {
            ...this.state.swapTo,
            senderAddress: value,
          }
        })
        break;
      case 'swapToReceiverAddress':
        this.setState({
          swapTo: {
            ...this.state.swapTo,
            receiverAddress: value,
          }
        })
        break;
      case 'swapToValue':
        this.setState({
          swapTo: {
            ...this.state.swapTo,
            value: value,
          }
        })
        break;
      default:
        break;
    }
  }

  createSwap() {
    if(this.state.swapFrom.network && 
      this.state.swapFrom.networkName && 
      this.state.swapFrom.senderAddress && 
      this.state.swapFrom.receiverAddress && 
      this.state.swapFrom.value && 
      this.state.swapTo.networkName && 
      this.state.swapTo.senderAddress && 
      this.state.swapTo.receiverAddress && 
      this.state.swapTo.value) {
        this.props.createSwap(this.state);
      } else {
        console.log('you have to fill all fields');
      }
  }

  render() {
    const { networks } = this.props;
    // TODO: refactor to forms and smaller parts
    return (
      <div className="create_swap">
        <div className="column">
          <span>Swap from network:</span>
          <select onChange={(e)=>this.selectChanged(e.target.value, 'from')} name="" id="">
            <option></option>
            {networks.map((network, index)=>{
              return (<option key={index} value={index}>{network.title}</option>)
            })}
          </select>
          {this.state.swapFrom.network && this.state.swapTo.network && (
            <div>
              <span>{networks[this.state.swapFrom.network].title} sender address:</span>
              <select onChange={(e)=>this.selectChanged(e.target.value, 'swapFromSenderAddress')} name="" id="">
                <option></option>
                {networks[this.state.swapFrom.network].accounts.map((account)=>{
                  return (<option value={account.address}>{account.address.substr(0, 10)}...</option>)
                })}
              </select>
              <span>{networks[this.state.swapFrom.network].title} receiver address:</span>
              <select onChange={(e)=>this.selectChanged(e.target.value, 'swapFromReceiverAddress')} name="" id="">
                <option></option>
                {networks[this.state.swapFrom.network].accounts.map((account)=>{
                  return (<option value={account.address}>{account.address.substr(0, 10)}...</option>)
                })}
              </select>
              <span>How many {networks[this.state.swapFrom.network].currency} I will send:</span>
              <input type="number" onChange={(e)=>this.selectChanged(e.target.value, 'swapFromValue')}/>
            </div>
          )}
        </div>
        <div className="column">
          <span>Swap to network:</span>
          <select onChange={(e)=>this.selectChanged(e.target.value, 'to')} name="" id="">
            <option></option>
            {networks.map((network, index)=>{
              return (<option key={index} value={index}>{network.title}</option>)
            })}
          </select>
          {this.state.swapFrom.network && this.state.swapTo.network && (
            <div>
            <span>{networks[this.state.swapTo.network].title} sender address:</span>
            <select onChange={(e)=>this.selectChanged(e.target.value, 'swapToSenderAddress')} name="" id="">
              <option></option>
              {networks[this.state.swapTo.network].accounts.map((account)=>{
                return (<option value={account.address}>{account.address.substr(0, 10)}...</option>)
              })}
            </select>
            <span>{networks[this.state.swapTo.network].title} receiver address:</span>
            <select onChange={(e)=>this.selectChanged(e.target.value, 'swapToReceiverAddress')} name="" id="">
              <option></option>
              {networks[this.state.swapTo.network].accounts.map((account)=>{
                return (<option value={account.address}>{account.address.substr(0, 10)}...</option>)
              })}
            </select>
            <span>How many {networks[this.state.swapTo.network].currency} I want:</span>
              <input type="number" onChange={(e)=>this.selectChanged(e.target.value, 'swapToValue')}/>
          </div>
          )}
        </div>
        <button className="create_button" onClick={()=>{this.createSwap()}}>Create Swap</button>
      </div>
    );
  }
}

export default CreateSwap;
