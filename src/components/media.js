import PropTypes from "prop-types"
import Link from 'next/link'

class Media extends React.Component {

    constructor(props) {
        super(props);
    }
    render(){
        return (
            <article className="media">
            <figure className="media-left">
            
                <p className="image is-48x48">
                {/* <img src="https://www.instagram.com/p/BnxzJn4FS8D/media?size=t" alt="Placeholder image" /> */}
                <img className="is-rounded" src="http://pbs.twimg.com/profile_images/977594494391635968/cvqEwmaG_normal.jpg" alt="Placeholder image" />

                </p>                
            </figure>
            <div className="media-content">
                <div className="content">
                <p>
                    <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
                    <br />
                    Really enjoyed racing on home roads in Andorra 🇦🇩 for Stage 20, now off to Madrid for the final parade. #Vuelta18 @Ride_Argyle #pinkargyle \n📸 @jeredgruber \n.\n.\n.\n@cannondalePro @pocsports…
                    <a>@bulmaio</a>.
                </p>
                </div>
                <nav className="level is-mobile">
                <div className="level-left">
                    <a className="level-item">
                    <span className="icon is-small"><i className="fas fa-reply"></i></span>
                    </a>
                    <a className="level-item">
                    <span className="icon is-small"><i className="fas fa-retweet"></i></span>
                    </a>
                    <a className="level-item">
                    <span className="icon is-small"><i className="fas fa-heart"></i></span>
                    </a>
                </div>
                </nav>
            </div>
            <div className="media-right">
                <button className="delete"></button>
            </div>
            </article>
        );
    }
}

export default Media;

Media.propTypes = {
    text: PropTypes.string,
    img: PropTypes.string,
    user: PropTypes.string
};