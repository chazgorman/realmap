import Link from 'next/link'

class FootNavbar extends React.Component {
    render(){
        return (
            <nav className="navbar is-link is-fixed-bottom is-desktop" role="navigation" style={{zIndex:'2000'}}>
                <div className="navbar-brand">
                    <Link className="center" href='/'>
                        <a className="navbar-item is-expanded">
                            <i className="fas fa-home"></i>
                            <p className="is-size-7">Home</p>
                        </a>
                    </Link>
                    <Link href="/map">
                        <a className="navbar-item is-expanded">
                            <i className="fas fa-map"></i>
                            <p className="is-size-7">Map</p>
                        </a>
                    </Link>
                    <Link href="/medialist">
                        <a className="navbar-item is-expanded">
                            <i className="fas fa-images"></i>
                            <p className="is-size-7">Gallery</p>
                        </a>
                    </Link>
                </div>
            </nav>
        );
    }
}

export default FootNavbar;