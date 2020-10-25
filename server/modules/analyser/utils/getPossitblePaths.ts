import { Tag, Paths } from "../types";

export const getPossiblePaths = (root: Tag) => {
  const result: Paths = [];
  const iterateThrough = (
    child: Array<Tag> = [],
    constructedPath: Array<string>
  ) => {
    if (child.length > 0) {
      child.forEach((val) => {
        iterateThrough(val.child, [...constructedPath, val.tag]);
      });
      return;
    }
    result.push(constructedPath.filter(Boolean));
  };
  iterateThrough(root.child, []);
  return result;
};
