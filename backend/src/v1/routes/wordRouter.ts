import { Router } from "express";

import { WordController } from "../controllers/wordController";

export const wordRouter = Router();

const controller: WordController = new WordController();

wordRouter.get("/", controller.getWords);

wordRouter.get("/:id", controller.getWord);

wordRouter.post("/", controller.addWord);

wordRouter.put("/:id", controller.updateWord);

wordRouter.delete("/:id", controller.deleteWord);
