import React from 'react';
import PropTypes from "prop-types"
import { withApollo } from 'react-apollo';

import { loadModules } from 'esri-loader';
import AgolFeatureLyr from './AgolFeatureLayer'
import GraphqlLyr from './GraphqlFeatureLayer'

import gql from 'graphql-tag'

export const allMsgsQuery = gql`
{
      messages {
        harvest_id
        contributor_screen_name
        contributor_name
        message
        message_id
        time
        like_count
        twitter_favorite_count
        twitter_favorite_count
        network
        location
    }
  }
`
export const messagesQueryVars = {
  skip: 0,
  first: 50
}

class EsriModalMap extends React.Component {
  constructor(props) {
    super(props);

    this.featuresSet = false;

    this.zoomTo = this.zoomTo.bind(this);
    //this.extentChanged = this.extentChanged.bind(this);    
  }
  componentDidMount() {
    console.log("In modalmap componentDidMount");

    var thisMap = this;
    loadModules(['esri/Map', 'esri/views/SceneView', 'esri/symbols/SimpleMarkerSymbol', 'esri/Graphic'])
      .then(([Map, SceneView, SimpleMarkerSymbol, Graphic]) => {

        var map = new Map({
          basemap: "topo",
          ground: "world-elevation"
        });

        var view = new SceneView({
          container: thisMap.props.containerId,  // Reference to the DOM node that will contain the view
          map: map  // References the map object created in step 3
        });

        var markerSymbolProps = {
          path: "M26.054,24.577c6.045-12.766,21.3-18.225,34.067-12.176c12.773,6.042,18.225,21.296,12.183,34.066L49.181,95.325  L26.054,46.468C22.776,39.541,22.776,31.508,26.054,24.577z M44.308,41.853c0-3.021-2.447-5.467-5.471-5.467  c-3.017,0-5.472,2.447-5.472,5.467c0,3.021,2.456,5.468,5.472,5.468C41.861,47.32,44.308,44.874,44.308,41.853L44.308,41.853z   M45.569,41.853c0-3.721-3.012-6.737-6.732-6.737c-3.717,0-6.733,3.016-6.733,6.737c0,3.717,3.017,6.733,6.733,6.733  C42.557,48.586,45.569,45.57,45.569,41.853L45.569,41.853z M64.002,41.853c0-3.021-2.451-5.467-5.473-5.467  c-3.016,0-5.467,2.447-5.467,5.467c0,3.021,2.451,5.468,5.467,5.468C61.551,47.32,64.002,44.874,64.002,41.853L64.002,41.853z   M65.263,41.853c0-3.721-3.012-6.737-6.733-6.737c-3.717,0-6.732,3.016-6.732,6.737c0,3.717,3.016,6.733,6.732,6.733  C62.251,48.586,65.263,45.57,65.263,41.853L65.263,41.853z M59.326,24.582c0-1.414-1.146-2.557-2.56-2.557  c-1.409,0-2.552,1.144-2.552,2.557c0,1.413,1.143,2.556,2.552,2.556C58.18,27.137,59.326,25.995,59.326,24.582L59.326,24.582z   M46.645,29.222c0-0.347,0.283-0.629,0.633-0.629h3.375c0.262,0,0.499,0.165,0.592,0.414l1.189,3.202  c0.494,1.333,1.764,2.215,3.186,2.215l3.383,0.004h1.801l0.005-1.806c0-0.995-0.806-1.801-1.806-1.805h-2.797  c-0.266,0-0.502-0.165-0.591-0.41l-1.188-3.206c-0.499-1.333-1.77-2.215-3.19-2.215h-5.1c-1.874,0-3.4,1.519-3.4,3.396  c0,0.342,0.054,0.684,0.155,1.004l4.498,14.525h3.78l-4.493-14.5C46.654,29.349,46.645,29.285,46.645,29.222z",
          color: "#3273dc",
          size: 10
        };
        var markerSymbol = new SimpleMarkerSymbol(markerSymbolProps);

        var graphicProps = {
          geometry: thisMap.props.geometry,
          symbol: markerSymbol
        }
        var g = new Graphic(graphicProps);
        view.graphics.add(g);

        return view;
      }).then(map => {
        thisMap.map = map;
        thisMap.zoomTo();
      })
      .catch(err => {
        // handle any script or module loading errors
        console.error(err);
      });
  }
  zoomTo() {
    console.log("In modalmap zoomTo", this.props.geometry);
    var geom = this.props.geometry;
    var map = this.map;

    var options = {
      target: geom,
      zoom: 14,
      tilt: 45
    };
    map.goTo(options);
  }
  render() {
    return (
      <div
        ref={c => {
          this.mapNode = c;
        }}
      />
    )
  }
}

EsriModalMap.propTypes = {
  containerId: PropTypes.string,
  geometry: PropTypes.object
};

export default EsriModalMap;