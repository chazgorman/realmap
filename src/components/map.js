import React from 'react';
import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
//import { loadModules } from 'esri-loader';
//import AgolFeatureLyr from './AgolFeatureLayer'
//import GraphqlLyr from './GraphqlFeatureLayer'
import { useQuery, gql } from '@apollo/client';
//loadModules(['esri/Map','esri/views/SceneView', 'esri/widgets/BasemapToggle', 'esri/widgets/Popup'])

//import SceneView from '@arcgis/core/views/SceneView';
//import BasemapToggle from '@arcgis/core/widgets/BasemapToggle';

import config from '@arcgis/core/config.js';

// Assets have been moved from the default location
config.assetsPath = '/public/assets';

import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import ArcGISMap from "@arcgis/core/Map";
import DictionaryRenderer from "@arcgis/core/renderers/DictionaryRenderer";
import MapView from "@arcgis/core/views/MapView";

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

    //this.featuresSet = false;

    //this.extentChanged = this.extentChanged.bind(this);
    //this.viewImmediateClick = this.viewImmediateClick.bind(this);
  }
  // componentDidMount() {
  //   var thisMap = this;
  //   // first, we use Dojo's loader to require the map class
  //       var map = new Map({
  //         basemap: "hybrid",
  //         ground: "world-elevation"
  //       });

  //       var view = new SceneView({
  //         container: "map",  // Reference to the DOM node that will contain the view
  //         map: map,  // References the map object created in step 3
  //       });

  //       var toggle = new BasemapToggle({
  //         view: view,
  //         nextBasemap: "topo"
  //       });

  //       view.ui.add(toggle, "top-right");

  //       //thisMap.popup = view.popup;

  //       // view.when(function(){
  //       //   thisMap.popup.open({
  //       //     title: "Current Location",
  //       //     content: "Your Mom's House"
  //       //   });
  //       //   thisMap.popup.set("dockOptions",{
  //       //     position: "top-right"
  //       //   });
  //       // });

  //       //let graphqlLayer = new GraphqlLyr("graphql", "", view, allMsgsQuery, thisMap.props.getMapMarkers, thisMap.props.client);
  //       //graphqlLayer.loadLayer();

  //       //return view;
  //       this.map = map;
        
  //       this.mapExtentChange = map.on("extent-change", this.extentChanged.bind(this));

  //       map.on("immediate-click", thisMap.viewImmediateClick);
  //       //this.props.getMapMarkers(this);
  // }
  extentChanged(evt) {

  }
  // viewImmediateClick(evt){
  //   console.log("In viewImmediateClick");
  //   var thisMap = this;
  //   this.map.hitTest(evt).then(function(response) {
  //     // check if a feature is returned from the hurricanesLayer
  //     // do something with the result graphic
  //     console.log(response.results);

  //     if(response.results[0].graphic != undefined){
  //       let activeMsgId = response.results[0].graphic.attributes.message_id;
  //       console.log("Active Message: ", activeMsgId);

  //       //this.props.client.writeData({ data: { activeMessage: activeMsgId } });
  //     }
  //   });
  // }
  render(){
    const mapDiv = useRef(null);

    useEffect(() => {
      if (mapDiv.current) {
        /**
         * Initialize application
         */
        const map = new ArcGISMap({
          basemap: "gray-vector",
        });
  
        const view = new MapView({
          map,
          container: mapDiv.current,
          extent: {
            spatialReference: {
              wkid: 102100,
            },
            xmax: -13581772,
            xmin: -13584170,
            ymax: 4436367,
            ymin: 4435053,
          },
        });
  
        const popupTemplate = {
          // autocasts as new PopupTemplate()
          title: "station: {Station_Name}",
          content: [
            {
              // It is also possible to set the fieldInfos outside of the content
              // directly in the popupTemplate. If no fieldInfos is specifically set
              // in the content, it defaults to whatever may be set within the popupTemplate.
              type: "fields",
              fieldInfos: [
                {
                  fieldName: "Fuel_Type_Code",
                  label: "Fuel type",
                },
                {
                  fieldName: "EV_Network",
                  label: "EV network",
                },
                {
                  fieldName: "EV_Connector_Types",
                  label: "EV connection types",
                },
                {
                  fieldName: "Station_Name",
                  label: "Station Name",
                },
              ],
            },
          ],
        };
  
        const scale = 36112;
        const layer1 = new FeatureLayer({
          url:
            "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Alternative_Fuel_Station_March2018/FeatureServer",
          outFields: ["*"],
          popupTemplate,
          renderer: new DictionaryRenderer({
            url:
              "https://jsapi.maps.arcgis.com/sharing/rest/content/items/30cfbf36efd64ccf92136201d9e852af",
            fieldMap: {
              fuel_type: "Fuel_Type_Code",
            },
            config: {
              show_label: "false",
            },
            visualVariables: [
              {
                type: "size",
                valueExpression: "$view.scale",
                stops: [
                  { value: scale / 2, size: 20 },
                  { value: scale * 2, size: 15 },
                  { value: scale * 4, size: 10 },
                  { value: scale * 8, size: 5 },
                  { value: scale * 16, size: 2 },
                  { value: scale * 32, size: 1 },
                ],
              },
            ],
          }),
          minScale: 0,
          maxScale: 10000,
        });
  
        const layer2 = new FeatureLayer({
          url:
            "https://services1.arcgis.com/4yjifSiIG17X0gW4/arcgis/rest/services/Alternative_Fuel_Station_March2018/FeatureServer",
          outFields: ["*"],
          popupTemplate,
          renderer: new DictionaryRenderer({
            url:
              "https://jsapi.maps.arcgis.com/sharing/rest/content/items/30cfbf36efd64ccf92136201d9e852af",
            fieldMap: {
              fuel_type: "Fuel_Type_Code",
              connector_types: "EV_Connector_Types",
              network: "EV_Network",
              name  : "Station_Name",
            },
            config: {
              show_label: "true",
            },
          }),
          minScale: 10000,
          maxScale: 0,
        });
  
        map.addMany([layer1, layer2]);
      }
    }, []);
  
    return <div className="mapDiv" ref={mapDiv}></div>;
  }  // render() {
  //   console.log("EsriMap: ", this);

  //   return (
  //     <div
  //       ref={c => {
  //         this.mapNode = c;
  //       }}
  //     />
  //   )
  // }
}

EsriMap.propTypes = {
  getMapMarkers: PropTypes.func,
  updateMapMarkers: PropTypes.func
};

export default EsriMap;