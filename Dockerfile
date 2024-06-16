# STEP 1: Build the Angular App using the production configuration
FROM node:latest as build
# Set the (virtual) working directory
WORKDIR /app
# Copy the package.json and package-lock.json files
COPY package*.json ./
# Run a clean install of dependencies
RUN npm ci
# Install Angular CLI globally
RUN npm install -g @angular/cli
# Copy all files
COPY . .
# Build the application
# RUN npm run build --configuration=production
RUN npm run build:production

# STEP 2: We use the nginx image to serve the application
FROM nginx:latest

# Copy the build output to replace the default nginx contents
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
#
COPY --from=build /app/dist/shawarma-rxjs-app/browser /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Build: docker build -t rcaliwag/shawarma-maker-app .
# Run:   docker run --name=shawarma-maker -p 8080:80 -d rcaliwag/shawarma-maker-app
# Push:  docker push rcaliwag/shawarma-maker-app:latest
# Pull:  docker pull rcaliwag/shawarma-maker-app:latest