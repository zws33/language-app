package me.zwsmith.parachutespringapi.data.db;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("translation")
public record TranslationEntity(
    @Id
    Long translationId,
    @Column("word_id_1")
    Long wordId1,
    @Column("word_id_2")
    Long wordId2
) {
}
