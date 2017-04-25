import { observer } from 'mobx-react';
import React, { Component, PropTypes } from 'react';
import {
  ListView,
  RecyclerViewBackedScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import Button from './button';
import StarRating from 'react-native-star-rating';
import debounce from 'lodash.debounce';

@observer
export default class FilterView extends Component {
  renderRow = bookmark => (
    <TouchableHighlight
      onPress={() => console.log(bookmark.data.name)}
      underlayColor="#FFF"
    >
      <View style={styles.bizRow}>
        <View style={styles.bizRowLeft}>
          <Text style={styles.bizName}>
            {bookmark.data.name}
          </Text>
          <View style={styles.bizRating}>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={bookmark.data.rating}
              starSize={12}
            />
            <Text>
              1,472 reviews
            </Text>
          </View>
          <Text style={styles.bizLocation}>
            {bookmark.data.address}
          </Text>
          <Text style={styles.bizCategories}>
            {bookmark.data.categories.join(', ')}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );

  constructor(props) {
    super(props);

    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeText = debounce(this.onChangeText, 300);
  }

  onChangeText(text) {
    this.props.bookmarkStore.filter(text);
    console.log(`search: ${text}`);
  }

  render() {
    return (
      <View style={ styles.panel }>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={this.onChangeText}
        />

        <ListView
          dataSource={ this.props.bookmarkStore.dataSource }
          renderRow={ this.renderRow }
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          enableEmptySections={ true }
          style={styles.listView}
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
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 15,
    paddingLeft: 30,
    paddingRight: 30,
  },
  rowText: {
    // color: 'white',
  },

  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },

  bizRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#ecf0f1',
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 15,
  },
  bizRowLeft: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  bizName: {
     fontSize: 18,
     fontWeight: 'bold',
  },
  bizRating: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bizLocation: {

  },
  bizCategories: {
    fontSize: 10,
    color: 'gray'
  },

});
