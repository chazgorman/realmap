import Navbar from './navbar'
import FootNavbar from './footnavbar'
import Head from 'next/head'

export default ({ children, title = 'This is the default title' }) => (
    <div>
      <Head>
      <title>{title}</title>
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

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.min.css"></link>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous" />

        <script type="text/javascript" src="./static/attachNavbarBurgerClick.js"></script>
      </Head>
      <Navbar></Navbar>
  
      {children}
  
      <FootNavbar></FootNavbar>
    </div>
  )