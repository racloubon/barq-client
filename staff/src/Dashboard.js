import React, { Component } from 'react';
import './dashboard.css';
import axios from 'axios';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import { updateQueue, addOrder, updateStatus, updatePage, setOpen } from './store/actions';

import Queue from './containers/queue';
import Display from './containers/display';
import QrCode from './containers/qrCode';
import PopUp from './ui/popup.js';

class Dashboard extends Component {
  url = `/staff${window.location.pathname}`;

  switch = {
    MAIN: () => (
      <Queue
        socket={this.socket}
        queue={this.props.queue}  
      />
    ),
    HISTORY: () => (
      <Queue
        socket={this.socket}
        queue={this.props.history}  
      />
    ),
    DISPLAY: () => (
      <Display 
        socket={this.socket}
        queue={this.props.queue}
        history={this.props.history}
      />
    ),
    QRCODE: () => (
      <QrCode />
    )
  }

  componentDidMount() {
  }

  listAllOrders = () => {
    axios.get(`${this.url}/queue`, {headers: {"Content-type": "application/json"}})
     .then(res => {
       const { queue } = res.data;
       this.props.updateQueue(queue)
     })
  }

  toggleBlocked = () => {
    axios.post(`${this.url}/open`, {
      open: !this.props.isBlocked
    })
    .then(res => {
      this.props.setOpen(!this.props.isOpen);
    })
  }
  
  componentDidMount = () => {
    this.listAllOrders();
    this.socket = io(window.location.pathname, {
      query: {
        bar: window.location.pathname,
        token: 'token'
      },
    });

    this.socket.on('NEW_ORDER', (newOrder) => {
      this.props.addOrder(newOrder);
    });

    this.socket.on('STATUS_UPDATE', (orderId, status) => {
      this.props.updateStatus(status, this.props.queue.concat(this.props.history).find(order => order.orderId === orderId));
    });
  }

  closeSocket = () => {
    this.socket.removeAllListeners();
    this.socket.close();
  }

  componentWillUnmount = () => this.closeSocket();

  render() {
    return (
      <div className="dashboard">
        { this.switch[this.props.page]() }
        <PopUp page={this.props.page} isOpen={this.props.isOpen} updatePage={this.props.updatePage} toggleBlocked={this.toggleBlocked} />
      </div>  
    );
  }
}

const mapStateToProps = (state) => {
  return {
    queue: state.queue,
    history: state.history,
    page: state.page,
    isOpen: state.isOpen
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateQueue: (queue) => dispatch(updateQueue(queue)),
    addOrder: (order) => dispatch(addOrder(order)),
    updateStatus: (status, order) => dispatch(updateStatus(status, order)),
    updatePage: (page) => dispatch(updatePage(page)),
    setOpen: (isOpen) => dispatch(setOpen(isOpen))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
