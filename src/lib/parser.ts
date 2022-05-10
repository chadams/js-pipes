/* eslint-disable no-useless-escape */
import { replace, set, template } from "lodash";
import split from "split-string";

const parser = ({ imports }, data, origString: string) => {
  const regex = /\$\{([\w\n\[\]\.\'\s\-]+)\|?([\w\|\:\'\"\,\-\/\s]*)\}/gm;
  let m;
  let outputString = origString;
  const overrides = {};
  while ((m = regex.exec(origString)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    if (m[2]) {
      const pipes = m[2].split("|");
      const pipeCalls = pipes.map((pipe) => {
        const pipeMethodItems = split(pipe, {
          separator: ":",
          quotes: ["'"],
        });
        const fun = pipeMethodItems[0];
        const params = pipeMethodItems[1];
        return `${fun}(${params})(${m[1]})`;
      });
      const stringifiedMethod = pipeCalls.reverse().reduce((acc, pipeCall) => {
        return replace(acc, m[1], pipeCall);
      }, m[1]);
      outputString = replace(outputString, m[0], `\$\{${stringifiedMethod}\}`);
    }
    set(overrides, m[1], "");
  }
  return template(outputString, { imports })({ ...overrides, ...data });
};

export default parser;
