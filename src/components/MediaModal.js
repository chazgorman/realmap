import React from 'react';
import { useQuery, gql, useReactiveVar } from '@apollo/client';
import { activeMessageIdVar, showMobileMedia } from '../appstate/cache'
import { TwitterTweetEmbed } from 'react-twitter-embed';

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
        location
    }
  }`

export default function MediaModal({ messageid }) {
    const { loading, error, data, refetch, networkStatus } = useQuery(
      MSG_BY_ID_QUERY,
      {
        variables: { messageid },
        notifyOnNetworkStatusChange: true
        //pollInterval: 5000
      }
    );

    const activeMessages = useReactiveVar(activeMessageIdVar);
  
    if (networkStatus === 4) return <p>Refetching!</p>;
    if (loading) return <div className="button is-loading"></div>;
    if (error) return <p>`Error!: ${error}`</p>;  

    var mediaLinkButton = undefined;
    var mediaImage = undefined; 

    var sharedLinks = data.shared_links;
    var message = null;
    var directLink = undefined;
    
    var modalBody = undefined;

    var closeModalFunc = () => {
        showMobileMedia(false);
        activeMessageIdVar(activeMessages.filter(item => item !== messageid));
    };

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
            directLink = sharedLinks[0].url;
            mediaImage = sharedLinks[0].preview;

            modalBody = (
                <section className="modal-card-body">
                    <section>
                        <div>
                            <p>{message.message}</p>
                        </div>
                        <div className="image is-2by2">
                            <a href={directLink} target="_blank" title="Click image to view on Instagram."><img src={mediaImage} alt="View on Instagram" /></a>
                        </div>
                    </section>
                </section>
            );
        }
        else {
            mediaLinkButton = (
                <div className="button">
                    <i className="far fa-image"></i>
                </div>
            )
            directLink = sharedLinks[0].url;
            mediaImage = sharedLinks[0].preview;

            modalBody = (
                <section className="modal-card-body">
                    <section>
                        <TwitterTweetEmbed key={messageid} tweetId={messageid} placeholder="Loading Tweet..."/>
                    </section>
                </section>
            );
        }
    }
    else {
        modalBody = (
            <section className="modal-card-body">
                <section>
                    <TwitterTweetEmbed key={messageid} tweetId={messageid} placeholder="Loading Tweet..."/>
                </section>
            </section>
        );
    }

     var modalClassname = "modal is-hidden"
     if(activeMessages.includes(messageid)){
      modalClassname = "modal;"
    }

    return (
        <div className={modalClassname}>
            <div className="modal-background"></div>
            <div className="modal-card ml-0">
                <header className="modal-card-head">
                    <figure className="media-left">
                        <p className="image is-48x48">
                            <img className="is-rounded" src={message.https_contributor_profile_pic} alt="Placeholder image" />
                        </p>
                    </figure>
                    <div className="media-content">
                        <p><strong>{message.contributor_name}</strong></p>
                        <p><small>@{message.contributor_screen_name}</small></p>
                    </div>
                    <button className="delete is-large" aria-label="close" onClick={() => closeModalFunc()}></button>
                </header>
                {modalBody}
            </div>
        </div>
    );
}