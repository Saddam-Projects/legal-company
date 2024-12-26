FROM golang:1.21-alpine AS builder

WORKDIR /app

ENV GO111MODULE=on

COPY . .

RUN --mount=type=cache,mode=0755,target=/go/pkg/mod go mod vendor

RUN go build -o binary cmd/api.go

FROM alpine:latest AS runner 

WORKDIR /app 

COPY --from=builder /app/binary ./

COPY public ./public

EXPOSE 8000

ENTRYPOINT ["/app/binary"]