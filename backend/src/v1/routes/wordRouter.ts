import { Router } from "express";

import { ProvideWordController, WordController } from "../controllers/wordController";

export const WordRouter = Router();

const controller: WordController = ProvideWordController();

WordRouter.get("/", controller.getWords);

WordRouter.get("/:id", controller.getWord);

WordRouter.post("/", controller.addWord);

WordRouter.put("/:id", controller.updateWord);

WordRouter.delete("/:id", controller.deleteWord);