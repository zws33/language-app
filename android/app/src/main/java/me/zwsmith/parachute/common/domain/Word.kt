package me.zwsmith.parachute.common.domain

import me.zwsmith.parachute.Language

data class Word(
    val id: Long,
    val text: String,
    val language: Language
)
