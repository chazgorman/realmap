import React from 'react';
import PropTypes from "prop-types"
import Media from './media'
import { useQuery, gql } from '@apollo/client';

// export const allMsgsQuery = gql`
// {
//       messages_last_14_days(limit: 100) {
//         harvest_id
//         contributor_screen_name
//         contributor_name
//         https_contributor_profile_pic
//         message
//         message_id
//         time
//         like_count
//         twitter_favorite_count
//         twitter_favorite_count
//         network
//         location
//     }
// }
// `

  export const allMsgsQuery = gql`
  {
    messages_last_14_days(limit: 100) {
      harvest_id
          contributor_screen_name
          contributor_name
          https_contributor_profile_pic
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
function MediaList() {
    const { loading, error, data } = useQuery(allMsgsQuery);

    if (loading) return <div className="button is-loading"></div>;
    if (error) return <p>Error</p>;

    var i = 0;
    var usernames = {};
    let cards = undefined;

    if (data !== undefined) {
      cards = data.messages_last_14_days.map(markerInfo => {
        var atts = markerInfo;
        // if (atts.contributor_name in usernames) {
        //   c;
        // }
        // usernames[atts.contributor_name] = true;

        var timeStamp = atts.time;
        var dateString = new Date(timeStamp.replace(' ', 'T')).toDateString();
        return (
          <Media key={i++} text={atts.message} profilePic={atts.https_contributor_profile_pic} fullname={atts.contributor_name}
            username={atts.contributor_screen_name} geometry={atts.location} mediaId={atts.message_id} mediaLink={atts.media} time={dateString} />
        )
      });
    }
    return (
      <div>
        {cards}
      </div>
    )
}

MediaList.propTypes = {
  query: PropTypes.object
};

export default MediaList;
