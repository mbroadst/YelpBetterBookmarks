import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  PropTypes,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Drawer from 'react-native-drawer';
import FilterView from './components/filter-view';
import Button from './components/button';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [
        {
          title: 'testing',
          description: 'a test description',
          coordinate: { latitude: LATITUDE, longitude: LONGITUDE }
        }
      ]
    };

    // bind callbacks to `this`
    this.onRegionChange = this.onRegionChange.bind(this);
  }

  openDrawer(){
    this.drawer.open()
  }

  render() {
    const filterView =
      <FilterView
        closeDrawer={ () => this.drawer.close() }
      />

    return (
      <Drawer
        type='overlay'
        ref={ (ref) => this.drawer = ref }
        content={ filterView }
        tapToClose={ true }
        openDrawerOffset={ 0.2 } // 20% gap on the right side of drawer
        panCloseMask={ 0.2 }
        closedDrawerOffset={ -3 }
        styles={ drawerStyles }
        tweenHandler={ (ratio) => ({
          main: { opacity: (2 - ratio) / 2 }
        }) }
      >
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={this.state.region}
            onRegionChange={this.onRegionChange}
          >
            {this.state.markers.map((marker, idx) => (
              <MapView.Marker
                key={idx}
                coordinate={marker.coordinate}
                title={marker.title}
                description={marker.description}
              />
            ))}
          </MapView>

          <Button
            onPress={ () => this.openDrawer() }
            text="Open Drawer"
          />
        </View>
      </Drawer>
    );
  }

  onRegionChange(region) {
    this.setState({ region });
  }
}

App.propTypes = {
  provider: MapView.ProviderPropType
};

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: { paddingLeft: 3 },
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  }
});
