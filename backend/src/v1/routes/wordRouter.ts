import { Router } from "express";

import { WordController } from "../controllers/wordController";

export const WordRouter = Router();

const controller: WordController = new WordController();

WordRouter.get("/", controller.getWords);

WordRouter.get("/:id", controller.getWord);

WordRouter.post("/", controller.addWord);

WordRouter.put("/:id", controller.updateWord);

WordRouter.delete("/:id", controller.deleteWord);
