import { ControllerInitParams } from "./types";
import { analyserInit } from "./analyser/analyser.controller";

export const controllersInit = ({ app }: ControllerInitParams) => {
  [analyserInit].forEach((controllerInit) => {
    controllerInit({ app });
  });
};
