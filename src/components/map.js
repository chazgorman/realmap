import React from 'react';
import PropTypes from "prop-types"
import { loadModules } from 'esri-loader';

class EsriMap extends React.Component {
  constructor(props) {
    super(props);

    this.setMapMarkers = this.setMapMarkers.bind(this);
    this.addGraphics = this.addGraphics.bind(this);
  }
  componentDidMount() {
    console.log(this);
    const options = {
      url: 'https://js.arcgis.com/3.23/',
    };
    loadModules(['esri/map','esri/layers/FeatureLayer','esri/dijit/PopupTemplate'], options)
      .then(([Map, FeatureLayer, PopupTemplate]) => {
        // create map with the given options at a DOM node w/ id 'mapNode'
        const map = new Map('map', {
          center: [0, 34.5],
          zoom: 8,
          basemap: 'streets',
        });
        
        //create a feature collection for the flickr photos
        var featureCollection = {
          "layerDefinition": null,
          "featureSet": {
            "features": [],
            "geometryType": "esriGeometryPoint"
          }
        };
        featureCollection.layerDefinition = {
          "geometryType": "esriGeometryPoint",
          "objectIdField": "ObjectID",
          "drawingInfo": {
            "renderer": {
              "type": "simple",
              "symbol": {
                "type": "esriPMS",
                "url": "images/flickr.png",
                "contentType": "image/png",
                "width": 15,
                "height": 15
              }
            }
          },
          "fields": [{
            "name": "ObjectID",
            "alias": "ObjectID",
            "type": "esriFieldTypeOID"
          }, {
            "name": "display_text",
            "alias": "display_text",
            "type": "esriFieldTypeString"
          }, {
            "name": "user_name",
            "alias": "user_name",
            "type": "esriFieldTypeString"
          }]
        };

        //define a popup template
        var popupTemplate = new PopupTemplate({
          title: "{user_name}",
          description: "{display_text}"
        });

        //create a feature layer based on the feature collection
        var featureLayer = new FeatureLayer(featureCollection, {
          id: 'markers',
          infoTemplate: popupTemplate
        });

        //associate the features with the popup on click
        featureLayer.on("click", function(evt) {
          map.infoWindow.setFeatures([evt.graphic]);
        });

        map.addLayers([featureLayer]);

        return map;
      }).then(map => {
        this.map = map;
        this.props.getMapMarkers(this);
      })
      .catch(err => {
        // handle any script or module loading errors
        console.error(err);
      });

  }
  setMapMarkers(markers){
    var theMap = this.map;

    console.log("In map setMapMarkers", markers, this.mapNode);
    const options = {
      url: 'https://js.arcgis.com/3.23/',
    };
    loadModules(['esri/geometry/Point','esri/symbols/SimpleMarkerSymbol', 'esri/graphic'], options)
    .then(([Point, SimpleMarkerSymbol, Graphic]) => {
      // create map with the given options at a DOM node w/ id 'mapNode'
      var markerSymbol = new SimpleMarkerSymbol();
      markerSymbol.setPath("M16,4.938c-7.732,0-14,4.701-14,10.5c0,1.981,0.741,3.833,2.016,5.414L2,25.272l5.613-1.44c2.339,1.316,5.237,2.106,8.387,2.106c7.732,0,14-4.701,14-10.5S23.732,4.938,16,4.938zM16.868,21.375h-1.969v-1.889h1.969V21.375zM16.772,18.094h-1.777l-0.176-8.083h2.113L16.772,18.094z");
      //markerSymbol.setColor(new Color("#00FFFF"));

      var graphics = markers.features.map(m => {
        var p = new Point(m.lon, m.lat);
        var g = new Graphic(p,markerSymbol);
        g.setAttributes(m);
        return g;
      });
      return graphics;
    })
    .then(this.addGraphics)
    .catch(err => {
      // handle any script or module loading errors
      console.error(err);
    });
  }
  addGraphics(graphics){
    var theMap = this.map;
    console.log(graphics);
    var markerLayer = theMap.getLayer('markers')

    graphics.map(g => {
      markerLayer.add(g);
    });
  }
  render() {
    return (
      <div
        ref={c => {
          this.mapNode = c;
        }}
      />
    );
  }
}

EsriMap.propTypes = {
  getMapMarkers: PropTypes.func
};

export default EsriMap;