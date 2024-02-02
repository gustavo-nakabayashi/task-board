# syntax=docker/dockerfile:1

FROM golang:1.21 as build

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY *.go ./
COPY ./internal/ ./internal/
COPY ./sql/ ./sql/

RUN CGO_ENABLED=0 GOOS=linux go build -o /api

FROM scratch
COPY --from=build /api /api
EXPOSE 8000
CMD [ "/api" ]
