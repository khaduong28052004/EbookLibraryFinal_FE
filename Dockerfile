FROM node:18.20.5-alpine

WORKDIR /app

COPY package.json ./
RUN NODE_OPTIONS=--max-old-space-size=4096 npm install --legacy-peer-deps

COPY . .

EXPOSE 3000
ENTRYPOINT ["sh", "-c", "NODE_OPTIONS=--max-old-space-size=4096 npm run dev --legacy-peer-deps "]
