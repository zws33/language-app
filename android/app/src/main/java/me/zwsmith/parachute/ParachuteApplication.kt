package me.zwsmith.parachute

import android.app.Application
import dagger.hilt.android.HiltAndroidApp
import me.zwsmith.parachute.di.NetworkModule
import retrofit2.Retrofit
import javax.inject.Inject

class ParachuteApplication: Application() {
    val networkModule = NetworkModule
}