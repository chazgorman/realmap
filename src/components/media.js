import React from 'react';
import PropTypes from "prop-types"
import SideMedia from './sidemedia'
import { useQuery, gql, useReactiveVar } from '@apollo/client';
import { activeMessageIdVar } from '../appstate/cache'

{/* <Media key={i++} map={atts.map} text={atts.message} profilePic={atts.https_contributor_profile_pic} fullname={atts.contributor_name} 
username={atts.contributor_screen_name} geometry={markerInfo.geometry} mediaId={atts.message_id} mediaLink={atts.media} time={dateString}/> 
            var timeStamp = atts.time;
            var dateString = new Date(timeStamp.replace(' ', 'T')).toDateString();
*/}

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

const mediaForMsgQuery = gql`
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

function setActiveMessage(id){
    //const activeMessages = useReactiveVar(activeMessageIdVar);

    activeMessageIdVar([id])
}

function Media({ messageid }) {
    const { loading, error, data, refetch, networkStatus } = useQuery(
      mediaForMsgQuery,
      {
        variables: { messageid },
        notifyOnNetworkStatusChange: true
        // pollInterval: 500
      }
    );

    const activeMessages = useReactiveVar(activeMessageIdVar);

    console.log(activeMessages)

  
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

    if(activeMessages.includes(messageid)){
        return <img src={mediaImage} alt="View on Instagram"/>;
    }

    // var sideMedia = (
    //     <img src={mediaImage} alt="View on Instagram"/>
    //     // <SideMedia mediaId={mediaData.mediaId} username={mediaData.username} date={mediaData.date} text={mediaData.text} 
    //     //             profilePic={mediaData.profilePic} fullname={mediaData.fullname} geometry={mediaData.geometry} time={mediaData.time}>
    //     // </SideMedia>
    // );
    var timeStamp = message.time;
    var dateString = new Date(timeStamp.replace(' ', 'T')).toDateString();

    return (
        <article className="media" data-mediaid={messageid}>
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

// class Media extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = { zooming: false, showModal: false, showMedia: true, sharedLinks: [] };
//         var thisMedia = this;
//     }
//     showModal() {
//         var value = this.state.showModal === true ? false : true;

//         this.setState({ showModal: value });
//     }
//     showModalMedia(zoom) {
//         if(zoom){
//             this.zoomTo();
//         }
//         this.setState({ showModal: true, showMedia: true, showMap: false });
//     }
//     showModalMap() {
//         this.setState({ showModal: true, showMedia: false, showMap: true });
//     }
//     setSharedLinks(sharedLinks) {
//         this.setState({ sharedLinks: sharedLinks });
//     }
//     zoomTo() {
//         console.log("In zoomTo", this.props.geometry);
//         // var card = this;
//         // var geom = this.props.geometry;
//         // var map = this.props.map;
//         // this.setState({ zooming: true });

//         // var options = {
//         //     target: geom,
//         //     zoom: 12,
//         //     tilt: 45        
//         // };
//         // map.goTo(options).then(function (result) {
//         //     card.setState({ zooming: false });
//         // })
//     }
//     render(){
//         var retweetLink = "https://twitter.com/intent/retweet?tweet_id=" + this.props.mediaId;
//         var replyToLink = "https://twitter.com/intent/tweet?in_reply_to=" + this.props.mediaId;
//         var likeLink = "https://twitter.com/intent/like?tweet_id=" + this.props.mediaId;

//         var mediaLinkButton = undefined;
//         var mediaImage = undefined; 

//         return (
//             <Query
//                 query={mediaForMsgQuery}
//                 variables={{ messageid: this.props.mediaId }}
//             >
//                  {({ loading, error, data }) => {
//                      if (loading) return <div className="button is-loading"></div>;
//                      if (error) return <p>Error</p>;     

//                     return <div>Test</div>
//                  }
//                 }
//             </Query>
//         )
//     }
    // render() {
    //     var retweetLink = "https://twitter.com/intent/retweet?tweet_id=" + this.props.mediaId;
    //     var replyToLink = "https://twitter.com/intent/tweet?in_reply_to=" + this.props.mediaId;
    //     var likeLink = "https://twitter.com/intent/like?tweet_id=" + this.props.mediaId;

    //     var mediaLinkButton = undefined;
    //     var mediaImage = undefined; //"https://www.instagram.com/p/BtbXwXgFqevg2e_zNtzD9ED8HPodoyLbi0KoA00/media?size=l"

    //     return (
    //         <Query
    //             query={mediaForMsgQuery}
    //             variables={{ messageid: this.props.mediaId }}
    //         >
    //             {({ loading, error, data }) => {
    //                 if (loading) return <div className="button is-loading"></div>;
    //                 if (error) return <p>Error</p>;

    //                 var sharedLinks = data.shared_links;

    //                 if (sharedLinks !== undefined && sharedLinks.length > 0) {
    //                     var mediaUrl = sharedLinks[0].expanded_url;

    //                     if (mediaUrl.startsWith("https://www.instagram.com")) {
    //                         mediaLinkButton = (
    //                             <div className="button" onClick={this.showModalMedia.bind(this)}>
    //                                 <i className="fab fa-instagram"></i>
    //                             </div>
    //                         )

    //                         mediaImage = sharedLinks[0].preview;
    //                     }
    //                     else {
    //                         mediaLinkButton = (
    //                             <div className="button" onClick={this.showModalMedia.bind(this)}>
    //                                 <i className="far fa-image"></i>
    //                             </div>
    //                         )

    //                         mediaImage = sharedLinks[0].preview;
    //                     }
    //                 }

    //                 var linkUrl = "/map?zoomto=" + this.props.mediaId;

    //                 // if(this.state.showModal){
    //                 //     var sideMedia = (
    //                 //         <SideMedia mediaId={this.props.mediaId} username={this.props.username} date={this.props.date} text={this.props.text} hideImage={this.showModal.bind(this)} 
    //                 //                     profilePic={this.props.profilePic} fullname={this.props.fullname} geometry={this.props.geometry} time={this.props.time}>
    //                 //         </SideMedia>
    //                 //     );
    //                 //     return sideMedia;
    //                 // }

    //                 return (
    //                     <article className="media" onClick={this.showModalMedia.bind(this)} data-mediaid={this.props.mediaId}>
    //                         <figure className="media-left">
    //                             <p className="image is-48x48">
    //                                 <img className="is-rounded" src={this.props.profilePic} alt="Placeholder image" />
    //                             </p>
    //                         </figure>
    //                         <div className="media-content">
    //                             <div className="content">
    //                                 <p>
    //                                     <strong>{this.props.fullname}</strong> <small>{this.props.username}</small> <small>{this.props.time}</small>
    //                                     <br />
    //                                     {this.props.text}
    //                                 </p>
    //                             </div>
    //                             <nav className="level is-mobile">
    //                                 <div className="level-left">
    //                                     <a className="level-item" target="_blank" href={replyToLink}>
    //                                         <span className="icon is-small"><i className="fas fa-reply"></i></span>
    //                                     </a>
    //                                     <a className="level-item" target="_blank" href={retweetLink}>
    //                                         <span className="icon is-small"><i className="fas fa-retweet"></i></span>
    //                                     </a>
    //                                     <a className="level-item" target="_blank" href={likeLink}>
    //                                         <span className="icon is-small"><i className="fas fa-heart"></i></span>
    //                                     </a>
    //                                 </div>
    //                             </nav>
    //                         </div>
    //                         <div className="media-right">
    //                             <div className="buttons">
    //                                 {mediaLinkButton}                            
    //                             </div>
    //                         </div>                            
    //                     </article>
    //                 );
    //             }}
    //         </Query>
    //     );
    // }
//}

Media.propTypes = {
    text: PropTypes.string,
    profilePic: PropTypes.string,
    fullname: PropTypes.string,
    username: PropTypes.string,
    tags: PropTypes.array,
    geometry: PropTypes.object,
    zoomTo: PropTypes.func,
    mediaLink: PropTypes.string,
    mediaId: PropTypes.string,
    mediaData: PropTypes.object,
    map: PropTypes.object,
    date: PropTypes.string
};

export default Media;