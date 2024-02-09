package me.zwsmith.parachutespringapi.words;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface WordRepository extends CrudRepository<Word, Long> {
    @Query("SELECT * FROM word WHERE language_code = :languageCode")
    Iterable<Word> findAllByLanguageCode(@Param("languageCode") String languageCode);
}
