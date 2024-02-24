package me.zwsmith.parachutespringapi.data;

import me.zwsmith.parachutespringapi.domain.models.Word;
import me.zwsmith.parachutespringapi.data.db.WordEntity;

public class WordMapper {
    public static Word toWord(WordEntity entity) {
        return new Word(
            entity.wordId(),
            entity.wordText(),
            entity.languageCode()
        );
    }

    public static WordEntity toEntity(Word word) {
        return new WordEntity(
            word.id(),
            word.text(),
            word.languageCode()
        );
    }
}
