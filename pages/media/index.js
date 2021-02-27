import React from 'react'
import Navbar from '../../src/components/navbar'
import ClientMediaList from '../../src/components/mediaList'
import { useQuery, gql } from '@apollo/client';
import EmbeddedTweet from '../../src/components/EmbeddedTweet'

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

  //const activeMessages = useReactiveVar(activeMessageIdVar);

  // Apollo reactive variables used to get current state;
  //const activeMessages = activeMessageIdVar(); // Is there a message selected?
  //const showMobileMap = useReactiveVar(showMobileMapMode)    // Is active view a map and on a mobile device?

  // Loading/error indicators
  if (loading) return <div className="button is-loading"></div>;
  if (error) return <p>Error</p>;

  // Variables to hold conditional react components and style
  let mediaModalColumn = undefined;
  let mediaListStyle = { height: '100vh', overflow: 'auto' };
  let navbar = <Navbar />;
  let mapClassName = "column is-half is-centered is-vcentered";
  let mapStyle = { width: '100%', height: "100%" };

  let activeMsgId = data.messages[0].message_id;

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
          <EmbeddedTweet messageid={activeMsgId}/>
        </div>
      </div>
    </div>
  )
}

export default MediaWall;