package me.zwsmith.parachutespringapi.translations.deeplapi;

import me.zwsmith.parachutespringapi.translations.deeplapi.dtos.DeepLTranslationRequest;
import me.zwsmith.parachutespringapi.translations.deeplapi.dtos.DeepLTranslationResponse;
import org.jetbrains.annotations.NotNull;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class DeepLClient {
    private final RestTemplate restTemplate;

    DeepLClient(
        @NotNull RestTemplateBuilder restTemplateBuilder,
        DeepLApiConfig apiConfig
    ) {
        this.restTemplate = restTemplateBuilder
            .defaultHeader("Authorization", "DeepL-Auth-Key " + apiConfig.getKey())
            .defaultHeader("Content-Type", "application/json")
            .build();
    }

    public DeepLTranslationResponse getDeepLTranslation(
        String text,
        String sourceLanguageCode,
        String targetLanguageCode
    ) {
        DeepLTranslationRequest request = new DeepLTranslationRequest(
            new String[]{text},
            sourceLanguageCode,
            targetLanguageCode
        );
        String url = "https://api-free.deepl.com/v2/translate";
        return restTemplate.postForObject(url, request, DeepLTranslationResponse.class);
    }
}
