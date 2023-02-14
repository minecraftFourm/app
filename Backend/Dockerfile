FROM node:16

WORKDIR /home/app/backend

COPY package*.json ./
RUN npm install

COPY . .
RUN chown -R node:node ./node_modules
USER node

EXPOSE 5000


CMD [ "npm", "run", "dev"]