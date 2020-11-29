import PropTypes from "prop-types"
import Link from 'next/link'
import { withApollo } from 'react-apollo';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import EsriModalMap from './modalmap'
import SideMedia from './sidemedia'

export const embedUrl = "https://pcm-embed-rompi.ondigitalocean.app/oembedresponse?request=";

export const mediaForMsgQuery = gql`
query($messageid: String) {
    shared_links(where: {message_id: {_eq: $messageid}}) {
          message_id
          url
          expanded_url
          source
          host
          location
    }
  }`

class Media extends React.Component {

    constructor(props) {
        super(props);

        this.state = { zooming: false, showModal: false, showMedia: true, sharedLinks: [] };
        var thisMedia = this;
    }
    showModal() {
        var value = this.state.showModal === true ? false : true;

        this.setState({ showModal: value });
    }
    showModalMedia(zoom) {
        if(zoom){
            this.zoomTo();
        }
        this.setState({ showModal: true, showMedia: true, showMap: false });
    }
    showModalMap() {
        this.setState({ showModal: true, showMedia: false, showMap: true });
    }
    setSharedLinks(sharedLinks) {
        this.setState({ sharedLinks: sharedLinks });
    }
    zoomTo() {
        console.log("In zoomTo", this.props.geometry);
        var card = this;
        var geom = this.props.geometry;
        var map = this.props.map;
        this.setState({ zooming: true });

        var options = {
            target: geom,
            zoom: 12,
            tilt: 45        
        };
        map.goTo(options).then(function (result) {
            card.setState({ zooming: false });
        })
    }
    getInstagramEmbed(url) {
        //this.embedUrl = "https://pcm-embed-rompi.ondigitalocean.app/oembedresponse?request=";
        var retData = null;
        var request = embedUrl + url;
        console.log("Making instagram embed request: " + request);
        fetch(request)
            .then(response => response.json())
            .then(data => retData = data);

        console.log(retData)
        return retData;
    }
    render() {
        var retweetLink = "https://twitter.com/intent/retweet?tweet_id=" + this.props.mediaId;
        var replyToLink = "https://twitter.com/intent/tweet?in_reply_to=" + this.props.mediaId;
        var likeLink = "https://twitter.com/intent/like?tweet_id=" + this.props.mediaId;

        var mediaLinkButton = undefined;
        var mediaImage = undefined; //"https://www.instagram.com/p/BtbXwXgFqevg2e_zNtzD9ED8HPodoyLbi0KoA00/media?size=l"

        return (
            <Query
                query={mediaForMsgQuery}
                variables={{ messageid: this.props.mediaId }}
            >
                {({ loading, error, data }) => {
                    if (loading) return <div className="button is-loading"></div>;
                    if (error) return <p>Error</p>;

                    var sharedLinks = data.shared_links;

                    if (sharedLinks !== undefined && sharedLinks.length > 0) {
                        var mediaUrl = sharedLinks[0].expanded_url;

                        if (mediaUrl.startsWith("https://www.instagram.com")) {
                            mediaLinkButton = (
                                <div className="button" onClick={this.showModalMedia.bind(this)}>
                                    <i className="fab fa-instagram"></i>
                                </div>
                            )

                            var linkParts = mediaUrl.split("?");
                            if (linkParts != undefined && linkParts.length == 2) {
                                //mediaImage = linkParts[0] + "media?size=l";
                                embedJson = this.getInstagramEmbed(linkParts[0])
                                mediaImage = embedJson.thumbnail_url;
                            }
                        }
                        else {
                            mediaLinkButton = (
                                <div className="button" onClick={this.showModalMedia.bind(this)}>
                                    <i className="far fa-image"></i>
                                </div>
                            )

                            mediaImage = sharedLinks[0].source;
                        }
                    }

                    var linkUrl = "/map?zoomto=" + this.props.mediaId;

                    if(this.state.showModal){
                        var sideMedia = (
                            <SideMedia mediaId={this.props.mediaId} username={this.props.username} date={this.props.date} text={this.props.text} hideImage={this.showModal.bind(this)} 
                                        profilePic={this.props.profilePic} fullname={this.props.fullname} geometry={this.props.geometry} time={this.props.time}>
                            </SideMedia>
                        );
                        return sideMedia;
                    }

                    return (
                        <article className="media" onClick={this.showModalMedia.bind(this)} data-mediaid={this.props.mediaId}>
                            <figure className="media-left">
                                <p className="image is-48x48">
                                    <img className="is-rounded" src={this.props.profilePic} alt="Placeholder image" />
                                </p>
                            </figure>
                            <div className="media-content">
                                <div className="content">
                                    <p>
                                        <strong>{this.props.fullname}</strong> <small>{this.props.username}</small> <small>{this.props.time}</small>
                                        <br />
                                        {this.props.text}
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
                }}
            </Query>
        );
    }
}

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

export default withApollo(Media);