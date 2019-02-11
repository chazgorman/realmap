import PropTypes from "prop-types"
import Link from 'next/link'

class Media extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {zooming: false, showMedia: false};
    }
    showMedia(){        
        var value = this.state.showMedia === true ? false : true;
        this.setState({showMedia:value});        
    }
    zoomTo(){
        console.log("In zoomTo", this.props.geometry);
        var card = this;
        var geom = this.props.geometry;
        var map = this.props.geometry._layer._map;        
        this.setState({zooming:true});

        map.centerAndZoom(geom.geometry, 14).then(function(result){
            card.setState({zooming:false});
        })
    }
    render(){
        var buttonClassname = "button is-link";
        if(this.state.zooming){
            buttonClassname += " is-loading";
        } else if(this.props.selected){
            buttonClassname += "is-success is-outlined";
        }

        var retweetLink = "https://twitter.com/intent/retweet?tweet_id=" + this.props.mediaId;
        var replyToLink = "https://twitter.com/intent/tweet?in_reply_to=" + this.props.mediaId;
        var likeLink = "https://twitter.com/intent/like?tweet_id=" + this.props.mediaId;

        var imageModal = undefined;

        var mediaLinkButton = undefined;
        var mediaImage = undefined; //"https://www.instagram.com/p/BtbXwXgFqevg2e_zNtzD9ED8HPodoyLbi0KoA00/media?size=l"

        if(this.props.mediaLink != undefined && this.props.mediaLink !== ""){


            if(this.props.mediaLink.startsWith("https://www.instagram.com")){
                mediaLinkButton = (
                    <div className="button" onClick={this.showMedia.bind(this)}>
                        <i className="fab fa-instagram"></i>
                    </div>            
                )

                var linkParts = this.props.mediaLink.split("?");
                if(linkParts != undefined && linkParts.length == 2){
                    mediaImage = linkParts[0] + "media?size=l";
                }
            }
            else
            {
                mediaLinkButton = (
                    <div className="button" onClick={this.showMedia.bind(this)}>
                        <i className="far fa-image"></i>
                    </div>            
                )

                mediaImage = this.props.mediaLink;
            }
        }

        if(this.state.showMedia){
            imageModal = (
                <div className="modal is-active">
                <div className="modal-background"></div>
                <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title"><strong>{this.props.fullname}</strong> <small>{this.props.username}</small> <small>42m</small></p>
                    <button className="delete" aria-label="close" onClick={this.showMedia.bind(this)}></button>
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
                    <strong>{this.props.fullname}</strong> <small>{this.props.username}</small> <small>42m</small>
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
                    <div className={buttonClassname} onClick={this.zoomTo.bind(this)}>
                        <i className="fas fa-search" color="blue"></i>
                    </div>
                </div>
            </div>
            {imageModal}
            </article>
        );
    }
}

export default Media;

Media.propTypes = {
    text: PropTypes.string,
    profilePic: PropTypes.string,
    fullname: PropTypes.string,
    username: PropTypes.string,
    tags: PropTypes.array,
    geometry: PropTypes.object,
    zoomTo: PropTypes.func,
    mediaLink: PropTypes.string,
    mediaId: PropTypes.string
};