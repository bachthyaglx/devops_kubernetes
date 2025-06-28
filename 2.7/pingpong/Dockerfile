# Use an official Node.js runtime as base image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy only the files needed
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port
EXPOSE 3000

# Start the app
CMD ["node", "index.js"]
