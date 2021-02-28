import React from 'react'
import Navbar from '../../src/components/navbar'
import ClientMediaList from '../../src/components/mediaList'
import MediaModal from '../../src/components/MediaModal'
import { useQuery, gql, useReactiveVar } from '@apollo/client';
import { activeMessageIdVar, showMobileMedia } from '../../src/appstate/cache'
import MediaModalHeader from '../../src/components/MediaModalHeader'

export const allMsgsQuery = gql`
{
      messages: messages_last_14_days(limit: 100) {
        contributor_name
        message_id
        location
    }
}
`

function MediaIndex() {
  // React hook from Apollo is used to fetch data: useQuery
  const { loading, error, data } = useQuery(allMsgsQuery);

  // Loading/error indicators
  if (loading) return <div className="button is-loading"></div>;
  if (error) return <p>Error</p>;

  // Apollo reactive variables used to get current state;
  const activeMessages = useReactiveVar(activeMessageIdVar); // Is there a message selected?
  const showMobileMediaStatus = useReactiveVar(showMobileMedia)    // Is active view a map and on a mobile device?

  // Variables to hold conditional react components and style
  let mediaModal = undefined;
  let mediaModalColumn = undefined;
  let mapModalColumn = undefined;
  let mediaListStyle = { height: '100vh', overflow: 'auto' };
  let navbar = <Navbar />;
  let mapClassName = "column is-half is-hidden-mobile";
  let mapStyle = { width: '100%', height: "100%" };
  let headerStyle = { width: '100%', height: "20%", display: 'none' };

  // There is an active message, and we're on desktop; 
  if (activeMessages.length > 0 && showMobileMediaStatus == false) {
    // Create modal to display image/media
    mediaModal = <MediaModal messageid={activeMessages[0]}></MediaModal>;
    mediaModalColumn = (
      <div className="is-centered is-vcentered">
        {mediaModal}
      </div>
    );
    mediaListStyle = { height: '100vh', overflow: 'auto', display: 'none' };
  }
  // Mobile map mode implies that there is an active message; set up modal to display map
  else if (showMobileMediaStatus) {
    mapClassName = "modal column"
    mapStyle = { width: '100%', height: "100%" };
    headerStyle = { width: '100%' };
    mediaListStyle = { height: '100vh', overflow: 'auto', display: 'none' };
    mapModalColumn = <MediaModalHeader messageid={activeMessages[0]}></MediaModalHeader>
    mediaModalColumn = undefined;
    navbar = <div></div>;
  }

  return (
    // As per Bulma.io docs, 'columns' are only activated on tablet devices and above;
    // Mobile devices will have columns stacked vertically.
    // When in mobile map mode, elements in the first column are undefined or hidden, so 2nd column takes up full display.
    <div>
      {navbar}
      <div className="columns is-gapless is-desktop" style={{ width: '100%', height: '100%', paddingTop: '1.0rem' }}>
        <div className="column" style={{ height: '100vh', padding: '0' }}>
          {mediaModalColumn}
          <div style={mediaListStyle}>
            <ClientMediaList mapMarkers={data.messages} />
          </div>);
        </div>
      </div>
    </div>
  )
}

export default MediaIndex;