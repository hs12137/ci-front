FROM nginx
COPY build /react
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

