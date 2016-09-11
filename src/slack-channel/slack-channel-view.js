import React from 'react';

import SlackMessageView from '../slack-message/slack-message';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './style.css';

const messageView = (msg, mainAuthor) => (
  <SlackMessageView key={msg.id}
                    message={msg.viewModel}
                    mainAuthor={mainAuthor} />);

const SlackChannel = ({mainAuthor, messages}, context) => (
  <div className={styles.channel}>
    {messages.map(msg => messageView(msg, mainAuthor))}
  </div>
);

export default withStyles(styles)(SlackChannel);