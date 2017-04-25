import { observer } from 'mobx-react';
import React, { Component, PropTypes } from 'react';
import {
  ListView,
  RecyclerViewBackedScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Button from './button';

@observer
export default class FilterView extends Component {
  renderRow = bookmark => (
    <TouchableHighlight
      onPress={() => console.log(bookmark.data.name)}
      underlayColor="#DDD"
    >
      <View>
        <View style={styles.row}>
          <Text style={styles.rowText}>
            {bookmark.data.name}
          </Text>
          <View style={styles.rowTextCountWrapper}>
            <Text style={styles.rowTextCount}>
              0
            </Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );

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

      <ListView
        dataSource={ this.props.bookmarkStore.dataSource }
        renderRow={ this.renderRow }
        enableEmptySections={ true }
      />

      </View>
    )
  }
};

FilterView.propTypes = {
  bookmarkStore: PropTypes.object.isRequired
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
