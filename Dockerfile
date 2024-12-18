# make a file called Dockerfile

FROM node:18

# Create app directory
WORKDIR /app

# COPY Package.json file
COPY package.json ./

# Run npm install command
RUN npm install

# Copy the rest of the files
COPY . .

# Expose the port
EXPOSE 5000

# Run the app
CMD ["npm", "run", "dev"]