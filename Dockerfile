# Use Node 8 as base
FROM node:8

# Set the /app folder as the current workdir
WORKDIR /app
# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./
# Install the dependencies for 'improved-pancake'
RUN npm install
# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# Expose port 8080 to the world
EXPOSE 8080
# Default command
CMD [ "npm", "run", "serve" ]