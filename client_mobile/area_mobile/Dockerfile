# Use node base image
FROM node:14

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Install dependencies
RUN npm install

# Expose port for react-native
EXPOSE 8081

# Start the react-native server
CMD ["npm", "start"]
