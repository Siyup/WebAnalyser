import { useState } from "react";
import { request } from "../utils/request-handler";

export interface AnalyserResult {
  uniqueTags: Array<string>;
  mostCommonTag: Array<string>;
  longestPath: Array<string>;
  longestPathWithMostCommonTag: Array<string>;
}

export const useAnalyser = () => {
  const [result, setResult] = useState<AnalyserResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const analyseTree = async (analyserType: string, body: any) => {
    setError("");
    setIsLoading(true);
    try {
      const response = await request({
        method: "POST",
        data: body,
        url: `/analyser/${analyserType}`,
      });
      setResult(response);
    } catch (e) {
      setError("Something went wrong..");
    }

    setIsLoading(false);
  };
  const analyseTreeFromUrl = (input: string) => {
    analyseTree("url", { url: input });
  };
  const analyseTreeFromInput = (input: string) => {
    analyseTree("direct", { input });
  };
  return {
    analyseTreeFromUrl,
    analyseTreeFromInput,
    isLoading,
    result,
    error,
  };
};
