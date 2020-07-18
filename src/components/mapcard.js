import Link from 'next/link'
import PropTypes from "prop-types"

class Card extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {zooming: false};
    }
    zoomTo(){
        console.log("In zoomTo", this.props.geometry);
        var card = this;
        var geom = this.props.geometry;
        var map = this.props.geometry._layer._map;        
        this.setState({zooming:true});

        map.centerAndZoom(geom.geometry, 8).then(function(result){
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

        return (
            <div className="card">
                {/* <div className="card-image">
                    <figure className="image is-square">
                        <img src="https://www.instagram.com/p/BnxzJn4FS8D/media?size=m" alt="Placeholder image" />
                    </figure>
                </div> */}
                <div className="card-content">
                    <div className="media">
                    <div className="media-left">
                        <figure className="image is-48x48">
                            <img className="is-rounded" src={this.props.profilePic} alt="Placeholder image" />
                        </figure>
                    </div>
                    <div className="media-content">
                        <p className="title is-4">{this.props.fullname}</p>
                        <p className="subtitle is-6">{this.props.username}</p>
                    </div>
                    <div className="media-right">
                        <span className="icon" color="blue">
                            <i className="fab fa-twitter" color="blue"></i>
                        </span>
                        <div className={buttonClassname} onClick={this.zoomTo.bind(this)}>
                            <i className="fas fa-globe" color="blue"></i>
                        </div>
                    </div>
                    </div>
                    <div className="content">
                        {this.props.text}
                    <a>@bulmaio</a>.
                    {/* <a href="#">#Vuelta18</a> <a href="#">#pinkargyle</a>
                    <br />
                    <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;

Card.propTypes = {
    text: PropTypes.string,
    profilePic: PropTypes.string,
    fullname: PropTypes.string,
    username: PropTypes.string,
    tags: PropTypes.array,
    geometry: PropTypes.object,
    zoomTo: PropTypes.func,
    mediaId: PropTypes.string
};