import React, { Component } from 'react';
import './swapLogs.css';

class SwapLogs extends Component {

  render() {
    const {swap} = this.props;
    return (
      <div className="swap_logs">
        <div className="swap_info">
          <p>Swap was created from network: {swap.swapFrom.networkName}</p>
          <p>Receiver address in {swap.swapFrom.networkName} is: {swap.swapFrom.receiverAddress}</p>
          <p>Sender address in {swap.swapFrom.networkName} is: {swap.swapFrom.senderAddress}</p>
          <p>Amount of coin in {swap.swapFrom.networkName} is: {swap.swapFrom.value}</p>
          <p>These values will swap for data below:</p>
          <p>Second number name: {swap.swapTo.networkName}</p>
          <p>Receiver address in {swap.swapTo.networkName} is: {swap.swapTo.receiverAddress}</p>
          <p>Sender address in {swap.swapTo.networkName} is: {swap.swapTo.senderAddress}</p>
          <p>Amount of coin in {swap.swapTo.networkName} is: {swap.swapTo.value}</p>
        </div>
        {swap.logs.map((log, index)=>{
          return(<p key={index}>{log}</p>)
        })}
      </div>
    );
  }
}

export default SwapLogs;
