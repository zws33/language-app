package me.zwsmith.parachute

import retrofit2.http.GET

interface WordService {
    @GET("words")
    suspend fun getAllTodos(): List<Word>
}