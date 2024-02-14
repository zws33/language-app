package me.zwsmith.parachute.di

import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.Dispatchers.IO
import javax.inject.Qualifier

@Module
@InstallIn(SingletonComponent::class)
object DispatchersModule {
    @Provides
    @IoDispatcher
    fun providesIODispatcher(): CoroutineDispatcher = IO
}

@Retention(AnnotationRetention.RUNTIME)
@Qualifier
annotation class IoDispatcher
