import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import Navbar from '../src/components/navbar'
import FootNavbar from '../src/components/footnavbar'
import Card from '../src/components/card'

class MyDocument extends Document {
  render() {

    return (
      <html lang="en" dir="ltr" style={{ height: '100%' }}>
      <head>
        <title>Pro Cycling Map</title>
        <meta charSet="utf-8" />
        {/* Use minimum-scale=1 to enable GPU rasterization */}
        <meta
          name="viewport"
          content={
            'user-scalable=0, initial-scale=1, ' +
            'minimum-scale=1, width=device-width, height=device-height'
          }
        />
        {/* PWA primary color */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
        />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.4.0/leaflet.css"></link>

        <link rel="stylesheet" href="https://js.arcgis.com/3.27/esri/css/esri.css" />

        {/* <link rel="stylesheet" href="https://js.arcgis.com/4.10/esri/css/main.css" /> */}

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.min.css"></link>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous" />

        <script type="text/javascript" src="./static/attachNavbarBurgerClick.js"></script>
      </head>
      <body className="has-navbar-fixed-top has-navbar-fixed-bottom" style={{height: '100%'}}>
          <Navbar />
          <div className="columns is-gapless" style={{ width: '100%', height: '100%' }}>
            <div class="column" style={{ width: '100%', height: '100%' }}>
              <Card />
            </div>
            <div className="column">
              <div id="map" style={{ width: '100%', height: '100%' }} />
            </div>
          </div>
          <FootNavbar />
      <Main />
      <NextScript />
      </body>
      </html>
    );
  }
}

export default MyDocument;
