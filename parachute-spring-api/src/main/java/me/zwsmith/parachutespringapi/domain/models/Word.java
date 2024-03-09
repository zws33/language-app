package me.zwsmith.parachutespringapi.domain.models;

import org.springframework.lang.NonNull;

public record Word(
    @NonNull Long id,
    @NonNull String text,
    @NonNull String languageCode
) {}
