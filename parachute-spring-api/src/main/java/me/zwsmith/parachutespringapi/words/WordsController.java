package me.zwsmith.parachutespringapi.words;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController()
@RequestMapping("/words")
public class WordsController {
    private final WordRepository wordRepository;

    public WordsController(WordRepository wordRepository) {
        this.wordRepository = wordRepository;
    }

    @GetMapping("/")
    public Iterable<Word> getWords() {
        return wordRepository.findAll();
    }

    @GetMapping
    public Iterable<Word> getWordsByLanguage(@RequestParam("language_code") String languageCode) {
        return wordRepository.findAllByLanguageCode(languageCode);
    }

    @GetMapping("/{id}")
    public Optional<Word> getWordById(@PathVariable Long id) {
        return wordRepository.findById(id);
    }

    @PostMapping("/")
    public Iterable<Word> insertWords(@RequestBody List<Word> words) {
        return wordRepository.saveAll(words);
    }

    @DeleteMapping("/{id}")
    public void deleteWord(@PathVariable Long id) {
        wordRepository.deleteById(id);
    }
}
