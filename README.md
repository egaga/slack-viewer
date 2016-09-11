# Slack channel viewer

Creates styled html document out of a slack channel data.
This is not fully serious attempt because custom parser is implemented for fun.

## Process to get data from slack channel to web host
- get data with https://www.npmjs.com/package/slack-history-export
- set the data to channel-data.ts
- `npm run render`
- `node build/render.js > index.html`
- use transmit to copy index.html to web host
- images must be handled manually

## Developing

`npm run serve` serves react app

## TODO
- create one script that syncs all data from channel to local directory
- script should take authentication token and channel name as params
- check what images are already loaded and load the rest of the images
- create fresh index.html based on channel content
- support formatting syntax better, e.g. bold