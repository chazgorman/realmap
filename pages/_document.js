import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
// import JssProvider from 'react-jss/lib/JssProvider';
// import getPageContext from '../src/getPageContext';
// import 'leaflet/dist/leaflet.css'

class MyDocument extends Document {
  render() {

    return (
      <html lang="en" dir="ltr" style={{ height: '100%' }}>
      <Head>
        <title>My page</title>
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
      </Head>
      <body style={{ height: '100%' }}>
      <div id="map" style={{ width: '100%', height: '100%' }} />
      <Main />
      <NextScript />
      </body>
      </html>
    );
  }
}

export default MyDocument;
