import React from 'react';
import SideMedia from './sidemedia'
import MediaModal from './MediaModal'

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
    messages: messages_last_14_days(where: {message_id: {_eq: $messageid}}) {
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

export default function Media({ messageid }) {
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

    if(data.messages != undefined && data.messages.length > 0){
        message = data.messages[0]
    }

    if (sharedLinks !== undefined && sharedLinks.length > 0) {
        var mediaUrl = sharedLinks[0].expanded_url;

        if (mediaUrl.startsWith("https://www.instagram.com")) {
            mediaLinkButton = (
                <div className="button" onClick={() => activeMessageIdVar([messageid])}>
                    <i className="fab fa-instagram"></i>
                </div>
            )

            mediaImage = sharedLinks[0].preview;
        }
        else {
            mediaLinkButton = (
                <div className="button">
                    <i className="far fa-image"></i>
                </div>
            )

            mediaImage = sharedLinks[0].preview;
        }
    }

    // var sideMedia = <div></div>;
    // if(activeMessages.includes(messageid)){
    //      sideMedia = <SideMedia messageid={messageid}></SideMedia>;
    //  }

    // var modalClassname = "modal is-hidden"
    // if(activeMessages.includes(messageid)){
    //   return <MediaModal messageid={messageid}></MediaModal>
    // }

    var timeStamp = message.time;
    var dateString = new Date(timeStamp.replace(' ', 'T')).toDateString();

    return (
        <article className="media" onClick={() => activeMessageIdVar([messageid])} data-mediaid={messageid}>
            <figure className="media-left">
                <p className="image is-48x48">
                    <img className="is-rounded" src={message.https_contributor_profile_pic} alt="Placeholder image" />
                </p>
            </figure>
            <div className="media-content">
                <div className="content">
                    <p>
                        <strong>{message.contributor_name}</strong> <small>{message.contributor_screen_name}</small> <small>{dateString}</small>
                        <br />
                        {message.message}
                    </p>
                </div>
                <nav className="level is-mobile">
                    <div className="level-left">
                        <a className="level-item" target="_blank" href={replyToLink}>
                            <span className="icon is-small"><i className="fas fa-reply"></i></span>
                        </a>
                        <a className="level-item" target="_blank" href={retweetLink}>
                            <span className="icon is-small"><i className="fas fa-retweet"></i></span>
                        </a>
                        <a className="level-item" target="_blank" href={likeLink}>
                            <span className="icon is-small"><i className="fas fa-heart"></i></span>
                        </a>
                    </div>
                </nav>
            </div>
            <div className="media-right">
                <div className="buttons">
                    {mediaLinkButton}                            
                </div>
            </div>                            
        </article>
    );
}