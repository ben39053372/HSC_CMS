FROM nginx:1.16.0-alpine
COPY /build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
COPY ssl/certificate.crt /etc/nginx/certs/certificate.crt
COPY ssl/private.key /etc/nginx/certs/private.key
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
