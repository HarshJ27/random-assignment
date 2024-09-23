# Use a Node.js version that supports the ??= operator (v14.17.0 or higher)
FROM node:16-alpine

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your application will run on
EXPOSE 3000

# Command to start the server
CMD ["npm", "start"]
