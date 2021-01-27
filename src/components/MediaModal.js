import React from 'react';
import SideMedia from './sidemedia'
import { useQuery, gql, useReactiveVar } from '@apollo/client';
import { activeMessageIdVar } from '../appstate/cache'

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

export default function MediaModal({ messageid }) {
    const { loading, error, data, refetch, networkStatus } = useQuery(
      MSG_BY_ID_QUERY,
      {
        variables: { messageid },
        notifyOnNetworkStatusChange: true
        // pollInterval: 500
      }
    );

    const activeMessages = useReactiveVar(activeMessageIdVar);
  
    if (networkStatus === 4) return <p>Refetching!</p>;
    if (loading) return <div className="button is-loading"></div>;
    if (error) return <p>`Error!: ${error}`</p>;  

    //var mediaData = data.shared_links[0]
    var retweetLink = "https://twitter.com/intent/retweet?tweet_id=" + messageid;
    var replyToLink = "https://twitter.com/intent/tweet?in_reply_to=" + messageid;
    var likeLink = "https://twitter.com/intent/like?tweet_id=" + messageid;

    var mediaLinkButton = undefined;
    var mediaImage = undefined; 

    var sharedLinks = data.shared_links;
    var message = null;
    var directLink = undefined;
    

    if(data.geomessages_last_14_days != undefined && data.geomessages_last_14_days.length > 0){
        message = data.geomessages_last_14_days[0]
    }

    if (sharedLinks !== undefined && sharedLinks.length > 0) {
        var mediaUrl = sharedLinks[0].expanded_url;

        if (mediaUrl.startsWith("https://www.instagram.com")) {
            mediaLinkButton = (
                <div className="button" onClick={() => activeMessageIdVar([messageid])}>
                    <i className="fab fa-instagram"></i>
                </div>
            )
            directLink = sharedLinks[0].url;
            mediaImage = sharedLinks[0].preview;
        }
        else {
            mediaLinkButton = (
                <div className="button">
                    <i className="far fa-image"></i>
                </div>
            )
            directLink = sharedLinks[0].url;
            mediaImage = sharedLinks[0].preview;
        }
    }

     var modalClassname = "modal is-hidden"
     if(activeMessages.includes(messageid)){
      modalClassname = "modal;"
    }

    var timeStamp = message.time;
    var dateString = new Date(timeStamp.replace(' ', 'T')).toDateString();

    return (
        <div className={modalClassname}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    {/* <p className="modal-card-title">Modal title</p> */}
                    <figure className="media-left">
                    <p className="image is-48x48">
                        <img className="is-rounded" src={message.https_contributor_profile_pic} alt="Placeholder image" />
                    </p>
                    </figure>
                    <div className="media-content">
                        <p><strong>{message.contributor_name}</strong></p>
                        <p><small>@{message.contributor_screen_name}</small></p>
                    </div>
                    <button className="delete is-large" aria-label="close" onClick={() => activeMessageIdVar(activeMessages.filter(item => item !== messageid))}></button>
                </header>
                <section className="modal-card-body">
                    <section>
                        <div>
                            <p>{message.message}</p>
                        </div>
                        <div className="image is-2by2">
                            <a href={directLink} target="_blank" title="Click image to view on Instagram."><img src={mediaImage} alt="View on Instagram"/></a>
                        </div>
                    </section>
                </section>
            </div>
        </div>
    );
}