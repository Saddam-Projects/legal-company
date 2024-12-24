FROM node:alpine3.18 as builder 

WORKDIR /app

COPY . .

RUN npm install -g pnpm

RUN pnpm i

RUN pnpm build 

EXPOSE 8080

CMD [ "pnpm", "start:prod" ]
