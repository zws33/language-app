package me.zwsmith.parachute.translations.data

import kotlinx.serialization.Serializable
import me.zwsmith.parachute.common.data.WordDto
import retrofit2.http.GET
import retrofit2.http.Query

interface TranslationService {
    @GET("translations")
    suspend fun sendTranslationRequest(
        @Query("text") text: String,
        @Query("sourceLanguageCode") sourceLanguageCode: String,
        @Query("targetLanguageCode") targetLanguageCode: String
    ): TranslationDto
}

@Serializable
data class TranslationDto(
    val translationId: Long,
    val sourceWord: WordDto,
    val targetWord: WordDto
)