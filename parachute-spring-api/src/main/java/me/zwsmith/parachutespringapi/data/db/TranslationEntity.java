package me.zwsmith.parachutespringapi.data.db;

import org.springframework.lang.NonNull;

public record TranslationEntity(
    @NonNull Long translationId,
    @NonNull Long sourceWord,
    @NonNull Long targetWord
) {}
