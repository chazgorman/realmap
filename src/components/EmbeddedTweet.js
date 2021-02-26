import React from 'react';
import { useQuery, gql, useReactiveVar } from '@apollo/client';
import { activeMessageIdVar, showMobileMapMode } from '../appstate/cache'
import { TwitterTweetEmbed } from 'react-twitter-embed';

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

export default function EmbeddedTweet({ messageid }) {
    const activeMessages = useReactiveVar(activeMessageIdVar);

    return (
        <TwitterTweetEmbed tweetId={messageid} />
    );
}