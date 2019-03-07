import { loadModules } from 'esri-loader';
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

class AgolFeatureLayer {
  constructor(name, url, map) {
    this.name = name;
    this.url = url;
    this.map = map;
  }
  loadLayer() {
    let thisLayer = this;
    const options = {
      url: 'https://js.arcgis.com/3.23/',
    };
    loadModules(['esri/layers/FeatureLayer'], options)
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