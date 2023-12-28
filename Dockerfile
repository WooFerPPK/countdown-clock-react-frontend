# Use the Nginx image from Docker Hub
FROM nginx:alpine

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy a new configuration file to the Nginx configuration directory
COPY nginx.conf /etc/nginx/conf.d/

# Copy the dist folder to the Nginx serve directory
COPY dist/ /usr/share/nginx/html/

