package me.zwsmith.parachute

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import me.zwsmith.parachute.common.domain.Translation
import me.zwsmith.parachute.translations.data.TranslationRepository
import javax.inject.Inject

@HiltViewModel
class MainViewModel @Inject constructor(
    private val translationRepository: TranslationRepository
) : ViewModel() {
    private var sourceWordLanguage: Language = Language.ENGLISH
    private var targetWordLanguage: Language = Language.SPANISH
    private var sourceWordText: String = ""
    private val _translation = MutableStateFlow<Translation?>(null)
    val translation = _translation.asStateFlow()
    val languages = Language.entries.map { it.code }

    fun onSourceLanguageSelect(languageCode: String) {
        Language.entries
            .firstOrNull { it.code == languageCode }
            ?.let { sourceWordLanguage = it }
    }

    fun onTargetLanguageSelect(languageCode: String) {
        Language.entries
            .firstOrNull { it.code == languageCode }
            ?.let { targetWordLanguage = it }
    }

    fun onSourceTextChanged(text: String) {
        sourceWordText = text
    }

    fun onTranslationSubmit() {
        viewModelScope.launch {
            if(sourceWordText.isNotBlank()){
                _translation.value = translationRepository.getTranslation(
                    sourceWordText,
                    sourceWordLanguage,
                    targetWordLanguage
                )
            }
        }
    }
}

enum class Language(val code: String) {
    ENGLISH(code = "EN"),
    SPANISH(code = "ES"),
    FRENCH(code = "FR")
}