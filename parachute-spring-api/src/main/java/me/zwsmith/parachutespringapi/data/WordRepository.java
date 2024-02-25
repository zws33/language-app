package me.zwsmith.parachutespringapi.data;

import me.zwsmith.parachutespringapi.data.db.WordEntity;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WordRepository extends ListCrudRepository<WordEntity, Long> {
    @NotNull
    @Query("SELECT * FROM word WHERE language_code = :languageCode")
    List<WordEntity> findAllByLanguage(@Param("languageCode") String languageCode);

    @NotNull
    @Query("SELECT * FROM word WHERE word_text = :text LIMIT 1")
    Optional<WordEntity> findByText(@Param("text") String text);

    @NotNull
    @Query("SELECT * FROM word WHERE word_text = :text")
    List<WordEntity> findAllByText(@Param("text") String text);

    @NotNull
    @Query("SELECT * FROM word WHERE language_code = :languageCode AND word_text = :text")
    List<WordEntity> findAllByLanguageAndText(@Param("languageCode") String languageCode, @Param("text") String text);
}
