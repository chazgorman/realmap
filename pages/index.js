import DynamicMap from '../src/components/map';
import Navbar from '../src/components/navbar'
import Media from '../src/components/media'
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag'

export const allAppsQuery = gql`
{
  app {
    id
    name
  }
}
`
export const allMsgsQuery = gql`
{
      messages_last_7_days {
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

export const allAppsQueryVars = {
  skip: 0,
  first: 10
}

class MainIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {mapMarkers: []};

    this.getMapMarkers = this.getMapMarkers.bind(this);
    this.setMapMarkers = this.setMapMarkers.bind(this);
    this.getMapMarkers();
  }
  getMapMarkers(layer){
    if(layer !== undefined){
      this.setMapMarkers(layer.graphics);
    }
  }
  setMapMarkers(markers){
    this.setState({mapMarkers: markers})
  }
  render() {    
    var i = 0;
    var usernames = {};
    let cards = undefined;

    if(this.state.mapMarkers !== undefined){
      this.map = (<DynamicMap getMapMarkers={this.getMapMarkers} updateMapMarkers={this.setMapMarkers}/>);
      cards = this.state.mapMarkers.map(markerInfo => {
        var atts = markerInfo.attributes;
        if(atts.contributor_name in usernames){
          return;
        }
        usernames[atts.contributor_name] = true;
  
        var timeStamp = atts.time;
        var dateString = new Date(timeStamp.replace(' ', 'T')).toDateString();
        return (
          <Media key={i++} map={atts.map} text={atts.message} profilePic={atts.https_contributor_profile_pic} fullname={atts.contributor_name} 
            username={atts.contributor_screen_name} geometry={markerInfo.geometry} mediaId={atts.message_id} mediaLink={atts.media} time={dateString}/>
        )
      });
    }

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
        {/* <FootNavbar /> */}
        {this.map}
      </div>  
    )
}}

export default withApollo(MainIndex);