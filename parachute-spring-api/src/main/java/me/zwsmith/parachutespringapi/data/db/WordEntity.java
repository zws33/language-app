package me.zwsmith.parachutespringapi.data.db;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;
import org.springframework.lang.NonNull;

@Table("word")
public record WordEntity(@Id Long wordId, @NonNull String wordText, @NonNull String languageCode) {
}

