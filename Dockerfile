FROM node:16
ENV NODE_ENV production
RUN mkdir superheroes
WORKDIR superheroes
COPY server server
COPY ./client/build client/build
WORKDIR server 
RUN npm ci
CMD node index.js

