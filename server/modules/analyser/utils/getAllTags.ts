import { Tag } from "../types";

export const getAllTags = (
  tree: Tag,
  uniqueTags: Array<string> = []
): Array<string> => {
  if (!tree.child) return [tree.tag];
  const currentTag = tree.node !== "root" ? [tree.tag] : [];
  return [
    ...currentTag,
    ...tree.child.reduce<Array<Array<string> | string>>((tags, tag) => {
      if (!tag.child) return [...tags, tag.tag];
      return [
        ...tags,
        tag.tag,
        ...tag.child?.map((t) => getAllTags(t, uniqueTags)),
      ];
    }, uniqueTags),
  ]
    .flat()
    .filter(Boolean);
};
