package me.zwsmith.parachute

import com.jakewharton.retrofit2.converter.kotlinx.serialization.asConverterFactory
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.withContext
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.http.GET

class WordsRepository(
    private val ioDispatcher: CoroutineDispatcher,
    private val wordService: TodoService
) {
    suspend fun getAllWords() = withContext(ioDispatcher) {
        return@withContext wordService.getAllTodos()
    }
}

interface TodoService {
    @GET("todos")
    suspend fun getAllTodos(): List<Todo>
}

private val okHttpClient = OkHttpClient.Builder()
    .addInterceptor(
        HttpLoggingInterceptor().apply { setLevel(HttpLoggingInterceptor.Level.BODY) }
    )
    .build()

private val json = Json {
    ignoreUnknownKeys = true
}

val retrofit: Retrofit by lazy {
    Retrofit.Builder()
        .client(okHttpClient)
        .baseUrl("https://jsonplaceholder.typicode.com/")
        .addConverterFactory(json.asConverterFactory("application/json".toMediaType()))
        .build()
}

inline fun <reified T> Retrofit.create(): T {
    return create(T::class.java)
}

@Serializable
data class Todo(
    val completed: Boolean,
    val id: Int,
    val title: String,
    val userId: Int
)