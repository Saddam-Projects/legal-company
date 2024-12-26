FROM node:alpine3.18 as builder 

WORKDIR /app

RUN npm install -g pnpm

COPY . .

RUN pnpm i

ENV NEXT_PUBLIC_BASE_API_URL=http://127.0.0.1:8000

RUN pnpm build 

EXPOSE 8080

CMD [ "pnpm", "start" ]
