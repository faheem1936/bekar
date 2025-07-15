# Use official Node.js base image
FROM node:18

# Install ffmpeg (for audio processing)
RUN apt-get update && \
    apt-get install -y ffmpeg && \
    apt-get clean
# Set working directory inside container
WORKDIR /app
# Use official Node.js image
FROM node:18

# Copy only package.json files first
COPY package*.json ./

# Install NPM dependencies
RUN npm install

# Copy all other files (bot code, index.js, etc.)
COPY . .

# Start the bot
CMD ["node", "index.js"]
