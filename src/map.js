import React from 'react';
import PropTypes from "prop-types"
import getMap from './getMap';
const { marker } = require('leaflet');

export default class MapPage extends React.Component {
  constructor(props) {
    super(props);

    this.setMapMarkers = this.setMapMarkers.bind(this);

    this.popupIsOpen = false;
  }

  componentDidMount() {
    this.map = getMap();
    //this.map.flyTo([0, 0], 3);

    this.props.getMapMarkers(this);
    console.log("map componentDidMount(): markers:");
  }
  setMapMarkers(markers){
    console.log("In map setMapMarkers", markers);

    markers.features.map(m => marker([m.lon,m.lat]).addTo(this.map));
  }
  render() {
    return (
      <div />
    );
  }
}

MapPage.propTypes = {
  getMapMarkers: PropTypes.func
};
