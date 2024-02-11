package me.zwsmith.parachute

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.launch
import me.zwsmith.parachute.ui.theme.ParachuteTheme
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory
import retrofit2.http.GET

class MainActivity : ComponentActivity() {
    val retrofit = retrofitClient()
    private val todoService: TodoService = createService(retrofit)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            ParachuteTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    WordsList(todoService)
                }
            }
        }
    }
}

@Composable
fun WordsList(todoService: TodoService) {
    val scope = rememberCoroutineScope()
    var todos: List<Todo> by remember { mutableStateOf(emptyList()) }
    Box(modifier = Modifier.padding(24.dp)) {
        Column {
            Button(onClick = {
                scope.launch {
                    todos = todoService.getTodos()
                }
            }) {
                Text(text = "translate")
            }
            Column {
                todos.forEach {
                    Text(text = it.title)
                }
            }
        }
    }
}

data class Todo(
    val id: Int = 0,
    val title: String = "null",
    val completed: Boolean = false
)

interface TodoService {
    @GET("todos")
    suspend fun getTodos(): List<Todo>
}

fun createService(retrofit: Retrofit): TodoService {
    return retrofit.create(TodoService::class.java)
}

fun retrofitClient(): Retrofit {
    return Retrofit.Builder()
        .baseUrl("https://jsonplaceholder.typicode.com/users/1/")
        .addConverterFactory(MoshiConverterFactory.create())
        .build()
}

@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    ParachuteTheme {
        val fakeService = object : TodoService {
            override suspend fun getTodos(): List<Todo> {
                TODO("Not yet implemented")
            }
        }
        WordsList(fakeService)
    }
}