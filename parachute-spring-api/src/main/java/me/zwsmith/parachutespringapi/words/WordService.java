package me.zwsmith.parachutespringapi.words;

import me.zwsmith.parachutespringapi.data.WordMapper;
import me.zwsmith.parachutespringapi.data.WordRepository;
import me.zwsmith.parachutespringapi.data.db.WordEntity;
import me.zwsmith.parachutespringapi.domain.models.Word;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class WordService {
    WordRepository wordRepository;

    @Autowired
    public WordService(WordRepository wordRepository) {
        this.wordRepository = wordRepository;
    }

    public List<Word> findWordsBy(String languageCode, String wordText) {
        List<WordEntity> entities = new ArrayList<>();
        if (languageCode != null && wordText != null) {
            entities.addAll(wordRepository.findAllByLanguageAndText(languageCode, wordText));
        } else if (languageCode != null) {
            entities.addAll(wordRepository.findAllByLanguage(languageCode));
        } else if (wordText != null) {
            entities.addAll(wordRepository.findAllByText(wordText));
        } else {
            entities.addAll(wordRepository.findAll());
        }
        return entities.stream().map(WordMapper::toWord).toList();
    }

    public Optional<Word> findById(Long id) {
        return wordRepository.findById(id).map(WordMapper::toWord);
    }

    public void deleteById(Long id) {
        wordRepository.deleteById(id);
    }

    public Word insertWord(Word word) {
        WordEntity inserted = wordRepository.save(WordMapper.toEntity(word));
        return WordMapper.toWord(inserted);
    }
}
