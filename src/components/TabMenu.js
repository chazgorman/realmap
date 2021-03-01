import gql from 'graphql-tag'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function TabMenu() {
    const router = useRouter()

    var geoTaggedLinkClass = "navbar-item is-link is-light";
    var mediaLinkClass = "navbar-item is-link is-light";

    if(router.pathname == "/media"){
        mediaLinkClass = mediaLinkClass + " is-active";
    }
    else {
        geoTaggedLinkClass = geoTaggedLinkClass + " is-active";
    }

    return (
        <div className="tabs is-hidden-desktop is-toggle is-centered is-fullwidth">
            <ul>
                <Link href="/">
                    <a className={geoTaggedLinkClass}>
                        <span className="icon"><i className="fas fa-globe" /></span>
                        <span>Geo-Tagged Posts</span>
                    </a>
                </Link>
                <Link href="/media">
                    <a className={mediaLinkClass}>
                        <span className="icon"><i className="fas fa-image" /></span>
                        <span>All Posts - Teams, Riders, News, Results</span>
                    </a>
                </Link>
            </ul>
        </div>
    );
}