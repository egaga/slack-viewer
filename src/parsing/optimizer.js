// Optimize by joining consecutive "normal" nodes.
// This has the following effect on the ultimate output:
// <span>hey</span><span> </span><span>you</span>
// would become
// <span>hey you</span>

export function optimize(tokens) {
  let result = [];
  let joined = false;

  function addIfJoined() {
    if (joined !== false)
      result.push({ normal: joined });
  }

  for (let i in tokens) {
    let token = tokens[i];

    if (token.paragraph) {
        token = { paragraph: true, content: optimize(token.content) };
    }

    if (token.normal) {
      if (joined !== false)
          joined += token.normal;
      else
          joined = token.normal;
   } else {
      addIfJoined();
      result.push(token);
      joined = false;
    }
  }

  addIfJoined();

  return result;
}