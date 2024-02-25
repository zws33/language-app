package me.zwsmith.parachutespringapi.translations;

import me.zwsmith.parachutespringapi.data.TranslationRepository;
import me.zwsmith.parachutespringapi.data.WordMapper;
import me.zwsmith.parachutespringapi.data.WordRepository;
import me.zwsmith.parachutespringapi.data.db.TranslationEntity;
import me.zwsmith.parachutespringapi.data.db.WordEntity;
import me.zwsmith.parachutespringapi.domain.models.Translation;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class TranslationsService {
    WordRepository wordRepository;
    TranslationRepository translationRepository;

    @Autowired
    public TranslationsService(WordRepository wordRepository, TranslationRepository translationRepository) {
        this.wordRepository = wordRepository;
        this.translationRepository = translationRepository;
    }

    @NotNull
    public List<Translation> execute() {
        return translationRepository.findAll()
            .stream()
            .map(this::toTranslation)
            .filter(Objects::nonNull)
            .toList();
    }

    @Nullable
    private Translation toTranslation(TranslationEntity translationEntity) {
        Optional<WordEntity> firstWord = wordRepository.findById(translationEntity.wordId1());
        Optional<WordEntity> secondWord = wordRepository.findById(translationEntity.wordId2());
        Translation translation = null;
        if (firstWord.isPresent() && secondWord.isPresent()) {
            translation = new Translation(
                translationEntity.translationId(),
                WordMapper.toWord(firstWord.get()),
                WordMapper.toWord(secondWord.get())
            );
        }
        return translation;
    }

    @NotNull
    public Optional<Translation> getTranslationByText(String text) {
        return wordRepository.findByText(text)
            .flatMap(wordEntity -> translationRepository.findByWordText(wordEntity.wordText()));
    }

    @NotNull
    public Optional<Translation> getTranslationByWordId(Long wordId) {
        return wordRepository.findById(wordId).flatMap(wordEntity -> translationRepository.findByWordId(wordEntity.wordId()));
    }
}
