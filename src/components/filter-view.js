import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import Button from './button';

export default class FilterView extends Component {
  render() {
    return (
      <View style={ styles.panel }>
        <Text style={ styles.panelWelcome }>
          Filter Results
        </Text>
        <Button
          onPress={ () => this.props.closeDrawer() }
          text="Close Drawer"
        />
      </View>
    )
  }
};

const styles = StyleSheet.create({
  panel: {
    flex: 1,
    backgroundColor:'#326945',
  },
  panelWelcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 25,
    color:'white',
    fontWeight:'bold',
  }
});
