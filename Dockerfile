# Use Node 8 as base
FROM node:8

# Bottom-up approach for node_packages installation, so that Docker caches
# the files and doesn't execute npm install unless something changed
WORKDIR /app/functions
# copy both 'package.json' and 'package-lock.json' (if available)
COPY ./functions/package*.json ./
# Install the dependencies for 'functions'
RUN npm install
# copy project files and folders to the functions directory
COPY ./functions/. .

# Set the /app folder as the current workdir
WORKDIR /app
# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./
# Install the dependencies for 'improved-pancake'
RUN npm install
# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# Set the firebase admin credentials for cloud functions
RUN export GOOGLE_APPLICATION_CREDENTIALS="functions/improved-pancake-credentials.json"
# Expose port 8080 to the world
EXPOSE 8080
# Default command
CMD [ "npm", "run", "serve" ]