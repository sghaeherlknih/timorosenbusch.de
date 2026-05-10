FROM nginx:1.27-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY src/ /usr/share/nginx/html/
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
