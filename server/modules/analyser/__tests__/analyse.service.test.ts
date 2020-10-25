import { analyseTree } from "../analyser.service";

describe("Analyse tests", () => {
  it("analyseTree should find all unique tags in single tag trees", async () => {
    expect(analyseTree("<div></div>").uniqueTags).toStrictEqual(["div"]);
    expect(analyseTree("<div />").uniqueTags).toStrictEqual(["div"]);
  });
  it("analyseTree should find all unique tags in multiple tag trees", async () => {
    expect(analyseTree("<div><div /></div>").uniqueTags).toStrictEqual(["div"]);
    expect(analyseTree("<div><div></div></div>").uniqueTags).toStrictEqual([
      "div",
    ]);
    expect(analyseTree("<div><p></p></div>").uniqueTags).toStrictEqual([
      "div",
      "p",
    ]);
    expect(analyseTree("<div><p /></div>").uniqueTags).toStrictEqual([
      "div",
      "p",
    ]);
    expect(
      analyseTree("<div><p /><h1><h2 /></h1></div>").uniqueTags
    ).toStrictEqual(["div", "p", "h1", "h2"]);
  });
  it("analyseTree should find most commont tags in the tree", async () => {
    expect(analyseTree("<div><div /></div>").mostCommonTag).toStrictEqual([
      "div",
    ]);
    expect(analyseTree("<div><p /></div>").mostCommonTag).toStrictEqual([
      "div",
      "p",
    ]);
    expect(
      analyseTree("<div><div><p /></div></div>").mostCommonTag
    ).toStrictEqual(["div"]);
    expect(
      analyseTree("<div><p /><h1><h2 /><h1 /></h1></div>").mostCommonTag
    ).toStrictEqual(["h1"]);
  });
  it("analyseTree should find longest path in the tree", async () => {
    expect(analyseTree("<div><div /></div>").longestPath).toStrictEqual([
      "div",
      "div",
    ]);
    expect(analyseTree("<div><p /></div>").longestPath).toStrictEqual([
      "div",
      "p",
    ]);
    expect(
      analyseTree("<div><div><p /><h1 /></div></div>").longestPath
    ).toStrictEqual(["div", "div", "p"]);
    expect(
      analyseTree("<div><p><h1><h2 /><h1 /></h1></p></div>").longestPath
    ).toStrictEqual(["div", "p", "h1", "h2"]);
  });
  it("analyseTree should find the longest path starting from root node where the most popular tag is used the most times", async () => {
    const path =
      "<div><h3><h4><h5><h6 /></h5></h4></h3><p><h1><h2 /><h1 /></h1></p></div>";
    expect(analyseTree(path).mostCommonTag).toStrictEqual(["h1"]);
    expect(analyseTree(path).longestPathWithMostCommonTag).toStrictEqual([
      "div",
      "p",
      "h1",
      "h1",
    ]);
    expect(analyseTree(path).longestPath).not.toStrictEqual(
      analyseTree(path).longestPathWithMostCommonTag
    );
  });
});
