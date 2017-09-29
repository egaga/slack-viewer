"use strict";

import * as React from 'react';

import {SlackChannel} from './slack-channel/slack-channel';
import StyleContextProvider from './utils/style-context-provider';

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
import messages from '../slack-data/channel-data';

// Get all style content so that the isomorphic style provider can put them into React context
const getStyles = requireContext => requireContext.keys().map(requireContext);
const styles = getStyles(require.context('./', true, /\.css$/));

/*
 * Create application root element with given style context
 * @context may define a callback function to get used React styles
 */
export const appCreator = context => mainAuthor => (
  <StyleContextProvider context={context} styles={styles}>
    <SlackChannel mainAuthor={mainAuthor} messages={messages} />
  </StyleContextProvider>
);