package me.zwsmith.parachutespringapi.words;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.lang.NonNull;

public class Word {
    @Id
    @JsonProperty("word_id")
    private int wordId;
    @NonNull
    @JsonProperty("word_text")
    private final String wordText;
    @NonNull
    @JsonProperty("language_code")
    private final String languageCode;

    public Word(@NonNull String wordText, @NonNull String languageCode) {
        this.wordText = wordText;
        this.languageCode = languageCode;
    }

    public long getWordId() {
        return wordId;
    }

    public String getWordText() {
        return wordText;
    }

    public String getLanguageCode() {
        return languageCode;
    }

}
