FROM node:alpine3.18 as builder 

WORKDIR /app

RUN npm install -g pnpm

COPY . .

RUN pnpm i


RUN pnpm build 

EXPOSE 8080

CMD [ "pnpm", "start" ]
