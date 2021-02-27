import React from 'react';
import { useReactiveVar } from '@apollo/client';
import { activeMessageIdVar } from '../appstate/cache';
import { TwitterTweetEmbed } from 'react-twitter-embed';

export default function EmbeddedTweet({messageid}) {
    const activeMessages = useReactiveVar(activeMessageIdVar);

    var msgId = messageid;
    if(activeMessages !== undefined && activeMessages.length > 0){
        msgId = activeMessages[0];
    }

    return (
        <TwitterTweetEmbed key={msgId} tweetId={msgId} placeholder="Loading Tweet..."/>
    );
}