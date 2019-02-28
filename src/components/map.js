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
  first: 10
}

class EsriMap extends React.Component {
  constructor(props) {
    super(props);

    this.featuresSet = false;

    this.extentChanged = this.extentChanged.bind(this);    
  }
  componentDidMount() {
    var thisMap = this;
    const options = {
      url: 'https://js.arcgis.com/3.23/',
    };
    loadModules(['esri/map','esri/config'], options)
      .then(([Map, esriConfig]) => {
        esriConfig.defaults.map.panDuration = 1000; // time in milliseconds, default panDuration: 350
        esriConfig.defaults.map.panRate = 25; // default panRate: 25
        esriConfig.defaults.map.zoomDuration = 1000; // default zoomDuration: 500
        esriConfig.defaults.map.zoomRate = 25; // default zoomRate: 25

        // create map with the given options at a DOM node w/ id 'mapNode'
        const map = new Map('map', {
          center: [0, 34.5],
          zoom: 2,
          basemap: 'streets',
        });

        // let twitterUrl = "https://services9.arcgis.com/T1Rjzl3QPzLYGXGl/arcgis/rest/services/Twitter_View/FeatureServer/0";
        // let pcmlayer = new AgolFeatureLyr("twitter", twitterUrl, map);
        // pcmlayer.loadLayer();        
        
        let graphqlLayer = new GraphqlLyr("graphql", "", map, thisMap.props.getMapMarkers, thisMap.props.client);
        graphqlLayer.loadLayer();

        return map;
      }).then(map => {
        this.map = map;
        this.mapExtentChange = map.on("extent-change", this.extentChanged.bind(this));
        //this.props.getMapMarkers(this);
      })
      .catch(err => {
        // handle any script or module loading errors
        console.error(err);
      });

  }
  extentChanged(evt){

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

EsriMap.propTypes = {
  getMapMarkers: PropTypes.func,
  updateMapMarkers: PropTypes.func
};

export default withApollo(EsriMap);