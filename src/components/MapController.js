import React from 'react';
import { activeMessageIdVar, activeMap } from '../appstate/cache'

export default function MapController({map}){
  var mapView = activeMap();

  if(mapView != undefined && mapView.zoomTo != undefined){
    mapView.zoomTo();
  }
  return <div>|</div>
}