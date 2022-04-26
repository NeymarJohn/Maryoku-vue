# develop stage
FROM node:14-alpine as builder
RUN apk update && apk add yarn python3 g++ make && rm -rf /var/cache/apk/*
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
# # build stage
# FROM builder as build-stage
# RUN yarn build
# # production stage
# FROM nginx:1.15.7-alpine as production
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

CMD ["npm", "run", "dev"]