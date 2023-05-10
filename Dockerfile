FROM node:18 AS builder

# Create app directory
WORKDIR /app

COPY . .

# Install app dependencies
RUN npm run install
ENV NODE_ENV production
RUN npm run build

FROM node:18
LABEL app_launch_runtime="nodejs"

COPY --from=builder /app /app

WORKDIR /app

ENV NODE_ENV production
CMD [ "npm", "run", "start"]