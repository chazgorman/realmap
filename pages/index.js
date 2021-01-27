import React from 'react'
import DynamicMap from '../src/components/map';
import Navbar from '../src/components/navbar'
import ClientMediaList from '../src/components/mediaList'
import MediaModal from '../src/components/MediaModal'
import dynamic from 'next/dynamic'
import { useQuery, gql, useReactiveVar } from '@apollo/client';
import { activeMessageIdVar } from '../src/appstate/cache'

// const SceneViewMap = dynamic(
//   () => import('../src/components/SceneView'),
//   { ssr: false }
// )

// const ClientMediaList = dynamic(
//   () => import('../src/components/mediaList'),
//   { ssr: false }
// )

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

  let mediaModal = undefined;
  let mediaModalColumn = undefined
  let mediaListStyle = { height: '100vh', overflow: 'auto'};

  if(activeMessages.length > 0){
    mediaModal = <MediaModal messageid={activeMessages[0]}></MediaModal>;
    mediaModalColumn = (
        <div className="is-centered is-vcentered">
          {mediaModal}
        </div>
    );
    mediaListStyle = { height: '100vh', overflow: 'auto', display: 'none'};
  }

  return (

    <div>
      <Navbar />
      <div className="columns is-gapless is-desktop" style={{ width: '100%', height: '100%', paddingTop: '1.0rem' }}>
        <div className="column" style={{ height: '100vh', padding: '0' }}>
          {/* {searchInput}
            {topicChooser} */}
            {mediaModalColumn}
            <div style={mediaListStyle}>
              <ClientMediaList mapMarkers={data.geomessages_last_14_days} />
            </div>);
        </div>
        <div className="column is-two-thirds is-hidden-mobile">
          <div id="map" style={{ width: '100%', height: "100%" }}>
            <DynamicMap points={data}></DynamicMap>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainIndex;