import { loadCss, loadModules } from 'esri-loader';
loadCss('https://js.arcgis.com/4.10/esri/css/main.css')

export default function createMap() {
    // first, we use Dojo's loader to require the map class
    loadModules(['esri/views/MapView'])
    .then(([MapView]) => {
        // then we load a web map from an id
        // and we show that map in a container w/ id #viewDiv
        var view = new MapView({
            map: new Map({
                basemap: basemap || 'streets'
            }),
            container: 'map'
        });
    })
    .catch(err => {
        // handle any errors
        console.error(err);
    });
}

