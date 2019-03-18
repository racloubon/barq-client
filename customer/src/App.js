import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateMenu } from './store/actions/entities';

import Menu from './containers/menu';

import './App.css';

const fakeMenu = {
  _id: '123',
  categories: [
    {
      _id: 3,
      name: 'Happy hour!',
      items: [
        {
          _id: 7,
          name: 'Copa de Sangria Roja',
          price: 3.5,
          currency: 'EUR',
        },
        {
          _id: 8,
          name: 'Estrella',
          price: 1.5,
          currency: 'EUR',
        },
        {
          _id: 9,
          name: 'Terrible shots',
          price: 1,
          currency: 'EUR',
        },
      ],
    },
    {
      _id: 1,
      name: 'Bottled beers',
      items: [
        {
          _id: 1,
          name: 'Corona',
          price: 3.6,
          currency: 'EUR',
        },
        {
          _id: 2,
          name: 'Heineken',
          price: 2.3,
          currency: 'EUR',
        },
        {
          _id: 3,
          name: 'Fancy ass beer',
          price: 12.3,
          currency: 'EUR',
        },
      ],
    },
    {
      _id: 2,
      name: 'Wines',
      items: [
        {
          _id: 4,
          name: 'Vino tinto de la casa',
          price: 3.5,
          currency: 'EUR',
        },
        {
          _id: 5,
          name: 'Medium priced wine',
          price: 5.3,
          currency: 'EUR',
        },
        {
          _id: 6,
          name: 'Fancy ass wine',
          price: 12.3,
          currency: 'EUR',
        },
      ],
    },
  ],
};

class App extends Component { // eslint-disable-line
  componentDidMount = () => {
    this.props.updateMenu(fakeMenu);
  }

  render() {
    return (
      <Menu menu={this.props.menu} />
    );
  }
}

const mapStateToProps = state => ({
  menu: state.entities.menu,
});

const mapDispatchToProps = dispatch => ({
  updateMenu: menu => dispatch(updateMenu(menu)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
