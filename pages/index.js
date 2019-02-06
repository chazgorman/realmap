import DynamicMap from '../src/components/map';
import Navbar from '../src/components/navbar'
import FootNavbar from '../src/components/footnavbar'
import Card from '../src/components/card'
import Media from '../src/components/media'

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
        {/* <section className="hero is-fullheight-with-navbar"> */}
          <div className="columns is-gapless is-desktop" style={{ width: '100%', height: '100%' }}>
                <div class="column" style={{ height: '100vh', padding:'0' }}>
                  <div style={{ height: '100vh', overflow:'auto' }}>
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                  </div>
                </div>
                <div className="column is-two-thirds">
                  <div className="center" id="map" style={{ width: '100%', height: '100vh' }} />
                </div>
          </div>
        {/* </section>    */}
        <FootNavbar />
        {this.map}
      </div>   
    );
  }
}

