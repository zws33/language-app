import { Router } from "express";

import { WordController } from "../controllers/wordController";

export const WordRouter = Router();

const controller = WordController();

WordRouter.get("/", controller.getWords);

WordRouter.get("/:translationId", controller.getWord);

WordRouter.post("/", controller.addWord);

WordRouter.put("/:translationId", controller.updateWord);

WordRouter.delete(":translationId", controller.deleteWord);