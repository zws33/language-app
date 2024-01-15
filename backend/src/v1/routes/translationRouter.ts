import { Router } from "express";

import { TranslationController } from "../controllers/translationController";

export const TranslationRouter = Router();

const controller = TranslationController();

TranslationRouter.get("/", controller.getTranslations);

TranslationRouter.get("/:translationId", controller.getTranslation);

TranslationRouter.post("/", controller.addTranslation);

TranslationRouter.put("/:translationId", controller.updateTranslation);

TranslationRouter.delete(":translationId", controller.deleteTranslation);