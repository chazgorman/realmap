import Link from 'next/link'
import PropTypes from "prop-types"
import Media from '../components/media'

class MediaList extends React.Component {
    constructor(props) {
        super(props);
    }
    zoomTo(){

    }
    render(){
        var i = 0;
        var usernames = {};
        let cards = undefined;

        if(this.props.mapMarkers !== undefined){    
          cards = this.props.mapMarkers.map(markerInfo => {
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
                {cards}
            </div>
        );
    }
}

export default MediaList;

MediaList.propTypes = {
    mapMarkers: PropTypes.array
};