import Media from '../src/components/media'
import "isomorphic-fetch"

export default class MediaList extends React.Component {
  constructor(props) {
    super(props);
  }
  static async getInitialProps({ req }) {
    var searchUrl = encodeURI("http://localhost:3002/near?lon=-2&lat=45&radius=400000");
    var mapMarkers;

    //const res = fetch(searchUrl);
    //const json = await res.json();
    //console.log(json);

    var retVal = { mapMarkers: [] }

    await fetch(searchUrl, {
      method: 'GET',
      mode: 'cors',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(json => retVal.mapMarkers = json.features);

    return retVal;
  }
  componentDidMount(){

  }
  render() {
    // var index = 0;
    // var list = this.props.mapMarkers.map(marker => {
    //   return <Media key={index++} text={"test text"} img={"test"} user={"Charlie"}></Media>
    // });
    return (
      <div>test</div>
    );
  }
}