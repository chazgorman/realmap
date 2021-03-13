import React from 'react'
import DynamicMap2D from '../src/components/MapView2D';
import Navbar from '../src/components/navbar'
import TabMenu from '../src/components/TabMenu'
import ClientMediaList from '../src/components/mediaList'
import MapMediaModal from '../src/components/MapMediaModal'
import { useQuery, useReactiveVar } from '@apollo/client';
import { activeMessageIdVar, showMobileMapMode, showFilterModalVar, selectedTopicsVar } from '../src/appstate/cache'
import MapController from '../src/components/MapController'
import MapModalHeader from '../src/components/MapModalHeader'
import HashtagModal from '../src/components/HashtagModal'
import { GEOMSGS_LAST_14_DAYS, GEOMSGS_BY_HASHTAGS_LAST_14_DAYS } from '../src/appstate/GqlQueries'

function MainIndex() {
  // React hook from Apollo is used to fetch data: useQuery

  var tagList = useReactiveVar(selectedTopicsVar);
  var msgLimit = tagList.length === 0 ? 100 : 1000;
  var tagsArg = "{" + tagList.join() + "}";

  var skipHashtagQuery = tagList.length === 0;
  var skipAllMsgQuery = !skipHashtagQuery;

  const hashtagQuery = useQuery(
    GEOMSGS_BY_HASHTAGS_LAST_14_DAYS,
    {
      variables: { tags: tagsArg },
      notifyOnNetworkStatusChange: true,
      skip: skipHashtagQuery
      //pollInterval: 5000
    }
  );
  const allMsgQuery = useQuery(
    GEOMSGS_LAST_14_DAYS,
    {
      variables: { msglimit: msgLimit },
      notifyOnNetworkStatusChange: true,
      skip: skipAllMsgQuery
      //pollInterval: 5000
    }
  );

  // Apollo reactive variables used to get current state;
  const activeMessages = useReactiveVar(activeMessageIdVar); // Is there a message selected?
  const showMobileMap = useReactiveVar(showMobileMapMode)    // Is active view a map and on a mobile device?
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

  let mapClassName = "column is-two-thirds is-hidden-mobile";
  let mapStyle = { width: '100%', height: "100%" };
  let headerStyle = { width: '100%', height: "20%", display: 'none' };

  // There is an active message, and we're on desktop; 
  if (activeMessages.length > 0 && showMobileMap == false) {
    // Create modal to display image/media
    mediaModal = <MapMediaModal messageid={activeMessages[0]}></MapMediaModal>;
    mediaModalColumn = (
      <div className="is-centered is-vcentered">
        {mediaModal}
      </div>
    );
    mediaListStyle = { height: '100vh', overflow: 'auto', display: 'none' };
  }
  // Mobile map mode implies that there is an active message; set up modal to display map
  else if (showMobileMap) {
    mapClassName = "modal column"
    mapStyle = { width: '100%', height: "100%" };
    headerStyle = { width: '100%' };
    mediaListStyle = { height: '100vh', overflow: 'auto', display: 'none' };
    mapModalColumn = <MapModalHeader messageid={activeMessages[0]}></MapModalHeader>
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

  var map2D = (<div id="map2d" style={mapStyle}>
    <DynamicMap2D points={currentMsgs}></DynamicMap2D>
    <MapController map={this}></MapController>
  </div>);

  return (
    // As per Bulma.io docs, 'columns' are only activated on tablet devices and above;
    // Mobile devices will have columns stacked vertically.
    // When in mobile map mode, elements in the first column are undefined or hidden, so 2nd column takes up full display.
    <div>
      {navbar}
      <div className="columns is-gapless is-desktop" style={{ width: '100%', height: '100%', paddingTop: '1.0rem' }}>
        <div className="column" style={{ height: '100vh', padding: '0' }}>
          {/* {searchInput}
            {topicChooser} */}
          {tabMenu}
          {mediaModalColumn}
          {filterModalColumn}
          <div style={mediaListStyle}>
            <ClientMediaList mapMarkers={currentMsgs} />
          </div>
        </div>
        <div className={mapClassName}>
          <div id="mobileMapHeader" style={headerStyle}>
            {mapModalColumn}
          </div>
          {map2D}
        </div>
      </div>
    </div>
  )
}

export default MainIndex;