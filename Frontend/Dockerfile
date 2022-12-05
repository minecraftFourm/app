FROM node:16

WORKDIR /home/app/frontend

COPY package*.json ./
RUN npm install

COPY . .
RUN chown -R node:node ./node_modules
USER node

EXPOSE 3000

CMD [ "npm", "run", "dev"]