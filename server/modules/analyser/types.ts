export interface Tag {
  node: "element" | "root";
  tag: string;
  child?: Array<Tag>;
}
export type Paths = Array<Array<string>>;
