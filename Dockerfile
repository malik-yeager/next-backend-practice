# Dockerfile
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Install TypeScript globally (needed for ts-node)
RUN npm install -g typescript ts-node

# Expose port
EXPOSE 3000

# Start the app using ts-node
CMD ["ts-node", "app.ts"]
