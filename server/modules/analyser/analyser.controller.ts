import express from "express";
import { analyseTree, analyseTreeFromUrl } from "./analyser.service";
import { ControllerInitParams } from "../types";

const root = "analyser";

export const analyserInit = ({ app }: ControllerInitParams) => {
  app.post(
    `/${root}/url`,
    async (req: express.Request, res: express.Response) => {
      try {
        if (!req.body.url) {
          return res.status(400).end();
        }
        const result = await analyseTreeFromUrl(req.body.url);
        res.send(result).end();
      } catch (e) {
        console.log(e);
        res.status(500).end();
      }
    }
  );
  app.post(
    `/${root}/direct`,
    async (req: express.Request, res: express.Response) => {
      try {
        console.log(req.body);
        if (!req.body.input) {
          return res.status(400).end();
        }
        const result = await analyseTree(req.body.input);
        res.send(result).end();
      } catch (e) {
        console.log(e);
        res.status(500).end();
      }
    }
  );
};
