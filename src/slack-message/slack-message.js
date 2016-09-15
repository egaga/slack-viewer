import * as React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './style.css';
import {renderFile, renderImage} from './file/render-file';
import {renderToken} from './token/token-renderer'

const SlackMessageView = ({message, mainAuthor}) => {
  if (message.file) {
    return renderFileWithComment(renderFile(message), message, mainAuthor);
  } else if (message.image) {
    return renderFileWithComment(renderImage(message), message, mainAuthor);
  } else {
    return renderComment(message, mainAuthor);
  }
};

function renderFileWithComment(renderedFile, message, mainAuthor) {
  const comment = renderComment(message, mainAuthor, styles.imageComment);
  return <div>{renderedFile} {comment}</div>;
}

function renderComment(message, mainAuthor, style) {
  if (message.text.length === 0) return null;

  const isMainAuthor = message.user === mainAuthor;
  const user = isMainAuthor ? null : message.user;
  const messageStyle = style || (isMainAuthor ? styles.comment : styles.otherComment);

  const rendered = renderToken(message.text);

  return (
    <div className={messageStyle} id={message.ts}>
      <div className={styles.commenter}>
        {user} <a title="Link to comment" className={styles.commenterLink} href={'#'+message.ts}>&#x266b;</a>
      </div>
      <div className={styles.message}>{rendered}</div>
    </div>
  );
}

export default withStyles(styles)(SlackMessageView);