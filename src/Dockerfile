# Dockerfile
FROM node:18

WORKDIR /app

# Copy package.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all backend source files
COPY . .

# Install ts-node globally for running TypeScript
RUN npm install -g ts-node typescript

# Expose running port
EXPOSE 3000

# Start the app
CMD ["ts-node", "src/app.ts"]
