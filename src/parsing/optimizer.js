// Optimize by joining consecutive "normal" nodes.
// T  his has the following effect on the ultimate output:
// <span>hey</span><span> </span><span>you</span>
// would become
// <span>hey you</span>

export function optimize(parsed) {
  let result = [];
  let lastNormal = false;

  for (let i in parsed) {
    const ch = parsed[i];

    if (ch.normal) {
      if (lastNormal !== false) {
        lastNormal += ch.normal;
      } else {
        lastNormal = ch.normal;
      }
    } else {
      if (lastNormal !== false)
        result.push({ normal: lastNormal });

      result.push(ch);
      lastNormal = false;
    }
  }

  if (lastNormal !== false)
    result.push({ normal: lastNormal});

  return result;
}