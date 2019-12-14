FROM node:11-alpine as builder
WORKDIR app
COPY package.json package.json
RUN apk add --no-cache \
  python \
  make \
  gcc \
  g++ \
  && yarn

FROM node:11-alpine
WORKDIR app
COPY . .
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3333
CMD ["yarn", "start"]
