FROM node:14.16-alpine3.13 AS builder
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# Choose NGINX as our base Docker image
FROM nginx:alpine

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Copy static assets from builder stage
COPY --from=builder /app/dist .

# Entry point when Docker container has started
ENTRYPOINT ["nginx", "-g", "daemon off;"]
