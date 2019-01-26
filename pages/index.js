import dynamic from 'next/dynamic'

const DynamicMap = dynamic(import('../src/map'),
{
  ssr: false
})

export default class Index extends React.Component {

  static async getInitialProps({ req }) {
    return {}
  }
  componentDidMount(){
    // var searchUrl = encodeURI("http://localhost:3002/near?lon=-2&lat=45&radius=400000");
    // var setMapMarkers = this.setMapMarkers;
    // var page = this;

    // fetch(searchUrl, {
    //   method: 'get',
    //   mode: 'no-cors',
    //   headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //   }
    // })
    // .then(response => response.json())
    // .then(setMapMarkers);

    // .then(json =>
    //     // We can dispatch many times!
    //     // Here, we update the app state with the results of the API call.
    //     //console.log(json)
    //     //page.mapMarkers = json.features
    //     //console.log(page.mapMarkers)
    //     {
    //       setMapMarkers(json.features)
    //     }
    // )
  }
  setMapMarkers(markers){
    console.log("In index setMapMarkers", markers);
  }
  render() {
    this.map = (<DynamicMap />);
    return (
      this.map
    );
  }
}