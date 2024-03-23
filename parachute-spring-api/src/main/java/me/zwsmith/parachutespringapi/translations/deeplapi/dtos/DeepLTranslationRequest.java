package me.zwsmith.parachutespringapi.translations.deeplapi.dtos;

public record DeepLTranslationRequest(
    String[] text,
    String source_lang,
    String target_lang
) {}
