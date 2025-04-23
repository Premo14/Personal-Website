# Stage 1: Build the Go application
FROM golang:1.23-alpine AS builder

# Enable Go modules and clean caching
ENV CGO_ENABLED=0 \
    GOOS=linux \
    GO111MODULE=on

WORKDIR /app

# Copy go mod files and download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the app
COPY . .

# Build the Go app
RUN go build -o server .

# Stage 2: Create a minimal runtime image
FROM alpine:latest

WORKDIR /root/

# Copy the compiled binary from the builder
COPY --from=builder /app/server .

# Expose the port your app will run on
EXPOSE 8080

# Run the app
CMD ["./server"]
