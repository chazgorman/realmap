import DynamicMap from '../src/components/map';
import Navbar from '../src/components/navbar'
import FootNavbar from '../src/components/footnavbar'
import Card from '../src/components/card'

export default class MainIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {mapMarkers: []};

    this.getMapMarkers = this.getMapMarkers.bind(this);
    this.setMapMarkers = this.setMapMarkers.bind(this);
  }
  getMapMarkers(map){
    var searchUrl = encodeURI("http://localhost:3002/near?lon=-2&lat=45&radius=400000");

    fetch(searchUrl, {
      method: 'GET',
      mode: 'cors',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(map.setMapMarkers);
  }
  setMapMarkers(markers){
    return this.state.mapMarkers;
  }
  render() {
    this.map = (<DynamicMap getMapMarkers={this.getMapMarkers}/>);
    return (
      <div>
        <Navbar />
        <div className="columns is-gapless" style={{ width: '100%', height: '100%' }}>
          <div class="column" style={{ width: '100%', height: '100%' }}>
            <Card />
          </div>
          <div className="column">
            <div id="map" style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
        <FootNavbar />
        {this.map}
      </div>
    );
  }
}

