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
                <p className="image is-64x64">
                <img src="https://bulma.io/images/placeholders/128x128.png" />
                </p>
            </figure>
            <div className="media-content">
                <div className="content">
                <p>
                    <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
                    <br />
                    {this.props.text}
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