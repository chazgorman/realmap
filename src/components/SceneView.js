import React from 'react';
import { render } from 'react-dom';
import { SceneView, Scene, Webscene } from 'react-sceneview';



class SceneViewMap extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<SceneView id="sceneview">
            <Scene basemap='satellite'>

            </Scene>
        </SceneView>);
    }
}

export default SceneViewMap;