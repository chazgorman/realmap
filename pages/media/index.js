import React from 'react'
import DynamicMap from '../../src/components/map';
import Navbar from '../../src/components/navbar'
import ClientMediaList from '../../src/components/mediaList'
import MediaModal from '../../src/components/MediaModal'
import { useQuery, gql, useReactiveVar } from '@apollo/client';
import { activeMessageIdVar, showMobileMapMode } from '../../src/appstate/cache'
import MapController from '../../src/components/MapController'
import MapModalHeader from '../../src/components/MapModalHeader'
import EmbeddedTweet from '../../src/components/EmbeddedTweet'

//import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';
import { TwitterTweetEmbed } from 'react-twitter-embed';

export const allMsgsQuery = gql`
{
      messages: messages_last_14_days(limit: 100) {
        contributor_name
        message_id
        location
    }
}
`

function MediaWall() {
  // React hook from Apollo is used to fetch data: useQuery
  const { loading, error, data } = useQuery(allMsgsQuery);

  // Apollo reactive variables used to get current state;
  const activeMessages = useReactiveVar(activeMessageIdVar); // Is there a message selected?
  const showMobileMap = useReactiveVar(showMobileMapMode)    // Is active view a map and on a mobile device?

  // Loading/error indicators
  if (loading) return <div className="button is-loading"></div>;
  if (error) return <p>Error</p>;

  // Variables to hold conditional react components and style
  let mediaModal = undefined;
  let mediaModalColumn = undefined;
  let mapModalColumn = undefined;
  let mediaListStyle = { height: '100vh', overflow: 'auto' };
  let navbar = <Navbar />;
  let mapClassName = "column is-two-thirds is-hidden-mobile is-vcentered";
  let mapStyle = { width: '100%', height: "100%" };
  let headerStyle = { width: '100%', height: "20%", display: 'none' };

  // There is an active message, and we're on desktop; 
  // if (activeMessages.length > 0 && showMobileMap == false) {
  //   // Create modal to display image/media
  //   mediaModal = <MediaModal messageid={activeMessages[0]}></MediaModal>;
  //   var tweetEmbed = <TwitterTweetEmbed tweetId={activeMessages[0]} />;
  //   mediaModalColumn = (
  //     <div className="is-centered is-vcentered">
  //       {mediaModal}
  //       {tweetEmbed}
  //     </div>
  //   );
  //   mediaListStyle = { height: '100vh', overflow: 'auto', display: 'none' };
  // }
  // // Mobile map mode implies that there is an active message; set up modal to display map
  // else if (showMobileMap) {
  //   mapClassName = "modal column"
  //   mapStyle = { width: '100%', height: "100%" };
  //   headerStyle = { width: '100%' };
  //   mediaListStyle = { height: '100vh', overflow: 'auto', display: 'none' };
  //   mapModalColumn = <MapModalHeader messageid={activeMessages[0]}></MapModalHeader>
  //   mediaModalColumn = undefined;
  //   navbar = <div></div>;
  // }

  // let activeMsgId = data.messages[0].message_id;
  // if(activeMessages.length > 0){
  //   activeMsgId = activeMessages[0].message_id;
  // }
  // let tweetEmbed = <TwitterTweetEmbed tweetId={activeMsgId} />

  // {activeMessages.length > 0 ? <TwitterTweetEmbed tweetId={activeMessages[0].message_id} /> : 
  //                             <TwitterTweetEmbed tweetId={data.messages[0].message_id} />}
  // let tweetList = undefined;
  // let i = 0;
  // if(data.messages !== undefined){    
  //   tweetList = data.messages.map(msg => {
  //     return (
  //       <TwitterTweetEmbed key={i++} tweetId={msg.message_id} />
  //     )
  //   });
  // }

  return (
    // As per Bulma.io docs, 'columns' are only activated on tablet devices and above;
    // Mobile devices will have columns stacked vertically.
    // When in mobile map mode, elements in the first column are undefined or hidden, so 2nd column takes up full display.
    <div>
      {navbar}
      <div className="columns is-gapless is-centered is-desktop" style={{ width: '100%', height: '100%', paddingTop: '1.0rem' }}>
        <div className="column" style={{ height: '100vh', padding: '0' }}>
          {/* {searchInput}
            {topicChooser} */}
          {mediaModalColumn}
          <div style={mediaListStyle}>
            <ClientMediaList mapMarkers={data.messages} />
          </div>);
        </div>
        <div className={mapClassName}>
          <div id="mobileMapHeader" style={headerStyle}>
            {mapModalColumn}
          </div>
          <div id="map" style={mapStyle}>
            <div className="centerContent">
              <EmbeddedTweet messageid={activeMessages[0]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MediaWall;