package me.zwsmith.parachutespringapi.translations;

import me.zwsmith.parachutespringapi.domain.models.Translation;
import org.springframework.web.bind.annotation.*;

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
    List<Translation> getTranslationByText(@RequestParam String text) {
        if (text != null) {
            Optional<Translation> translation = getTranslations.getTranslationByText(text);
            List<Translation> list = new ArrayList<>();
            translation.ifPresent(list::add);
            return list;
        } else {
            return getTranslations.execute();
        }
    }

}


