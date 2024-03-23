package me.zwsmith.parachutespringapi.domain.models;

import org.springframework.lang.NonNull;
public record Translation(
    @NonNull Long translationId,
    @NonNull Word sourceWord,
    @NonNull Word targetWord
) {}
