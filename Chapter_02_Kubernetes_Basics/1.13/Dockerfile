# Use official Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
