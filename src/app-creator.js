"use strict";

import * as React from 'react';

import {SlackChannel} from './slack-channel/slack-channel';
import StyleContext from 'isomorphic-style-loader/StyleContext';

/*
 Channel data is an array of slack messages, e.g. a channel with one message could have the following properties
 [{
 "type": "message",
 "user": "egaga",
 "text": "This message is just for demonstration purposes.",
 "ts": "1465206895.000005",
 "date": 1465206895000
 }]
 */
import {messages, mainAuthor} from '../slack-data/channel-data';

/*
 * Create application root element with given style context
 * @context may define a callback function to get used React styles
 */
export const appCreator = ({insertCss}) => (
  <StyleContext.Provider value={{ insertCss }}>
    <SlackChannel mainAuthor={mainAuthor} messages={messages} />
  </StyleContext.Provider>
);