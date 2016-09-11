"use strict";

import React from 'react';

import SlackChannelView from './slack-channel-view';
import {parse} from '../parsing/parse';

const acceptedSubtypes = ['file_share'];
const showMessage = message => !message.subtype || acceptedSubtypes.indexOf(message.subtype) !== -1;

export const SlackChannel = ({mainAuthor, messages}) => {
  const filtered = messages.filter(showMessage);

  const rendeableMessages = filtered
    .map(message => ({
      id: message.ts,
      message: message,
      viewModel: parse(message)
    }));

  return <SlackChannelView mainAuthor={mainAuthor} messages={rendeableMessages} />;
};