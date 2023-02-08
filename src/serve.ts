import { Server } from "@ancademy/vse-server";
import express from "express";
import { resolve } from "path";
import { description } from "../package.json";
import { stepConfigList } from "./config";
import { mainLogic, subLogicList } from "./Main/Logic";
import { extraRouter } from "./Main/extraRouter";

extraRouter.use("/static", express.static(resolve(__dirname, "../static"), { maxAge: "10d" }));

Server.start({
  mainLogic,
  subLogicList,
  staticPath: resolve(__dirname, "../dist"),
  projectTitle: description,
  stepConfigList,
  extraRouter,
});
