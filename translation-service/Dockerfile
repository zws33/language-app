# Dockerfile
FROM golang:alpine as prod

WORKDIR /app

# Copy the Go project files
COPY . .

CMD ["go", "run", "main.go"]