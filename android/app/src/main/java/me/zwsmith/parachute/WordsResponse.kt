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
    @SerialName("id")
    val id: Int,
    @SerialName("text")
    val text: String,
    @SerialName("languageCode")
    val languageCode: String
)