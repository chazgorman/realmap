class Navbar extends React.Component {
    componentDidMount(){
        // Add script to handle navbar-burger activation
        document.addEventListener('DOMContentLoaded', () => {
            // Get all "navbar-burger" elements
            const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    
            // Check if there are any navbar burgers
            if ($navbarBurgers.length > 0) {
    
            // Add a click event on each of them
            $navbarBurgers.forEach( el => {
                el.addEventListener('click', () => {
    
                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);
    
                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');
    
                });
            });
          }});
      }
    render(){
        return (
            <nav className="navbar is-link is-fixed-top is-transparent" style={{zIndex:'2000'}}>
                <div className="navbar-brand">
                        <img src="/static/PCMLogoLight_SideIcon.png" alt="Pro Cycling Map. Explore the World of Pro Cycling!" width="260px" height="60px"/>
                    <div className="navbar-burger burger" data-target="navbarExampleTransparentExample">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>

            <div id="navbarExampleTransparentExample" className="navbar-menu">
                <div className="navbar-start">
                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">
                            About
                        </a>
                        <div className="navbar-dropdown is-boxed">
                            <a className="navbar-item" target="_blank" href="https://twitter.com/ProCyclingMap/">
                            <i className="fab fa-twitter"></i> Pro Cycling Map on Twitter
                            </a>
                            <a className="navbar-item" target="_blank" href="https://twitter.com/ChazGorman/">
                                <i className="fab fa-twitter"></i> Created by Charlie Gorman
                            </a>
                        </div>
                    </div>
                </div>
                <div className="navbar-end">
                <div className="navbar-item">
                    <div className="field is-grouped">
                    <p className="control">
                    <a className="bd-tw-button button" data-social-network="Twitter" data-social-action="tweet" data-social-target="http://procyclingmap.com" target="_blank" href="https://twitter.com/intent/tweet?text=Check out Pro Cycling Map. Tweets, Instagram posts, and Strava rides from pro cyclists in an online map!&amp;hashtags=procyclingmap,cycling,uci&amp;url=http://procyclingmap.com&amp;">
                        <span className="icon">
                            <i className="fab fa-twitter"></i>
                        </span>
                        <span>
                            Share
                        </span>
                        </a>
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </nav>
        );
    }
}

export default Navbar;