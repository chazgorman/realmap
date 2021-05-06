import React from 'react'
import Navbar from '../../src/components/navbar'
import TabMenu from '../../src/components/TabMenu'
import ClientMediaList from '../../src/components/mediaList'
import MediaModal from '../../src/components/MediaModal'
import { useQuery, useReactiveVar } from '@apollo/client';
import { activeMessageIdVar, showMobileMedia, selectedTopicsVar, showFilterModalVar } from '../../src/appstate/cache'
import MediaModalHeader from '../../src/components/MediaModalHeader'
import HashtagModal from '../../src/components/HashtagModal'
import { MSGS_BY_HASHTAGS_LAST_14_DAYS, MSGS_LAST_14_DAYS } from '../../src/appstate/GqlQueries'

function MediaIndex() {
  var tagList = "giro,giroditalia,Giro,Giro104,Giro2021,Giro21";
  var msgLimit = tagList.length === 0 ? 100 : 1000;
  var tagsArg = "{" + tagList + "}";

  var skipHashtagQuery = tagList.length === 0;
  var skipAllMsgQuery = !skipHashtagQuery;

  const hashtagQuery = useQuery(
    MSGS_BY_HASHTAGS_LAST_14_DAYS,
    {
      variables: { tags: tagsArg },
      notifyOnNetworkStatusChange: true,
      skip: skipHashtagQuery
      //pollInterval: 5000
    }
  );
  const allMsgQuery = useQuery(
    MSGS_LAST_14_DAYS,
    {
      variables: { msglimit: msgLimit },
      notifyOnNetworkStatusChange: true,
      skip: skipAllMsgQuery
      //pollInterval: 5000
    }
  );

  // Apollo reactive variables used to get current state;
  const activeMessages = useReactiveVar(activeMessageIdVar); // Is there a message selected?
  const showMobileMediaStatus = useReactiveVar(showMobileMedia)    // Is active view a map and on a mobile device?
  const showFilterModal = useReactiveVar(showFilterModalVar);

  // Loading/error indicators
  if (hashtagQuery.loading || allMsgQuery.loading) return <div className="button is-loading"></div>;
  if (hashtagQuery.error || allMsgQuery.error) return <p>Error</p>;

  var currentMsgs = hashtagQuery.data !== undefined ? hashtagQuery.data.messages : allMsgQuery.data.messages;

  // Variables to hold conditional react components and style
  let mediaModal = undefined;
  let mediaModalColumn = undefined;
  let mapModalColumn = undefined;
  let mediaListStyle = { height: '100vh', overflow: 'auto' };
  let navbar = <Navbar />;
  let tabMenu = <TabMenu />;

  // There is an active message, and we're on desktop; 
  if (activeMessages.length > 0 && showMobileMediaStatus == false) {
    // Create modal to display image/media
    mediaModal = <MediaModal messageid={activeMessages[0]}></MediaModal>;
    mediaListStyle = { height: '100vh', overflow: 'auto', display: 'none' };
  }
  // Mobile map mode implies that there is an active message; set up modal to display map
  else if (showMobileMediaStatus) {

    mediaListStyle = { height: '100vh', overflow: 'auto', display: 'none' };
    mapModalColumn = <MediaModalHeader messageid={activeMessages[0]}></MediaModalHeader>
    mediaModalColumn = undefined;
    navbar = <div></div>;
  }

  var filterModal = undefined;
  var filterModalColumn = undefined;
  if(showFilterModal){
    filterModal = <HashtagModal></HashtagModal>;
    filterModalColumn = (
      <div className="is-centered is-vcentered">
        {filterModal}
      </div>
    );
  }

  return (
    // As per Bulma.io docs, 'columns' are only activated on tablet devices and above;
    // Mobile devices will have columns stacked vertically.
    // When in mobile map mode, elements in the first column are undefined or hidden, so 2nd column takes up full display.
    <div>
      {navbar}
      <div className="columns is-centered is-gapless is-desktop" style={{ width: '100%', height: '100%', paddingTop: '1.0rem' }}>
        <div className="column is-centered" >
          {tabMenu}
          {mediaModal}
          {filterModalColumn}
          <div className="is-box" style={mediaListStyle}>
            <ClientMediaList mapMarkers={currentMsgs} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MediaIndex;