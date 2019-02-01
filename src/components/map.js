import dynamic from 'next/dynamic'

const DynamicMap = dynamic(import('../map'),
{
  ssr: false
})

export default class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {mapMarkers: []};

    this.getMapMarkers = this.getMapMarkers.bind(this);
    this.setMapMarkers = this.setMapMarkers.bind(this);
  }
  componentDidMount(){

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
    console.log("In index setMapMarkers", this.state, markers);
    return this.state.mapMarkers;
    //this.map.setMapMarkers(markers);
  }
  render() {
    this.map = (<DynamicMap getMapMarkers={this.getMapMarkers} />);
    return (
      this.map
    );
  }
}