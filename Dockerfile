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

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf *

# Copy static assets from builder stage
COPY --from=builder /app/dist .

# Entry point when Docker container has started
ENTRYPOINT ["nginx", "-g", "daemon off;"]
