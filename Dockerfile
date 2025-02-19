# Use Node.js as base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy everything
COPY . .

# Build frontend
RUN cd frontend && npm run build

# Expose backend port
EXPOSE 8000

# Start the backend
CMD ["node", "backend/index.js"]
