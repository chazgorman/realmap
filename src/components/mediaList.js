import PropTypes from "prop-types"
import Media from './media'
import React from 'react'

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
            var atts = markerInfo;
            if(atts.contributor_name in usernames){
              return;
            }
            usernames[atts.contributor_name] = true;

            return (
              <Media key={i++} messageid={atts.message_id} />
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

MediaList.propTypes = {
    mapMarkers: PropTypes.array
};

export default MediaList;
