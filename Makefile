install:
    npm install

init-db:
    npm run init:db

start-server:
    npm run start:server:dev

start-client:
    npm run start:client:dev

.PHONY: install init-db start-server start-client