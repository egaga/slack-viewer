# Slack channel viewer

Creates styled html document out of a slack channel data.
This is not fully serious attempt because custom parser is implemented for fun.

## Process to get data from slack channel to web host
- get data with https://www.npmjs.com/package/slack-history-export
- get your slack api token from https://api.slack.com/tokens
- set the data to channel-data.js

```
export const mainAuthor = 'Henkka';
export const messages = [
    { ts: '242', user: 'Henkka',text: 'Here is my opinion' }, 
    { ts: '555', user: 'Reetta', text: 'No, it is mine!' }
];
```

- `npm run render`
- `node build/render.js > index.html`
- copy index.html to web host (e.g. with Transmit)
- images must be handled manually

## Developing

`npm install` sets up the project.
`npm run serve` serves react app using webpack-dev-server

## TODO
- create one script that syncs all data from channel to local directory
- script should take authentication token and channel name as params
- check what images are already loaded and load the rest of the images
- create fresh index.html based on channel content
- support formatting syntax better, e.g. bold