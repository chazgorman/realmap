import React from 'react';
import PropTypes from "prop-types"
import { loadModules } from 'esri-loader';
//import AgolFeatureLyr from './AgolFeatureLayer'
import GraphqlLyr from './GraphqlFeatureLayer'
import { gql } from '@apollo/client';
import { activeMessageIdVar, activeMap } from '../appstate/cache'

class MapView2D extends React.Component {
  constructor(props) {
    super(props);
    this.zoomTo = this.zoomTo.bind(this);
  }
  componentDidMount() {
    var thisMap = this;

    // first, we use Dojo's loader to require the map class
    loadModules(['esri/Map','esri/views/MapView', 'esri/widgets/BasemapToggle', 'esri/widgets/Popup'])
      .then(([Map, MapView, BasemapToggle]) => {

        var map = new Map({
          basemap: "hybrid",
          ground: "world-elevation"
        });

        var view = new MapView({
          container: "map2d",  // Reference to the DOM node that will contain the view
          map: map,  // References the map object created in step 3
          zoom: 2
        });

        var toggle = new BasemapToggle({
          view: view,
          nextBasemap: "topo"
        });

        view.ui.add(toggle, "top-right");

        view.on("click", function(event) {
          view.hitTest(event).then(function(response) {
            // check if a feature is returned from the hurricanesLayer
            if (response.results.length) {
              const graphic = response.results[0].graphic;
              // do something with the graphic
              console.log(graphic.attributes.message_id);
              activeMessageIdVar([graphic.attributes.message_id]);
            }
          });
        });

        var lyr = GraphqlLyr(this.props.points);
        lyr.then((layer) => view.map.layers.add(layer));

        thisMap.map = view;

        var activeMaps = activeMap();
        activeMap([...activeMaps, thisMap]);

        return map;

      }).then(map => {        
        thisMap.zoomTo();
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
      if(this.props.points !== undefined && this.props.points.messages != undefined){
        const findByMsgId = (element) => element.message_id == activeMessages[0];

        var msgIdIndex = this.props.points.messages.findIndex(findByMsgId);
        var message = this.props.points.messages[msgIdIndex];
        
        if(message !== undefined && message.location !== undefined){
            var options = {
              center: message.location.coordinates,
              zoom: 11,
              tilt: 12        
            };
            this.map.goTo(options);
        }
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

MapView2D.propTypes = {
  datapoints: PropTypes.object
};

export default MapView2D;