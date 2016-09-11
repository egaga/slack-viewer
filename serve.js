/*
 Render as React application.
*/

import * as ReactDOM from 'react-dom';
import * as React from 'react';

import {appCreator} from './src/app-creator';

const context = {
  insertCss: styles => {
    if (Array.isArray(styles)) {
      const removeCss = styles.map(style => style._insertCss());
      return () => removeCss.forEach(f => f());
    } else {
      return styles._insertCss();
    }
  }
};

const app = appCreator(context)("komu");

const channelContainer = document.getElementById('channel-container');
if (!channelContainer) throw "Channel container";

ReactDOM.render(app, channelContainer);