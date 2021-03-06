import { loadModules } from 'esri-loader';

export const messagesQueryVars = {
  skip: 0,
  first: 10
}

class AgolFeatureLayer {
  constructor(name, url, map) {
    this.name = name;
    this.url = url;
    this.map = map;
  }
  loadLayer() {
    let thisLayer = this;
    loadModules(['esri/layers/FeatureLayer'])
      .then(([FeatureLayer]) => {

        var flayer = new FeatureLayer(thisLayer.url,{
          id: thisLayer.name,
          mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
          outFields: ["*"]
        });

        thisLayer.map.addLayers([flayer]);

        return flayer;
      }).then(layer => {
        this.layer = layer;
      })
      .catch(err => {
        // handle any script or module loading errors
        console.error(err);
      });

  }
}

export default AgolFeatureLayer;