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

const app = appCreator(context)("komu");

const content = ReactDOMServer.renderToStaticMarkup(app);
const css = cssArray.join(" ")

const html =
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <title>Slack channel viewer</title>
    <style type="text/css">${css}</style>
    <style type="text/css">
        h1 {
            text-align: center;
        }
        .introduction-to-channel {
            font-size: 15px;
            font-weight: normal;
        }
    </style>
</head>
<body>
    <h1>#abletonlive <span class="introduction-to-channel">komu opettaa musiikin teoriaa ja Abletonin käyttöä.</span></h1>
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