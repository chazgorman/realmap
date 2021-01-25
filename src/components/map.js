import React from 'react';
import PropTypes from "prop-types"

import { loadModules } from 'esri-loader';
import AgolFeatureLyr from './AgolFeatureLayer'
import GraphqlLyr from './GraphqlFeatureLayer'

import gql from 'graphql-tag'

export const allMsgsQuery = gql`
{
      geomessages_last_14_days(limit: 100) {
        harvest_id
        contributor_screen_name
        contributor_name
        https_contributor_profile_pic
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

  }
  componentDidMount() {
    var thisMap = this;
    // first, we use Dojo's loader to require the map class
    loadModules(['esri/Map','esri/views/SceneView', 'esri/widgets/BasemapToggle', 'esri/widgets/Popup'])
      .then(([Map, SceneView, BasemapToggle, Popup]) => {

        var map = new Map({
          basemap: "hybrid",
          ground: "world-elevation"
        });

        var view = new SceneView({
          container: "map",  // Reference to the DOM node that will contain the view
          map: map,  // References the map object created in step 3
        });

        var toggle = new BasemapToggle({
          view: view,
          nextBasemap: "topo"
        });

        view.ui.add(toggle, "top-right");

        //let graphqlLayer = new GraphqlLyr("graphql", "", view, allMsgsQuery, thisMap.props.getMapMarkers, thisMap.props.client);
        //graphqlLayer.loadLayer();

        return view;
      }).then(map => {
        this.map = map;
        
        // this.mapExtentChange = map.on("extent-change", this.extentChanged.bind(this));

        // map.on("immediate-click", thisMap.viewImmediateClick);
        // //this.props.getMapMarkers(this);
      })
      .catch(err => {
        // handle any errors
        console.error(err);
      });
  }
  render() {
    console.log("EsriMap: ", this);

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

export default EsriMap;