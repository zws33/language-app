package me.zwsmith.parachutespringapi.translations;

import me.zwsmith.parachutespringapi.domain.models.Translation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController()
@RequestMapping("/translations")
public class TranslationsController {
    private final TranslationsService getTranslations;

    public TranslationsController(TranslationsService getTranslations) {
        this.getTranslations = getTranslations;
    }

    @GetMapping
    List<Translation> getTranslationByText(@RequestParam(name = "text", required = false) String wordText, @RequestParam(required = false) Long wordId) {
        if (wordId != null) {
            Optional<Translation> translation = getTranslations.getTranslationByWordId(wordId);
            List<Translation> list = new ArrayList<>();
            translation.ifPresent(list::add);
            return list;
        } else if (wordText != null){
            Optional<Translation> translation = getTranslations.getTranslationByText(wordText);
            List<Translation> list = new ArrayList<>();
            translation.ifPresent(list::add);
            return list;
        } else {
            return getTranslations.execute();
        }
    }

}


