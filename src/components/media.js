import PropTypes from "prop-types"
import Link from 'next/link'
import { withApollo } from 'react-apollo';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import EsriModalMap from './modalmap'
import SideMedia from './sidemedia'

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

        // this.props.client.query({
        //     query: mediaForMsgQuery,
        //     variables: {
        //         messageid: this.props.mediaId
        //     }
        // }).then(result => thisMedia.setState({ sharedLinks: result.data }));
    }
    showModal() {
        var value = this.state.showModal === true ? false : true;

        this.setState({ showModal: value, showMap: !value });
    }
    showModalMedia() {
        this.zoomTo();
        this.setState({ showModal: true, showMedia: true });
    }
    showModalMap() {
        this.setState({ showModal: true, showMedia: false });
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
        var buttonClassname = "button is-link";
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
                                <div className="button" onClick={this.showModalMedia.bind(this)}>
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
                                <div className="button" onClick={this.showModalMedia.bind(this)}>
                                    <i className="far fa-image"></i>
                                </div>
                            )

                            mediaImage = mediaUrl;
                        }
                    }

                    // ----------
                    var mobileMapButtonGroup = (<div className="buttons">
                        <div className={buttonClassname} onClick={this.showModalMap.bind(this)}>
                            <i className="fas fa-search" color="blue"></i>
                        </div>
                        <button className="delete" aria-label="close" onClick={this.showModal.bind(this)}></button>
                    </div>)

                    // ---------
                    var mapLinkButtonMobile = (<div className="is-hidden-desktop">
                        <div className={buttonClassname} onClick={this.showModalMap.bind(this)}>
                            <i className="fas fa-search" color="blue"></i>
                        </div>
                    </div>)

                    var mapLinkButtonDesktop = (<div className="is-hidden-touch">
                        <div className={buttonClassname} onClick={this.zoomTo.bind(this)}>
                            <i className="fas fa-search" color="blue"></i>
                        </div>
                    </div>)

                    if (this.state.showModal && this.state.showMedia == true) {
                        imageModal = (
                            <div className="modal is-active" style={{ zIndex: '1005' }}>
                                <div className="modal-background"></div>
                                <div className="modal-card">
                                    <header className="modal-card-head">
                                        <p className="modal-card-title"><strong>{this.props.username}</strong> <small>{this.props.time}</small></p>
                                        {mobileMapButtonGroup}
                                    </header>
                                    <section className="modal-card-body">
                                        <p className="image is-2by2">
                                            <img src={mediaImage} alt="" />
                                        </p>
                                    </section>
                                    <footer className="modal-card-foot">
                                        <p>{this.props.text}</p>
                                    </footer>
                                </div>
                            </div>
                        );
                    }
                    else if (this.state.showModal && this.state.showMedia == false) {
                        this.map = (<EsriModalMap geometry={this.props.geometry} />);
                        imageModal = (
                            <div className="modal is-active" style={{ zIndex: '1005' }}>
                                <div className="modal-background"></div>
                                <div className="modal-card">
                                    <header className="modal-card-head">
                                        <p className="modal-card-title"><strong>{this.props.username}</strong> <small>{this.props.time}</small></p>
                                        {<div className="buttons">
                                            {mediaLinkButton}
                                            <button className="delete" aria-label="close" onClick={this.showModal.bind(this)}></button>
                                        </div>}
                                    </header>
                                    <section className="modal-card-body">
                                        <div id="modal-map" style={{height:"300px", width:"300px"}}></div>
                                    </section>
                                    <footer className="modal-card-foot">
                                        <p>{this.props.text}</p>
                                    </footer>
                                </div>
                                {this.map}
                            </div>
                        );
                    }

                    var linkUrl = "/map?zoomto=" + this.props.mediaId;

                    var sideMedia = (
                        <SideMedia mediaId={this.props.mediaId} text={this.props.text} hideImage={this.showModal.bind(this)}></SideMedia>
                    );

                    if(this.state.showModal){
                        return sideMedia;
                    }

                    return (
                        <article className="media">
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
                                    {mapLinkButtonMobile}
                                    {mapLinkButtonDesktop}
                                </div>
                            </div>
                            {imageModal}
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