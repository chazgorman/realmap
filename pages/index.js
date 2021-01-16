import DynamicMap from '../src/components/map';
import Navbar from '../src/components/navbar'
import MediaList from '../src/components/mediaList'
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
      geomessages_last_14_days {
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

    this.state = { mapMarkers: [] };

    this.getMapMarkers = this.getMapMarkers.bind(this);
    this.setMapMarkers = this.setMapMarkers.bind(this);
    this.getMapMarkers();
  }
  getMapMarkers(layer) {
    if (layer !== undefined) {
      this.setMapMarkers(layer.graphics);
    }
  }
  setMapMarkers(markers) {
    this.setState({ mapMarkers: markers })
  }
  render() {
    // let searchInput = (<input className="input is-small" type="text" placeholder="Search ie. #LeTour"/>);
    // let topicChooser = (<div className="tabs is-small">
    //   <ul>
    //     <li className="is-active"><a>Riders</a></li>
    //     <li><a>News</a></li>
    //     <li><a>Teams</a></li>
    //     <li><a>Races</a></li>
    //     <li><a>Road</a></li>
    //     <li><a>MTB</a></li>
    //     <li><a>Cyclocross</a></li>
    //     <li><a>Men</a></li>
    //     <li><a>Women</a></li>
    //   </ul>
    // </div>);

    let mediaList = (<MediaList mapMarkers={this.state.mapMarkers} />)

    if (this.state.mapMarkers !== undefined) {
      this.map = (<DynamicMap getMapMarkers={this.getMapMarkers} updateMapMarkers={this.setMapMarkers} />);
    }

    return (
      <div>
        <Navbar />
        <div className="columns is-gapless is-desktop" style={{ width: '100%', height: '100%', paddingTop: '1.0rem' }}>
          <div className="column" style={{ height: '100vh', padding: '0' }}>
            {/* {searchInput}
            {topicChooser} */}
            <div style={{ height: '100vh', overflow: 'auto' }}>
              {mediaList}
            </div>
          </div>
          <div className="column is-two-thirds is-hidden-mobile">
            <div id="map" style={{ width: '100%', height: "100%" }} />
          </div>
        </div>
        {this.map}
      </div>
    )
  }
}

export default withApollo(MainIndex);