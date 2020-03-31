git pull
docker stop insurance-cms-nginx
docker rm insurance-cms-nginx
docker build -t insurance-cms-nginx .
docker run -p 8081:80 -p 8443:443 -d --name insurance-cms-nginx insurance-cms-nginx
