function mapWord(word) {
  return  asShortcut(word, "cmd-") || 
          asContainsDigit(word) ||
          undefined;
}

function asContainsDigit(word) {
  return /\d/.test(word) ? { number: word } : false;
}

function mapUrl(word) {
  if (word.startsWith("@")) {
    return {userReference: "unknown"}
  } else if (word.startsWith("https://www.youtube.com/watch?v=")) {
    return {youtube: word.replace("/watch?v=", "/embed/")};
  } else
    return undefined;
}

function asShortcut(word, key) {
  return word.toLowerCase().startsWith(key) ? { shortcut: word } : false;
}

export function parseDetails(structure) {
  return structure.reduce((previous, token) => {
    const improvedToken =
          token.normal ? mapWord(token.normal) || token
        : token.pre    ? mapWord(token.pre)    || token
        : token.url    ? mapUrl(token.url)     || token
        : token;

    return previous.concat([improvedToken]);
  }, []);
}