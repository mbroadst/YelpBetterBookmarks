import React, { Component } from 'react';
import { AppRegistry, View, StyleSheet } from 'react-native';
import App from './src/app';

export default class YelpBetterBookmarks extends Component {
  render() {
    return (
      <App/>
    );
  }
}

AppRegistry.registerComponent('YelpBetterBookmarks', () => YelpBetterBookmarks);
