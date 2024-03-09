package me.zwsmith.parachutespringapi.data;

import me.zwsmith.parachutespringapi.data.db.WordEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Optional;

@Repository
public class WordRepository {
    private final JdbcTemplate jdbcTemplate;

    public WordRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Optional<WordEntity> insert(String text, String languageCode) {
        var sql = """
            INSERT INTO word (word_text, language_code) VALUES (?, ?) RETURNING *
            """;
        return Optional.ofNullable(jdbcTemplate.queryForObject(sql, new Mapper(), text, languageCode));
    }

    public Optional<WordEntity> findById(Long id) {
        var sql = """
            SELECT * FROM word WHERE word_id = ?;
            """;
        return Optional.ofNullable(jdbcTemplate.queryForObject(sql, new Mapper(), id));
    }

    private static class Mapper implements RowMapper<WordEntity> {

        @Override
        public WordEntity mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new WordEntity(
                rs.getLong("word_id"),
                rs.getString("word_text"),
                rs.getString("language_code")
            );
        }
    }
}
