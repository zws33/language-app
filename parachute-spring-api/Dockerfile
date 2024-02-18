# Stage 1: Build dependencies
FROM eclipse-temurin:21 AS gradle

WORKDIR /app
COPY gradle/ ./gradle
COPY gradlew ./gradlew
RUN ./gradlew

FROM gradle as builder
# Copy project files
COPY build.gradle.kts ./
COPY src/main/java/ ./src/main/java/
COPY src/main/resources/ ./src/main/resources/

# Download dependencies and build JAR
RUN ./gradlew clean bootJar

# Stage 2: Run the app
FROM eclipse-temurin:21

WORKDIR /app

# Copy JAR from builder stage
COPY --from=builder /app/build/libs/app.jar ./app.jar

# Expose port and run the app
EXPOSE 8080
CMD ["java", "-jar", "./app.jar"]
