package me.zwsmith.parachutespringapi.data;

import me.zwsmith.parachutespringapi.data.db.WordEntity;
import me.zwsmith.parachutespringapi.domain.models.Word;

public class WordMapper {
    public static Word toWord(WordEntity entity) {
        return new Word(
            entity.id(),
            entity.text(),
            entity.languageCode()
        );
    }

    public static WordEntity toEntity(Word wordEntity) {
        return new WordEntity(
            wordEntity.id(),
            wordEntity.text(),
            wordEntity.languageCode()
        );
    }
}
