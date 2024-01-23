# syntax=docker/dockerfile:1

FROM golang:1.21

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY *.go ./
COPY ./internal/ ./internal/
COPY ./sql/ ./sql/

RUN CGO_ENABLED=0 GOOS=linux go build -o /api

EXPOSE 3000

CMD [ "/api" ]
