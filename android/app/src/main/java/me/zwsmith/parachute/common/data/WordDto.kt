package me.zwsmith.parachute.common.data

import kotlinx.serialization.Serializable
import me.zwsmith.parachute.Language
import me.zwsmith.parachute.common.domain.Word

@Serializable
data class WordDto(
    val id: Long,
    val text: String,
    val languageCode: String
)

fun WordDto.toWord(): Word {
    return Word(
        id = id,
        text = text,
        language = Language.entries.first { it.code == languageCode }
    )
}