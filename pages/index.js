import React from 'react'
import DynamicMap from '../src/components/map';
import Navbar from '../src/components/navbar'
import ClientMediaList from '../src/components/mediaList'
import MediaModal from '../src/components/MediaModal'
import { useQuery, gql, useReactiveVar } from '@apollo/client';
import { activeMessageIdVar, showMobileMapMode } from '../src/appstate/cache'
import MapController from '../src/components/MapController'
import MapModalHeader from '../src/components/MapModalHeader'

export const allMsgsQuery = gql`
{
      geomessages_last_14_days(limit: 100) {
        contributor_name
        message_id
        location
    }
}
`

export const allAppsQueryVars = {
  skip: 0,
  first: 10
}

function MainIndex() {

  const { loading, error, data } = useQuery(allMsgsQuery);

  if (loading) return <div className="button is-loading"></div>;
  if (error) return <p>Error</p>;

  const activeMessages = useReactiveVar(activeMessageIdVar);
  const showMobileMap = useReactiveVar(showMobileMapMode)

  let mediaModal = undefined;
  let mediaModalColumn = undefined;
  let mapModalColumn = undefined;
  let mediaListStyle = { height: '100vh', overflow: 'auto'};
  let navbar = <Navbar />;

  if(activeMessages.length > 0 && showMobileMap == false){
        mediaModal = <MediaModal messageid={activeMessages[0]}></MediaModal>;
        mediaModalColumn = (
            <div className="is-centered is-vcentered">
              {mediaModal}
            </div>
        );
        mediaListStyle = { height: '100vh', overflow: 'auto', display: 'none'};
  }

  var mapClassName = "column is-two-thirds is-hidden-mobile";
  var mapStyle = { width: '100%', height: "100%" };
  var headerStyle = { width: '100%', height: "20%", display: 'none' };

  if(showMobileMap){
    mapClassName = "modal column"
    mapStyle = { width: '100%', height: "100%" };
    headerStyle = { width: '100%' };
    mediaListStyle = { height: '100vh', overflow: 'auto', display: 'none'};
    mapModalColumn = <MapModalHeader messageid={activeMessages[0]}></MapModalHeader>
    mediaModalColumn = undefined;
    navbar = <div></div>;
  }

  return (

    <div>
      {navbar}
      <div className="columns is-gapless is-desktop" style={{ width: '100%', height: '100%', paddingTop: '1.0rem' }}>
        <div className="column" style={{ height: '100vh', padding: '0' }}>
          {/* {searchInput}
            {topicChooser} */}
            {mediaModalColumn}
            <div style={mediaListStyle}>
              <ClientMediaList mapMarkers={data.geomessages_last_14_days} />
            </div>);
        </div>
        <div className={mapClassName}>
          <div id="mobileMapHeader" style={headerStyle}>
            {mapModalColumn}
          </div>
          <div id="map" style={mapStyle}>
            <DynamicMap points={data}></DynamicMap>
            <MapController map={this}></MapController>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainIndex;