import Link from 'next/link'
import PropTypes from "prop-types"

class Card extends React.Component {
    render(){
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
                            <img className="is-rounded" src="http://pbs.twimg.com/profile_images/977594494391635968/cvqEwmaG_normal.jpg" alt="Placeholder image" />
                        </figure>
                    </div>
                    <div className="media-content">
                        <p className="title is-4">Simon Clarke</p>
                        <p className="subtitle is-6">@SimoClarke</p>
                    </div>
                    <div className="media-right">
                        <span class="icon" color="blue">
                            <i class="fab fa-twitter" color="blue"></i>
                        </span>
                    </div>
                    </div>
                    <div className="content">
                    Really enjoyed racing on home roads in Andorra 🇦🇩 for Stage 20, now off to Madrid for the final parade. #Vuelta18 @Ride_Argyle #pinkargyle \n📸 @jeredgruber \n.\n.\n.\n@cannondalePro @pocsports…
                    <a>@bulmaio</a>.
                    <a href="#">#Vuelta18</a> <a href="#">#pinkargyle</a>
                    <br />
                    <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
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
};