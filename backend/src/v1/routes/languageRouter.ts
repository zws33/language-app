import { Router } from "express";

import { LanguageController } from "../controllers/languageController";

export const LanguageRouter = Router();

const controller = LanguageController();

LanguageRouter.get("/", controller.getLanguages);

LanguageRouter.post("/", controller.addLanguage);

LanguageRouter.put("/:translationId", controller.updateLanguage);

LanguageRouter.delete(":translationId", controller.deleteLanguage);