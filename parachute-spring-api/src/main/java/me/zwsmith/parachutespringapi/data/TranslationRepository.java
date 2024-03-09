package me.zwsmith.parachutespringapi.data;

import me.zwsmith.parachutespringapi.data.db.TranslationEntity;
import org.intellij.lang.annotations.Language;
import org.jetbrains.annotations.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Optional;

@Component
public class TranslationRepository {
    private final JdbcTemplate jdbcTemplate;
    private static final Logger logger = LoggerFactory.getLogger(TranslationRepository.class);

    public TranslationRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    Optional<TranslationEntity> findByWordId(Long wordId) {
        @Language("SQL")
        String sql = """
            SELECT t.translation_id, w1.word_id as source_word, w2.word_id as target_word
            FROM word w1
            JOIN translation t ON w1.word_id = t.word_id_1
            JOIN word w2 ON t.word_id_2 = w2.word_id
            WHERE word_id_1 = ?
            LIMIT 1;
            """;
        TranslationEntity translationEntity = safeQuery(sql, new Mapper(), wordId);
        return Optional.ofNullable(translationEntity);
    }

    public Optional<TranslationEntity> findByWordText(String wordText, String targetLanguageCode) {

        @Language("SQL")
        var sql = """
            SELECT t.translation_id, w1.word_id as source_word, w2.word_id as target_word
            FROM word w1
            JOIN translation t ON w1.word_id = t.word_id_1
            JOIN word w2 ON t.word_id_2 = w2.word_id
            WHERE w1.word_text = ? AND w2.language_code = ?
            LIMIT 1;
            """;

        TranslationEntity entity = safeQuery(sql, new Mapper(), wordText, targetLanguageCode);
        return Optional.ofNullable(entity);
    }

    public Optional<TranslationEntity> insert(Long sourceId, Long targetId) {
        @Language("SQL")
        var sql = """
            INSERT INTO translation (word_id_1, word_id_2) VALUES (?, ?)
            RETURNING translation.translation_id, word_id_1 as source_word, word_id_2 as target_word;
            """;
        TranslationEntity insertResult = safeQuery(sql, new Mapper(), sourceId, targetId);
        return Optional.ofNullable(insertResult);
    }

    @Nullable
    private <T> T safeQuery(@Language("SQL") String sql, RowMapper<T> mapper, @Nullable Object... args) {
        T queryResult;
        try {
            queryResult = jdbcTemplate.queryForObject(sql, mapper, args);
        } catch (DataAccessException e) {
            logger.error(e.getMessage(), e);
            queryResult = null;
        }
        return queryResult;
    }

    private static class Mapper implements RowMapper<TranslationEntity> {

        @Override
        public TranslationEntity mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new TranslationEntity(
                rs.getLong("translation_id"),
                rs.getLong("source_word"),
                rs.getLong("target_word")
            );
        }
    }
}

