# Use Node base image
FROM node:18

# Create app directory
WORKDIR /rms backend

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Expose backend port
EXPOSE 9000

# Run the backend
CMD ["node", "server.js"]