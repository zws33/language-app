package me.zwsmith.parachutespringapi.words;

import me.zwsmith.parachutespringapi.domain.models.Word;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController()
@RequestMapping("/words")
public class WordsController {
    private final WordService wordService;

    public WordsController(WordService wordService) {
        this.wordService = wordService;
    }

    @GetMapping()
    public List<Word> getWords(
        @RequestParam(required = false, name = "language_code")
        String languageCode,
        @RequestParam(required = false, name = "word_text")
        String wordText
    ) {
        return wordService.findWordsBy(languageCode, wordText);
    }


    @GetMapping("/{id}")
    public Optional<Word> getWordById(@PathVariable Long id) {
        return wordService.findById(id);
    }

    @PostMapping("/")
    public Word insertWord(@RequestBody Word word) {
        return wordService.insertWord(word);
    }

    @DeleteMapping("/{id}")
    public void deleteWord(@PathVariable Long id) {
        wordService.deleteById(id);
    }
}
