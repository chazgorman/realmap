import React from 'react';
import getMap from './getMap';
const { marker } = require('leaflet');

export default class MapPage extends React.Component {
  componentDidMount() {
    this.map = getMap();
    //this.map.flyTo([0, 0], 3);
    //setMapMarkers();
    marker([50.5, 30.5]).addTo(this.map);

  }
  setMapMarkers(markers){
    console.log("In map setMapMarkers", markers);
    marker([50.5, 30.5]).addTo(this.map);
  }
  render() {
    return (
      <div />
    );
  }
}
