# base image
FROM node:lts

# create & set working directory
WORKDIR /usr/src

# Copy root package.json and lockfile
COPY package.json ./
COPY package-lock.json ./

# Copy the docs package.json
COPY app/package.json ./app/package.json
COPY app/package-lock.json ./app/package-lock.json

RUN npm install

# Copy app source
COPY . .

EXPOSE 3000

CMD ["yarn", "dev:app"]
