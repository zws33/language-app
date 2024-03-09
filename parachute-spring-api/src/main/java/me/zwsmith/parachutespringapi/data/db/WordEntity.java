package me.zwsmith.parachutespringapi.data.db;

import org.springframework.lang.NonNull;

public record WordEntity(
    @NonNull Long id,
    @NonNull String text,
    @NonNull String languageCode
) {}

