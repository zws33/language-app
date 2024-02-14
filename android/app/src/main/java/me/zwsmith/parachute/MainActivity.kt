package me.zwsmith.parachute

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Checkbox
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import dagger.hilt.android.AndroidEntryPoint
import me.zwsmith.parachute.ui.theme.ParachuteTheme

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            ParachuteTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    val mainViewModel: MainViewModel = hiltViewModel()
                    mainViewModel.getTodos()
                    val uiState by mainViewModel.uiState.collectAsStateWithLifecycle()
                    when (uiState) {
                        is UiState.Data -> TodoList((uiState as UiState.Data).todos, {})
                        UiState.Error -> {
                            Box {
                                Text("Error fetching todos")
                            }
                        }
                        UiState.Loading -> {
                            CircularProgressIndicator()
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun TodoList(todos: List<Todo>, onCheckChanged: (Boolean) -> Unit) {
    Box(modifier = Modifier.padding(24.dp)) {
        Column {
            LazyColumn {
                items(todos) {
                    Box {
                        Row(horizontalArrangement = Arrangement.SpaceBetween) {
                            Text(modifier = Modifier.padding(8.dp), text = it.title)
                            Checkbox(
                                modifier = Modifier.padding(8.dp),
                                checked = it.completed,
                                onCheckedChange = onCheckChanged
                            )
                        }
                    }
                }
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
fun TodoPreview() {
    ParachuteTheme {
        Surface(
            modifier = Modifier.fillMaxSize(),
            color = MaterialTheme.colorScheme.background
        ){
            TodoList(todos = emptyList(), onCheckChanged = {})
        }
    }
}