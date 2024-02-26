package me.zwsmith.parachute

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Card
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
import me.zwsmith.parachute.ui.theme.Typography

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
                        is UiState.Data -> WordList((uiState as UiState.Data).words, {})
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
fun WordList(todos: List<Word>, onCheckChanged: (Boolean) -> Unit) {
    Box(modifier = Modifier.padding(24.dp)) {
        Column(modifier = Modifier.fillMaxWidth()) {
            LazyColumn {
                items(todos) {
                    Card(modifier = Modifier.fillMaxWidth()) {
                        Column(verticalArrangement = Arrangement.SpaceEvenly) {
                            Text(
                                modifier = Modifier.padding(8.dp),
                                text = it.text,
                                style = Typography.titleLarge
                            )
                            Spacer(modifier = Modifier.width(2.dp))
                            Text(
                                modifier = Modifier.padding(8.dp),
                                text = it.languageCode,
                                style = Typography.titleSmall
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
        ) {
            WordList(todos = emptyList(), onCheckChanged = {})
        }
    }
}