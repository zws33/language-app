package me.zwsmith.parachute

import android.os.Bundle
import android.util.Log
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
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import me.zwsmith.parachute.ui.theme.ParachuteTheme

class MainActivity : ComponentActivity() {
    lateinit var service: TodoService
    lateinit var repository: WordsRepository
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        service = (application as ParachuteApplication).networkModule.retrofit.create()
        repository = WordsRepository(Dispatchers.IO, service)
        GlobalScope.launch {
            repository.getAllWords().joinToString(", ").let { Log.d("TEST", it) }
        }
        setContent {
            ParachuteTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    WordsList()
                }
            }
        }
    }
}

@Composable
fun WordsList() {
    Box(modifier = Modifier.padding(24.dp)) {
        Column {
            Button(onClick = {

            }) {
                Text(text = "translate")
            }
            Column {

            }
        }
    }
}

@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    ParachuteTheme {
        WordsList()
    }
}