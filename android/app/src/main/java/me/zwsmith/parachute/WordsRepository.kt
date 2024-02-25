package me.zwsmith.parachute

import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.withContext
import me.zwsmith.parachute.di.IoDispatcher
import javax.inject.Inject

class WordsRepository @Inject constructor(
    @IoDispatcher private val ioDispatcher: CoroutineDispatcher,
    private val wordService: WordService
) {
    suspend fun getTodos(): List<Word> = withContext(ioDispatcher) {
        wordService.getAllTodos()
    }
}


