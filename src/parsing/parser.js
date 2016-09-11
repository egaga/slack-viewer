
const wrappers = {
  'italics': createWrapper('_', '_'),
  'url': createWrapper('<', '>', false), // TODO if | then comment for the link
  'smiley': createWrapper(':', ':'),
  'multiline': createWrapper('```', '```', false),
  'pre': createWrapper('`', '`', false)
};

const encodings = {
  'greaterThan': '&gt;',
  'lowerThan': '&lt;'
}

const separators = [" ", ',', '.'];

const tokenTypes = {
  normal: "normal"
}

export class SlackMessageParser {

  constructor(input) {
    this.input = input;
    this.parsed = [];
    this.currentWrapper = null;
    this.currentWord = "";
  }

  readChar() {
    const result = this.input[0];
    this.input = this.input.slice(1);
    return result;
  }

  addWord(word, type) {
    const elem = {};
    elem[type] = word;
    this.parsed.push(elem);
  }

  addCurrentWord(type) {
    this.addWord(this.currentWord, type);
    this.currentWord = "";
  }

  peekAmount(n) {
    return this.input.slice(0, n);
  }

  isNextChars(chars) {
    return chars === this.peekAmount(chars.length);
  }

  matchNextChars(chars, type) {
    if (!this.isNextChars(chars))
      return false;

    if (this.currentWord) {
      this.addCurrentWord(tokenTypes.normal);
    }

    this.addWord(chars, type);
    this.popChars(chars.length);

    return true;
  }

  popChars(n) {
    this.input = this.input.slice(n);
  }

  matchWrapperStarts() {
    for(let prop in wrappers) {
      if (this.currentWord.length > 0 && wrappers[prop].startAtBeginning) continue;

      const startChars = wrappers[prop].start;
      if (!this.isNextChars(startChars)) continue;

      // Make sure that the wrapper is possible, e.g. if only one "_" then it's not possible to wrap
      const restOfTheChars = this.input.slice(startChars.length);
      const endChars = wrappers[prop].end;
      const endWrapperExists = restOfTheChars.indexOf(endChars) !== -1;

      if (endWrapperExists) {
        this.popChars(startChars.length);
        this.currentWrapper = prop;
        this.addCurrentWord(tokenTypes.normal);
        return true;
      }
    }

    return null;
  }

  matchWrapperEnds() {
    const wrapperEnding = wrappers[this.currentWrapper].end;
    if (!this.isNextChars(wrapperEnding)) return false;

    this.popChars(wrapperEnding.length);
    this.addCurrentWord(this.currentWrapper);
    this.currentWrapper = null;

    return true;
  }

  matchEncoding() {
    for (let enc in encodings) {
      const matched = this.matchNextChars(encodings[enc], enc);
      if (matched) return true;
    }

    return false;
  }

  matchSeparator() {
    for (let index in separators) {
      const matched = this.matchNextChars(separators[index], tokenTypes.normal);
      if (matched) return true;
    }

    return false;
  }

  readCharToCurrentWord() {
    this.currentWord += this.readChar();
    return true;
  }

  matchInput() {
    if (this.currentWrapper) {
      this.matchWrapperEnds() ||
      this.readCharToCurrentWord();
    } else {
      this.matchWrapperStarts() ||
      this.matchEncoding() ||
      this.matchSeparator() ||
      this.readCharToCurrentWord();
    }
  }

  parseStructure() {
    while (this.input.length > 0) this.matchInput();

    if (this.currentWord.length > 0)
      this.addCurrentWord(tokenTypes.normal);

    return this.parsed;
  }
}

// startAtBeginning: whether wrapping must start at the beginning of token
function createWrapper(start, end, startAtBeginning) {
  if (startAtBeginning === undefined) startAtBeginning = true;

  return {
    start: start, end: end, startAtBeginning: startAtBeginning
  }
}