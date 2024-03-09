package me.zwsmith.parachute.translations.data

import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.withContext
import me.zwsmith.parachute.Language
import me.zwsmith.parachute.common.data.toWord
import me.zwsmith.parachute.common.domain.Translation
import me.zwsmith.parachute.di.IoDispatcher
import javax.inject.Inject

class TranslationRepository @Inject constructor(
    @IoDispatcher private val ioDispatcher: CoroutineDispatcher,
    private val translationService: TranslationService
) {
    suspend fun getTranslation(
        text: String,
        sourceLanguage: Language,
        targetLanguage: Language
    ): Translation =
        withContext(ioDispatcher) {
            val response: TranslationDto = translationService.sendTranslationRequest(
                    text,
                    sourceLanguage.code,
                    targetLanguage.code
            )
            Translation(
                response.translationId,
                response.sourceWord.toWord(),
                response.targetWord.toWord()
            )
        }
}




