FROM golang:1.21-alpine AS builder

WORKDIR /app

ENV GO111MODULE=on

RUN echo "legal:x:10001:10001:Legal User:/:/sbin/nologin" > /etc/minimal-passwd

COPY . .

RUN --mount=type=cache,mode=0755,target=/go/pkg/mod go mod vendor

RUN go build -o binary

FROM alpine:latest AS runner 

WORKDIR /app 

COPY --from=builder /etc/minimal-passwd /etc/passwd

USER legal

COPY --from=builder /app/binary ./

EXPOSE 8080

ENTRYPOINT ["/app/binary"]