FROM node:10.16.2-alpine

WORKDIR ./

COPY ./ ./

EXPOSE 3000

RUN yarn install

CMD ["npm", "run", "start"]
