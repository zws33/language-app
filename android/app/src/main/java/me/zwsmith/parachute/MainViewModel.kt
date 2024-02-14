package me.zwsmith.parachute

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class MainViewModel @Inject constructor(private val todosRepository: TodosRepository) :
    ViewModel() {

    private val _uiState = MutableStateFlow<UiState>(UiState.Loading)
    val uiState: StateFlow<UiState> = _uiState.asStateFlow()

    fun getTodos() {
        viewModelScope.launch {
            val todos = todosRepository.getTodos()
            _uiState.emit(UiState.Data(todos))
        }
    }
}

sealed class UiState {
    data object Loading : UiState()
    data class Data(
        val todos: List<Todo>
    ) : UiState()

    data object Error : UiState()
}