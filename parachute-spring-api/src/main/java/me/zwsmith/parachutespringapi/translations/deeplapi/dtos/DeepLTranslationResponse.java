package me.zwsmith.parachutespringapi.translations.deeplapi.dtos;

import java.util.ArrayList;

public record DeepLTranslationResponse(
    ArrayList<DeepLTranslation> translations
) {}
