
FROM node:10 //pull a node image from docker hub

WORKDIR /app //set the working dir to /app

COPY package.json package.json //copy package.json to the container

RUN npm install // install package.json modules in container

COPY . . //copy everything to container /app

EXPOSE 3000 //expose port 3000 to mount it to another port in local machine 

CMD [ "npm", "start" ]


