import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';
import fetch from 'isomorphic-unfetch'
import { createHttpLink } from "apollo-link-http";
import { activeMessageIdVar } from '../appstate/cache'

let apolloClient = null


// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

function create (initialState) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: createHttpLink ({uri: 'https://gql.procyclingmap.net/v1/graphql'}), // Server URL (must be absolute),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            activeMessage: {
              read() {
                return activeMessageIdVar();
              }
            }
          }
        }
      }
    }).restore(initialState || {})
  })
}

export default function initApollo (initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}