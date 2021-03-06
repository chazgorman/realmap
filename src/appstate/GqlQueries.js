import { gql } from '@apollo/client';

const TOP30_HASHTAGS_LAST7DAYS = gql`
{
  tophashtags: top30_hashtags_last_7_days(limit:30) {
      tag
      tagcount
  }
}
`

const ALL_HASHTAGS_LAST7DAYS = gql`
{
  tophashtags: hashtags_last_7_days {
      tag
      message_id
      territory
  }
}
`

export const GEOMSGS_BY_HASHTAGS_LAST_14_DAYS = gql`
query($tags: _text!){
    messages: geomsgs_by_hashtag_last_14_days(args: {tags: $tags}) {
        contributor_name
        message_id
        location
    }
}
`

export const GEOMSGS_LAST_14_DAYS = gql`
query($msglimit: Int!){
    messages: geomessages_last_14_days(limit: $msglimit) {
        contributor_name
        message_id
        location
    }
}
`


// export const GEOMSGS_BY_HASHTAGS = gql`
// query($tags: [String!], $msglimit: Int!){
//     tags: hashtags_last_14_days(where: {tag: {_in: $tags}}) {
//         tag
//         message_id
//         territory
//     }
//     messages: geomessages_last_14_days(limit: $msglimit) {
//         contributor_name
//         message_id
//         location
//     }
// }
// `

export const MSGS_BY_HASHTAGS_LAST_14_DAYS = gql`
query($tags: _text!){
    messages: msgs_by_hashtag_last_14_days(args: {tags: $tags}) {
        contributor_name
        message_id
        location
    }
}
`

export const MSGS_LAST_14_DAYS = gql`
query($msglimit: Int!){
    messages: messages_last_14_days(limit: $msglimit) {
        contributor_name
        message_id
        location
    }
}
`

const MSG_BY_ID_QUERY = gql`
query($messageid: String) {
    shared_links(where: {message_id: {_eq: $messageid}}) {
        message_id
        url
        expanded_url
        source
        host
        location
        preview
    }
    messages: messages_last_14_days(where: {message_id: {_eq: $messageid}}) {
        harvest_id
        contributor_screen_name
        contributor_name
        https_contributor_profile_pic
        message
        message_id
        time
        like_count
        twitter_favorite_count
        twitter_favorite_count
        network
        location
    }
  }`