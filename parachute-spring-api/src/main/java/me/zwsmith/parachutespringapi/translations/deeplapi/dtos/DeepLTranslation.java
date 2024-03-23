package me.zwsmith.parachutespringapi.translations.deeplapi.dtos;

public record DeepLTranslation(
    String detected_source_language,
    String text
) {}
