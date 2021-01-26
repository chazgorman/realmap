import React from 'react'
import DynamicMap from '../src/components/map';
import Navbar from '../src/components/navbar'
import ClientMediaList from '../src/components/mediaList'
import dynamic from 'next/dynamic'
import { useQuery, gql, NetworkStatus } from '@apollo/client';
//import { SceneViewMap } from '../src/components/SceneView'

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

export const allAppsQueryVars = {
  skip: 0,
  first: 10
}

function MainIndex() {

  const { loading, error, data, networkStatus } = useQuery(allMsgsQuery, {pollInterval: 5000, notifyOnNetworkStatusChange: true});

  var refreshIndicator = <div></div>
  if (loading) return <div className="button is-loading"></div>;
  if (networkStatus === NetworkStatus.refetch){
    refreshIndicator = <div className="button is-loading"></div>;
  }
  if (error) return <p>Error</p>;

  let mediaList = (<ClientMediaList mapMarkers={data.geomessages_last_14_days} />)

  return (

    <div>
      <Navbar />
      <div className="columns is-gapless is-desktop" style={{ width: '100%', height: '100%', paddingTop: '1.0rem' }}>
        <div className="column" style={{ height: '100vh', padding: '0' }}>
          {/* {searchInput}
            {topicChooser} */}
          <div style={{ height: '100vh', overflow: 'auto' }}>
            {refreshIndicator}
            {mediaList}
          </div>
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