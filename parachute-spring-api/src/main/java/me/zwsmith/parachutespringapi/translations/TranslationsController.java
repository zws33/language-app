package me.zwsmith.parachutespringapi.translations;

import me.zwsmith.parachutespringapi.domain.models.Translation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController()
@RequestMapping("/translations")
public class TranslationsController {
    private final TranslationsService translationsService;

    public TranslationsController(TranslationsService translationsService) {
        this.translationsService = translationsService;
    }

    @GetMapping
    Optional<Translation> getTranslationByText(
        @RequestParam() String text,
        @RequestParam() String sourceLanguageCode,
        @RequestParam() String targetLanguageCode
    ) {
        return translationsService.getTranslation(text, sourceLanguageCode, targetLanguageCode);
    }

}


