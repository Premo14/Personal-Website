#!/bin/bash
exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1
set -euxo pipefail

echo "---- STARTING USER DATA SCRIPT ----"

# Install base packages
apt-get update -y && apt-get upgrade -y
apt-get install -y ca-certificates curl gnupg lsb-release unzip jq

# Install Docker
echo "Installing Docker..."
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
systemctl start docker
systemctl enable docker
chmod 666 /var/run/docker.sock

# Install AWS CLI
echo "Installing AWS CLI..."
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
./aws/install

# Log in to ECR
echo "Logging in to ECR..."
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 739275461129.dkr.ecr.us-east-1.amazonaws.com

# Pull Docker images
echo "Pulling Docker images..."
docker pull 739275461129.dkr.ecr.us-east-1.amazonaws.com/personal-website-frontend:latest
docker pull 739275461129.dkr.ecr.us-east-1.amazonaws.com/personal-website-backend:latest
docker pull postgres:15

# Create docker-compose.yml
echo "Creating docker-compose.yml..."
cat <<EOT > /home/ubuntu/docker-compose.yml
version: "3.8"
services:
  postgres:
    image: postgres:15
    container_name: postgres
    restart: always
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
      VITE_UPLOAD_PASSCODE: ${VITE_UPLOAD_PASSCODE}
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - personal-website-network

  backend:
    image: 739275461129.dkr.ecr.us-east-1.amazonaws.com/personal-website-backend:latest
    container_name: backend
    restart: always
    environment:
      DB_HOST: postgres
      DB_PORT: 5432
      DB_USER: ${POSTGRES_USER}
      DB_PASSWORD: ${POSTGRES_PASSWORD}
      DB_NAME: ${POSTGRES_DB}
    ports:
      - "8080:8080"
    depends_on:
      - postgres
    networks:
      - personal-website-network

  frontend:
    image: 739275461129.dkr.ecr.us-east-1.amazonaws.com/personal-website-frontend:latest
    container_name: frontend
    restart: always
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - personal-website-network

volumes:
  postgres-data:

networks:
  personal-website-network:
    driver: bridge
EOT

# Create .env file
echo "Creating .env file..."
cat <<EOT > /home/ubuntu/.env
POSTGRES_USER=${POSTGRES_USER}
POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
POSTGRES_DB=${POSTGRES_DB}
VITE_UPLOAD_PASSCODE=${VITE_UPLOAD_PASSCODE}
EOT

# Start containers
echo "Starting containers..."
cd /home/ubuntu
docker compose --env-file .env up -d

echo "---- USER DATA SCRIPT COMPLETE ----"
