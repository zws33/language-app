package me.zwsmith.parachute.common.domain

data class Translation(
    val id: Long,
    val sourceWord: Word,
    val targetWord: Word
)