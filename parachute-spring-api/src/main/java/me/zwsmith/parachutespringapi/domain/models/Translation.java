package me.zwsmith.parachutespringapi.domain.models;

import org.springframework.lang.NonNull;

public record Translation(Long translationId, @NonNull Word firstWord, @NonNull Word secondWord) {
}

