import React from 'react';
import PropTypes from "prop-types"
import getMap from './getEsriMap';

export default class MapPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.map = getMap();

  }
  setMapMarkers(markers){

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
