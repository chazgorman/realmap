import PropTypes from "prop-types"
import Link from 'next/link'
import { withApollo } from 'react-apollo';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import EsriModalMap from './modalmap'

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

class SideMedia extends React.Component {
    constructor(props) {
        super(props);

        this.state = { zooming: false, showModal: true, showMedia: true, sharedLinks: [] };
    }
    showModal() {
        var value = this.state.showModal === true ? false : true;

        this.setState({ showModal: value, showMap: !value });
    }
    showModalMedia() {
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
    render() {
        var buttonClassname = "button is-link is-hidden-desktop";
        if (this.state.zooming) {
            buttonClassname += " is-loading";
        } else if (this.props.selected) {
            buttonClassname += "is-success is-outlined";
        }

        var retweetLink = "https://twitter.com/intent/retweet?tweet_id=" + this.props.mediaId;
        var replyToLink = "https://twitter.com/intent/tweet?in_reply_to=" + this.props.mediaId;
        var likeLink = "https://twitter.com/intent/like?tweet_id=" + this.props.mediaId;

        var imageModal = undefined;

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
                                <div className="button is-hidden-touch" onClick={this.showModalMedia.bind(this)}>
                                    <i className="fab fa-instagram"></i>
                                </div>
                            )

                            var linkParts = mediaUrl.split("?");
                            if (linkParts != undefined && linkParts.length == 2) {
                                mediaImage = linkParts[0] + "media?size=l";
                            }
                        }
                        else {
                            mediaLinkButton = (
                                <div className="button is-hidden-touch" onClick={this.showModalMedia.bind(this)}>
                                    <i className="far fa-image"></i>
                                </div>
                            )

                            mediaImage = sharedLinks[0].source;
                        }
                    }

                    // ----------
                    var mobileMapButtonGroup = (<div className="buttons">
                        <div className={buttonClassname} onClick={this.showModalMap.bind(this)}>
                            <i className="fas fa-globe" color="blue"></i>
                        </div>
                        <button className="delete" aria-label="close" onClick={this.props.hideImage}></button>
                    </div>)

                    var imageModal = undefined;

                    if (this.state.showModal && this.state.showMedia == true) {
                        imageModal = (
                            <article className="message">
                                <div className="message-header">
                                    <p>@{this.props.username}</p>
                                    {mobileMapButtonGroup}
                                </div>
                                <section className="message-body">
                                    <div className="image is-2by2">
                                        <img src={mediaImage} alt="" />
                                        {/* <div className="is-overlay" style={{ background: 'rgba(75, 104, 133, 0.7)', margin: '1vh', fontSize: 'large', color: 'white', bottom: '0', top: 'unset' }}>{this.props.text}</div> */}
                                    </div>
                                    <div>
                                        <p>{this.props.text}</p>
                                    </div>
                                </section>
                            </article>
                        );
                    }
                    else if (this.state.showModal && this.state.showMap == true) {
                        this.map = (<EsriModalMap containerId={this.props.mediaId} geometry={this.props.geometry} />);
                        imageModal = (
                            <article className="message">
                                <div className="message-header">
                                    <p>@{this.props.username}</p>
                                    {mobileMapButtonGroup}
                                </div>
                                <section className="message-body">
                                    <div id={this.props.mediaId} style={{ height: "60vh" }}></div>
                                    <div>
                                        <p>{this.props.text}</p>
                                    </div>
                                </section>
                                {this.map}
                            </article>
                        );
                    }

                    return (
                        <article className="media">
                            {imageModal}
                        </article>
                    );
                }}
            </Query>
        );
    }
}

SideMedia.propTypes = {
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
    date: PropTypes.string,
    hideImage: PropTypes.func
};

export default withApollo(SideMedia);