import {SlackMessageParser} from './parser';
import {parseDetails} from './enhancer';
import {optimize} from './optimizer';

const imageFiletypes = [ "png", "jpg", "jpeg", "gif" ];

export function parse(message) {
  if (message.subtype === "file_share") {
    return parseWithFile(message);
  } else {
    return createCommon(message, message.text);
  }
}

function createCommon(message, text) {
  return {
    text: parseContent(text),
    ts: message.ts,
    user: message.user
  };
}

function parseWithFile(message) {
  const file = message.file;
  const text = file.initial_comment ? file.initial_comment.comment : "";

  let common = createCommon(message, text);

  //TODO comments_count pitäis tutkia myös, koska niitä voi olla enemmän kuin yksi
  if (imageFiletypes.indexOf(file.filetype) === -1) {
    return Object.assign({}, common, { file: 'unknown' });
  } else {
    return Object.assign({}, common, { image: getImageUrl(file) });
  }
}

function parseContent(content) {
  const parser = new SlackMessageParser(content);

  const structure = parser.parseStructure();
  const details = parseDetails(structure);
  return optimize(details);
}

function getImageUrl(file) {
  const prefix = 'img';
  const modified = file.name.replace(/\s/g, "_").toLowerCase();

  return prefix + '/' + modified;
}