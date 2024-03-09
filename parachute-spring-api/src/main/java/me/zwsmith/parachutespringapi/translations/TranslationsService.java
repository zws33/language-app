package me.zwsmith.parachutespringapi.translations;

import me.zwsmith.parachutespringapi.data.TranslationRepository;
import me.zwsmith.parachutespringapi.data.WordMapper;
import me.zwsmith.parachutespringapi.data.WordRepository;
import me.zwsmith.parachutespringapi.data.db.TranslationEntity;
import me.zwsmith.parachutespringapi.data.db.WordEntity;
import me.zwsmith.parachutespringapi.domain.models.Translation;
import me.zwsmith.parachutespringapi.translations.deeplapi.DeepLClient;
import me.zwsmith.parachutespringapi.translations.deeplapi.dtos.DeepLTranslation;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TranslationsService {
    private final WordRepository wordRepository;
    private final TranslationRepository translationRepository;
    private final DeepLClient deepLClient;
    private static final Logger logger = LoggerFactory.getLogger(TranslationsService.class);


    @Autowired
    public TranslationsService(
        WordRepository wordRepository,
        TranslationRepository translationRepository,
        DeepLClient deepLClient
    ) {
        this.wordRepository = wordRepository;
        this.translationRepository = translationRepository;
        this.deepLClient = deepLClient;
    }

    @NonNull
    public Optional<Translation> getTranslation(
        String text,
        String sourceLanguageCode,
        String targetLanguageCode
    ) {
        Optional<Translation> translation = translationRepository
            .findByWordText(text, targetLanguageCode)
            .flatMap(this::toTranslation);
        if (translation.isPresent()) {
            return translation;
        } else {
            DeepLTranslation externalTranslation = getDeepLTranslation(text, sourceLanguageCode, targetLanguageCode);
            Optional<WordEntity> sourceWord = wordRepository.insert(text, sourceLanguageCode);
            sourceWord.ifPresent((word) -> logger.debug("source:" + word.text()));
            Optional<WordEntity> targetWord = wordRepository.insert(externalTranslation.text(), targetLanguageCode);
            targetWord.ifPresent((word) -> logger.debug("target:" + word.text()));
            if (sourceWord.isPresent() && targetWord.isPresent()) {
                Optional<TranslationEntity> result = translationRepository.insert(sourceWord.get().id(), targetWord.get().id());
                result.ifPresent((r) -> logger.debug("translation id:" + r.translationId()));
                return result.flatMap(this::toTranslation);
            }
            return Optional.empty();
        }
    }

    @NonNull
    private Optional<Translation> toTranslation(@NotNull TranslationEntity translationEntity) {
        Optional<WordEntity> source = wordRepository.findById(translationEntity.sourceWord());
        Optional<WordEntity> target = wordRepository.findById(translationEntity.targetWord());
        Translation translation = null;
        if (source.isPresent() && target.isPresent()) {
            translation = new Translation(
                translationEntity.translationId(),
                WordMapper.toWord(source.get()),
                WordMapper.toWord(target.get())
            );
        }
        return Optional.ofNullable(translation);
    }


    public DeepLTranslation getDeepLTranslation(
        String text,
        String sourceLanguageCode,
        String targetLanguageCode
    ) {
        return deepLClient.getDeepLTranslation(text, sourceLanguageCode, targetLanguageCode).translations().getFirst();
    }
}

