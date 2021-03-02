import React from 'react';
import { activeMap } from '../appstate/cache'

export default function MapController({map}){
  var mapViews = activeMap();

  if(mapViews !== undefined && mapViews.length > 0){
    mapViews.forEach(mapView => {
      if(mapView != undefined && mapView.zoomTo != undefined){
        mapView.zoomTo();
      }
    })
  }

  return <div></div>
}