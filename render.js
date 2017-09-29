/*
 Render application as static html document to console output.
*/

import ReactDOMServer from 'react-dom/server';
import React from 'react';

import {minify} from 'html-minifier';

import {appCreator} from './src/app-creator';

// Collect all of the React css
const cssArray = [];
const context = {
  insertCss: styles => {
    if (Array.isArray(styles)) {
      styles.forEach(style => cssArray.push(style._getCss()));
    } else {
      cssArray.push(styles._getCss())
    }
  }
};

const app = appCreator(context);

const content = ReactDOMServer.renderToStaticMarkup(app);
const css = cssArray.join(" ");

const html =
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <title>Slack channel viewer</title>
    <style type="text/css">${css}</style>
</head>
<body>
    <div id="channel-container">
      ${content}
    </div>
</body>
</html>`;

const minified = minify(html, {
  minifyCSS: true,
  removeEmptyElements: true,
  removeComments: true
});

console.log(minified);