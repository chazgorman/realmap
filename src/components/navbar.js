import gql from 'graphql-tag'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'

// export const allAppQuery = gql`
//   query allPosts($first: Int!, $skip: Int!) {
//     allApps(first: $first, skip: $skip) {
//       id
//       name
//     }
//     _allAppsMeta {
//       count
//     }
//   }
// `
// export const allAppsQueryVars = {
//     skip: 0,
//     first: 10
// }

export default function Navbar() {
    const router = useRouter()

    var geoTaggedLinkClass = "navbar-item";
    var mediaLinkClass = "navbar-item";

    if (router.pathname == "/media") {
        mediaLinkClass = mediaLinkClass + " is-active";
    }
    else {
        geoTaggedLinkClass = geoTaggedLinkClass + " is-active";
    }

    return (
        <nav className="navbar is-link is-fixed-top is-transparent" style={{ zIndex: '1000' }}>
            <div className="navbar-brand">
                <a href="/">
                    <img src="/static/PCMLogoLight_SideIcon.png" alt="Pro Cycling Map. Explore the World of Pro Cycling!" width="260px" height="60px" />
                </a>
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
                            Feed
                        </a>
                        <div className="navbar-dropdown">
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
                        </div>
                    </div>
                </div>
                <div className="navbar-end">
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