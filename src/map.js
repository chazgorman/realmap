import React from 'react';
import getMap from './getMap';


export default class MapPage extends React.Component {
  componentDidMount() {
    this.map = getMap();
    this.map.flyTo([0, 0], 8);
  }
  render() {
    return (
      <div />
    );
  }
}
