package me.zwsmith.parachute

import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.withContext
import me.zwsmith.parachute.di.IoDispatcher
import javax.inject.Inject

class TodosRepository @Inject constructor(
    @IoDispatcher private val ioDispatcher: CoroutineDispatcher,
    private val wordService: TodoService
) {
    suspend fun getTodos(): List<Todo> = withContext(ioDispatcher) {
        wordService.getAllTodos()
    }
}


