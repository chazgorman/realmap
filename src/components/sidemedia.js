import React from 'react';
import EsriModalMap from './modalmap'
import { useQuery, gql, useReactiveVar } from '@apollo/client';
import { activeMessageIdVar, showMobileMapMode } from '../appstate/cache'

const MSG_BY_ID_QUERY = gql`
query($messageid: String) {
    shared_links(where: {message_id: {_eq: $messageid}}) {
          message_id
          url
          expanded_url
          source
          host
          location
          preview
    }
    geomessages_last_14_days(where: {message_id: {_eq: $messageid}}) {
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
  }`

export default function SideMedia({ messageid }) {
    const { loading, error, data, refetch, networkStatus } = useQuery(
        MSG_BY_ID_QUERY,
      {
        variables: { messageid },
        notifyOnNetworkStatusChange: true
        // pollInterval: 500
      }
    );
    
    const activeMessages = useReactiveVar(activeMessageIdVar);
    const showMap = useReactiveVar(showMobileMapMode);
  
    if (networkStatus === 4) return <p>Refetching!</p>;
    if (loading) return <div className="button is-loading"></div>;
    if (error) return <p>`Error!: ${error}`</p>;

    var buttonClassname = "button is-link is-hidden-desktop is-small";
    if (showMap) {
        buttonClassname += " is-loading is-small";
    } else {
        buttonClassname += "is-success is-outlined is-small";
    }

    var directLink = undefined;
    var mediaImage = undefined; 

    var sharedLinks = data.shared_links;
    var message = null;

    if(data.geomessages_last_14_days != undefined && data.geomessages_last_14_days.length > 0){
        message = data.geomessages_last_14_days[0]
    }

    var sharedLinks = data.shared_links;

    if (sharedLinks !== undefined && sharedLinks.length > 0) {
        var mediaUrl = sharedLinks[0].expanded_url;

        if (mediaUrl.startsWith("https://www.instagram.com")) {
            directLink = sharedLinks[0].url;
            mediaImage = sharedLinks[0].preview;
        }
        else {
            directLink = sharedLinks[0].url;

            mediaImage = sharedLinks[0].source;
        }
    }

    var mobileMapButtonGroup = (<div className="buttons">
        <div className={buttonClassname} onClick={() => showMobileMapMode(true)}>
            <i className="fas fa-globe is-small" color="blue"></i>
        </div>
        <button className="delete is-small" aria-label="close" onClick={() => activeMessageIdVar(activeMessages.filter(item => item !== messageid))}></button>
    </div>)

    var mediaModal = undefined;
    if (showMap) {
        this.map = (<EsriModalMap containerId={messageid} geometry={message.location} />);
        mediaModal = (
            <article className="message is-small">
                <div className="message-header">
                    <p>@{message.contributor_screen_name}</p>
                    {mobileMapButtonGroup}
                </div>
                <section className="message-body">
                    <div id={messageid} style={{ height: "60vh" }}></div>
                    <div>
                        <p>{message.message}</p>
                    </div>
                </section>
                {this.map}
            </article>
        );
    }
    else {
        mediaModal = (
            <article className="message is-small">
                <div className="message-header">
                    <p>@{message.contributor_screen_name}</p>
                    {mobileMapButtonGroup}
                </div>
                <section className="message-body">
                    <div className="image is-2by2">
                        <a href={directLink} target="_blank" title="Click image to view on Instagram."><img src={mediaImage} alt="View on Instagram"/></a>
                    </div>
                    <div>
                        <p>{message.message}</p>
                    </div>
                </section>
            </article>
        );
    }


    return (
        <article className="media">
            {mediaModal}
        </article>
    );
}