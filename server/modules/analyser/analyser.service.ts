import html2json from "html2json";
import axios from "axios";
import { badInputException } from "../../utils/error.utils";
import { Paths } from "./types";
import { getPossiblePaths } from "./utils/getPossitblePaths";
import { getAllTags } from "./utils/getAllTags";

const getUniqueTags = (tags: Array<string>) => [...new Set(tags)];

interface MostCommonElement {
  highestOccurence: number;
  elements: Array<string>;
}

interface TagsCountResult {
  [tag: string]: number;
}

const getMostCommonTag = (tags: Array<string>) => {
  const tagsUseCount = tags.reduce<TagsCountResult>(
    (prev, curr) => ({
      ...prev,
      [curr]: Number(prev[curr] || 0) + 1,
    }),
    {}
  );
  return Object.entries(tagsUseCount).reduce<MostCommonElement>(
    ({ highestOccurence, elements }, [key, value]) => {
      if (highestOccurence > value) {
        return {
          highestOccurence,
          elements,
        };
      }
      if (highestOccurence === value) {
        return {
          highestOccurence,
          elements: [...elements, key],
        };
      }
      return {
        highestOccurence: value,
        elements: [key],
      };
    },
    {
      highestOccurence: 0,
      elements: [],
    }
  ).elements;
};

const getLongestPath = (paths: Paths) => {
  return paths.reduce((prev, curr) => {
    if (prev.length < curr.length) return curr;
    return prev;
  }, []);
};

interface LongestPathElement {
  longestPath: Array<string>;
  commonTagCount: number;
}
const getLongestPathWithMostCommonTag = (paths: Paths, commonTag: string) => {
  const longestPath = paths.reduce<LongestPathElement>(
    (prev, curr) => {
      const commonTagCount = curr.filter((tag) => tag === commonTag).length;
      if (
        prev.commonTagCount === commonTagCount &&
        prev.longestPath.length < curr.length
      ) {
        return {
          longestPath: curr,
          commonTagCount,
        };
      } else if (prev.commonTagCount < commonTagCount) {
        return {
          longestPath: curr,
          commonTagCount,
        };
      }
      return prev;
    },
    {
      longestPath: [],
      commonTagCount: 0,
    }
  );
  return longestPath.longestPath;
};

export const analyseTree = (tree: string) => {
  try {
    const json = html2json.html2json(tree);
    const tags = getAllTags(json);
    const paths = getPossiblePaths(json);
    const mostCommonTag = getMostCommonTag(tags);
    const result = {
      uniqueTags: getUniqueTags(tags),
      mostCommonTag,
      longestPath: getLongestPath(paths),
      longestPathWithMostCommonTag: getLongestPathWithMostCommonTag(
        paths,
        mostCommonTag[0]
      ),
    };
    // Would use some other lib to validate html, this is just some dumb validation
    if (result.uniqueTags.length === 0) throw new Error("Not valid");
    return result;
  } catch (e) {
    throw badInputException;
  }
};

export const analyseTreeFromUrl = async (url: string) => {
  let tree;
  try {
    tree = (await axios(url)).data;
  } catch (e) {
    throw badInputException;
  }
  return analyseTree(tree);
};
