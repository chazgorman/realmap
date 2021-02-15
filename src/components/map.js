import React from 'react';
import PropTypes from "prop-types"
import { loadModules } from 'esri-loader';
//import AgolFeatureLyr from './AgolFeatureLayer'
import GraphqlLyr from './GraphqlFeatureLayer'
import { gql } from '@apollo/client';
import { activeMessageIdVar, activeMap } from '../appstate/cache'

class EsriMap extends React.Component {
  constructor(props) {
    super(props);
    this.zoomTo = this.zoomTo.bind(this);
  }
  componentDidMount() {
    var thisMap = this;

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

        thisMap.map = view;

        activeMap(thisMap);

        return map;

      }).then(map => {        

      })
      .catch(err => {
        // handle any errors
        console.error(err);
      });
  }
  zoomTo() {
    console.log("In zoomTo");

    const activeMessages = activeMessageIdVar();

    if(activeMessages !== undefined && activeMessages.length > 0){
      var activeMsg = undefined;

  
      if(this.props.points !== undefined && this.props.points.messages != undefined){
        const findByMsgId = (element) => element.message_id == activeMessages[0];

        var msgIdIndex = this.props.points.messages.findIndex(findByMsgId);
        var message = this.props.points.messages[msgIdIndex];
        
        var options = {
            center: message.location.coordinates,
            zoom: 12,
            tilt: 45        
        };
        this.map.goTo(options);
      }
    }
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