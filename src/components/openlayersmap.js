import React from 'react';
import PropTypes from "prop-types";

//import 'ol/ol.css';
//import Map from 'ol';
// import Map from 'ol/Map';
// import View from 'ol/View'
// import TileLayer from 'ol/layer/Tile';;
// import OSM from 'ol/source/OSM';

import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "http://gql.procyclingmap.net/v1alpha1/graphql"
});

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import createApolloFetch from 'apollo-boost'
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
  first: 10
}

class OpenLayersMap extends React.Component {
  constructor(props) {
    super(props);

    this.featuresSet = false;

    //this.updateMapMarkers = this.props.updateMapMarkers.bind(this);
    this.setMapMarkers = this.setMapMarkers.bind(this);
    this.addGraphics = this.addGraphics.bind(this);
    this.extentChanged = this.extentChanged.bind(this);
  }
  componentDidMount() {
    var map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([37.41, 8.82]),
        zoom: 4
      })
    });
  }
  extentChanged(evt){
    // if(this.featuresSet){
    //   return;
    // }
    // var map = this;

    // client
    // .query({
    //   query: allMsgsQuery
    // })
    // .then(result => map.setMapMarkers(result.data));

    // var extent = evt.extent;
    // var zoomed = evt.levelChange;
    // var theMap = this.map;
    // var theComp = this;

    // this.featuresSet = true;

    // const options = {
    //   url: 'https://js.arcgis.com/3.23/',
    // };
    // loadModules(['esri/tasks/query'], options)
    // .then(([Query]) => {
    //     var query = new Query();
    //     query.geometry = evt.extent;
    //     query.outFields = ["*"];

    //     var layer = theMap.getLayer("twitter");
    //     layer.queryFeatures(query, function(featureSet){
    //       theComp.props.updateMapMarkers(featureSet.features);
    //     })
    // });


  }
  setMapMarkers(markers){
    console.log("In map setMapMarkers", markers, this.mapNode);
    // const options = {
    //   url: 'https://js.arcgis.com/3.23/',
    // };
    // loadModules(['esri/geometry/Point','esri/symbols/SimpleMarkerSymbol', 'esri/graphic', 'esri/SpatialReference'], options)
    // .then(([Point, SimpleMarkerSymbol, Graphic, SpatialReference]) => {
    //   // create map with the given options at a DOM node w/ id 'mapNode'
    //   var markerSymbol = new SimpleMarkerSymbol();
    //   markerSymbol.setPath("M26.054,24.577c6.045-12.766,21.3-18.225,34.067-12.176c12.773,6.042,18.225,21.296,12.183,34.066L49.181,95.325  L26.054,46.468C22.776,39.541,22.776,31.508,26.054,24.577z M44.308,41.853c0-3.021-2.447-5.467-5.471-5.467  c-3.017,0-5.472,2.447-5.472,5.467c0,3.021,2.456,5.468,5.472,5.468C41.861,47.32,44.308,44.874,44.308,41.853L44.308,41.853z   M45.569,41.853c0-3.721-3.012-6.737-6.732-6.737c-3.717,0-6.733,3.016-6.733,6.737c0,3.717,3.017,6.733,6.733,6.733  C42.557,48.586,45.569,45.57,45.569,41.853L45.569,41.853z M64.002,41.853c0-3.021-2.451-5.467-5.473-5.467  c-3.016,0-5.467,2.447-5.467,5.467c0,3.021,2.451,5.468,5.467,5.468C61.551,47.32,64.002,44.874,64.002,41.853L64.002,41.853z   M65.263,41.853c0-3.721-3.012-6.737-6.733-6.737c-3.717,0-6.732,3.016-6.732,6.737c0,3.717,3.016,6.733,6.732,6.733  C62.251,48.586,65.263,45.57,65.263,41.853L65.263,41.853z M59.326,24.582c0-1.414-1.146-2.557-2.56-2.557  c-1.409,0-2.552,1.144-2.552,2.557c0,1.413,1.143,2.556,2.552,2.556C58.18,27.137,59.326,25.995,59.326,24.582L59.326,24.582z   M46.645,29.222c0-0.347,0.283-0.629,0.633-0.629h3.375c0.262,0,0.499,0.165,0.592,0.414l1.189,3.202  c0.494,1.333,1.764,2.215,3.186,2.215l3.383,0.004h1.801l0.005-1.806c0-0.995-0.806-1.801-1.806-1.805h-2.797  c-0.266,0-0.502-0.165-0.591-0.41l-1.188-3.206c-0.499-1.333-1.77-2.215-3.19-2.215h-5.1c-1.874,0-3.4,1.519-3.4,3.396  c0,0.342,0.054,0.684,0.155,1.004l4.498,14.525h3.78l-4.493-14.5C46.654,29.349,46.645,29.285,46.645,29.222z")
    //   markerSymbol.setColor("#3273dc");
    //   markerSymbol.setSize(30);
      
    //   var sr = new SpatialReference(4326);

    //   var graphics = markers.messages.map(m => {
    //     var p = new Point(m.location.coordinates[0], m.location.coordinates[1]);
    //     var g = new Graphic(p,markerSymbol);
    //     g.setAttributes(m);
    //     return g;
    //   });
    //   return graphics;
    // })
    // .then(this.addGraphics)
    // .catch(err => {
    //   // handle any script or module loading errors
    //   console.error(err);
    // });
  }
  addGraphics(graphics){
    // var theMap = this.map;
    // console.log(graphics);
    // var markerLayer = theMap.getLayer('markers')

    // graphics.map(g => {
    //   markerLayer.add(g);
    // });
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

OpenLayersMap.propTypes = {
  getMapMarkers: PropTypes.func,
  updateMapMarkers: PropTypes.func
};

export default OpenLayersMap;