import DynamicMap from '../src/components/map';
import Navbar from '../src/components/navbar'
import FootNavbar from '../src/components/footnavbar'
import Card from '../src/components/card'
import Media from '../src/components/media'

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export const allAppsQuery = gql`
{
  app {
    id
    name
  }
}
`

// export const allAppsQuery = gql`
//   query allApps {
//     app {
//       id
//       name
//     }
//   }
// `

export const allAppsQueryVars = {
  skip: 0,
  first: 10
}

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
    this.setState({mapMarkers: markers})
  }
  render() {
    var i = 0;
    var usernames = {};

    this.map = (<DynamicMap getMapMarkers={this.getMapMarkers} updateMapMarkers={this.setMapMarkers}/>);
    const cards = this.state.mapMarkers.map(markerInfo => {
      var atts = markerInfo.attributes;
      if(atts.user_name in usernames){
        return;
      }
      usernames[atts.user_name] = true;

      return (
        <Media key={i++} text={atts.display_text} profilePic={atts.icon} fullname={atts.display_name} 
          username={atts.user_name} geometry={markerInfo} mediaId={atts.place_id} mediaLink={atts.media}/>
      )
    });

    return (
      <div>
        <Navbar />
        {/* <section className="hero is-fullheight-with-navbar"> */}
          <div className="columns is-gapless is-desktop" style={{ width: '100%', height: '100%' }}>
                <div className="column" style={{ height: '100vh', padding:'0' }}>
                  <div style={{ height: '100vh', overflow:'auto' }}>
                    {cards}
                  </div>
                </div>
                <div className="column is-two-thirds is-hidden-mobile">
                  <div id="map" style={{ width: '100%', height: '100vh' }} />
                </div>
          </div>
        {/* </section>    */}
        <FootNavbar />
        {this.map}
      </div>  
    )
}}
