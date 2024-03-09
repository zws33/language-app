package me.zwsmith.parachute

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.sizeIn
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.rounded.ArrowForward
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExposedDropdownMenuBox
import androidx.compose.material3.ExposedDropdownMenuDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
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
                    val viewModel = hiltViewModel<MainViewModel>()
                    val transation by viewModel.translation.collectAsStateWithLifecycle()
                    TranslationScreen(
                        targetLanguageText = transation?.targetWord?.text ?: "",
                        languageSelectItems = viewModel.languages,
                        onSourceLanguageSelect = viewModel::onSourceLanguageSelect,
                        onTargetLanguageSelect = viewModel::onTargetLanguageSelect,
                        onTranslateClicked = viewModel::onTranslationSubmit,
                        onTextChanged = viewModel::onSourceTextChanged,
                    )
                }
            }
        }
    }
}

@Composable
fun TranslationScreen(
    targetLanguageText: String? = null,
    languageSelectItems: List<String>,
    onSourceLanguageSelect: (String) -> Unit,
    onTargetLanguageSelect: (String) -> Unit,
    onTranslateClicked: () -> Unit,
    onTextChanged: (String) -> Unit
) {
    Column(
        modifier = Modifier
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        var sourceText by remember { mutableStateOf("") }
        Column(modifier = Modifier.fillMaxHeight()) {
            Text(text = targetLanguageText ?: "", Modifier.weight(2f))
            Row(
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 8.dp)
            ) {
                LanguageSelectDropDown(
                    modifier = Modifier.weight(2f),
                    languages = languageSelectItems,
                    onItemSelect = onSourceLanguageSelect
                )
                Icon(
                    modifier = Modifier.padding(8.dp),
                    imageVector = Icons.AutoMirrored.Rounded.ArrowForward,
                    contentDescription = null,
                    tint = MaterialTheme.colorScheme.secondary
                )
                LanguageSelectDropDown(
                    modifier = Modifier.weight(2f),
                    languages = languageSelectItems,
                    onItemSelect = onTargetLanguageSelect
                )
            }
            OutlinedTextField(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(bottom = 8.dp),
                value = sourceText,
                onValueChange = {
                    sourceText = it
                    onTextChanged(it)
                },
                placeholder = { Text("Source") }
            )
            OutlinedButton(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(56.dp),
                onClick = onTranslateClicked,
            ) {
                Text("Translate")
            }
        }
    }
}


@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun LanguageSelectDropDown(
    modifier: Modifier = Modifier,
    languages: List<String>,
    onItemSelect: (String) -> Unit
) {
    var isExpanded by remember {
        mutableStateOf(false)
    }
    var selectedText by remember { mutableStateOf(languages.firstOrNull() ?: "") }
    ExposedDropdownMenuBox(
        modifier = modifier.sizeIn(maxWidth = 100.dp),
        expanded = isExpanded,
        onExpandedChange = {
            isExpanded = !isExpanded
        }
    ) {
        OutlinedTextField(
            value = selectedText,
            onValueChange = {},
            readOnly = true,
            trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = isExpanded) },
            modifier = Modifier.menuAnchor()
        )
        ExposedDropdownMenu(expanded = isExpanded, onDismissRequest = { isExpanded = false }) {
            languages.forEach { item ->
                DropdownMenuItem(
                    text = { Text(text = item) },
                    onClick = {
                        selectedText = item
                        isExpanded = false
                        onItemSelect(item)
                    }
                )
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
fun WordPreview() {
    ParachuteTheme {
        Surface(
            modifier = Modifier.fillMaxSize(),
            color = MaterialTheme.colorScheme.background
        ) {
            TranslationScreen(
                targetLanguageText = null,
                languageSelectItems = listOf("EN", "ES", "FR"),
                onSourceLanguageSelect = {},
                onTargetLanguageSelect = {},
                onTranslateClicked = {},
                onTextChanged = {}
            )
        }
    }
}