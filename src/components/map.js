import React from 'react';
import PropTypes from "prop-types"

import { loadModules } from 'esri-loader';
//import AgolFeatureLyr from './AgolFeatureLayer'
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
    // first, we use Dojo's loader to require the map class
    loadModules(['esri/Map','esri/views/SceneView', 'esri/widgets/BasemapToggle', 'esri/widgets/Popup'])
      .then(([Map, SceneView, BasemapToggle]) => {

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

        var lyr = GraphqlLyr(this.props.points);
        lyr.then((layer) => view.map.layers.add(layer));

        return map;
      }).then(map => {        

      })
      .catch(err => {
        // handle any errors
        console.error(err);
      });
  }
  zoomTo() {
    // console.log("In zoomTo", this.props.geometry);
    // var card = this;
    // var geom = this.props.geometry;
    // var map = this.props.map;
    // this.setState({ zooming: true });

    // var options = {
    //     target: geom,
    //     zoom: 12,
    //     tilt: 45        
    // };
    // this.map.goTo(options).then(function (result) {
    //     card.setState({ zooming: false });
    // })
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
  datapoints: PropTypes.object
};

export default EsriMap;