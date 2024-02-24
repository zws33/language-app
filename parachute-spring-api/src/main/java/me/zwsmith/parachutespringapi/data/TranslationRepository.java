package me.zwsmith.parachutespringapi.data;

import me.zwsmith.parachutespringapi.data.db.TranslationEntity;
import me.zwsmith.parachutespringapi.domain.models.Translation;
import me.zwsmith.parachutespringapi.domain.models.Word;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Optional;

@Repository
public interface TranslationRepository extends ListCrudRepository<TranslationEntity, Long> {
    @Query("SELECT * FROM translation WHERE word_id_2 = :wordId OR word_id_1 = :wordId;")
    Optional<TranslationEntity> findByWordId(int wordId);

    @Query(value = """
        SELECT w2.word_id as w2_id, w2.word_text as w2_text, w2.language_code as w2_language, w1.word_id as w1_id, w1.word_text as w1_text, w1.language_code as w1_language, t.translation_id
        FROM word w1
                 JOIN translation t ON w1.word_id = t.word_id_1
                 JOIN word w2 ON t.word_id_2 = w2.word_id
        WHERE w2.word_text = :wordText
           OR w1.word_text = :wordText;""",
        rowMapperClass = TranslationRowMapper.class
    )
    Optional<Translation> findByWordText(String wordText);
}

class TranslationRowMapper implements RowMapper<Translation> {
    @Override
    public Translation mapRow(ResultSet rs, int rowNum) throws SQLException {
        Word firstWord = new Word(
            rs.getLong("w1_id"),
            rs.getString("w1_text"),
            rs.getString("w1_language")
        );
        Word secondWord = new Word(
            rs.getLong("w2_id"),
            rs.getString("w2_text"),
            rs.getString("w2_language")
        );
        return new Translation(
            rs.getLong("translation_id"),
            firstWord,
            secondWord
        );
    }
}