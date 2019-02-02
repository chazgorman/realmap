let map;

export default function getMap() {
    if (!map) {
        map = require('./createEsriMap').default();
    }

    return map;
}