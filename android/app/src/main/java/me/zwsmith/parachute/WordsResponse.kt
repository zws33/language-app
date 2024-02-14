package me.zwsmith.parachute

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.JsonNames

@Serializable
data class WordsResponse(
    val words: List<Word>
)

@Serializable
data class Word(
    @SerialName("word_id")
    val id: Int,
    @SerialName("word_text")
    val text: String,
    @SerialName("language_code")
    val languageCode: String
)