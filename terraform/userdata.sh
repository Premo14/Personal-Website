#!/bin/bash
set -e

# Update and install Docker
sudo apt-get update -y && sudo apt-get upgrade -y
sudo apt-get install -y ca-certificates curl gnupg lsb-release unzip
curl -fsSL https://get.docker.com -o get-docker.sh && sudo sh get-docker.sh
sudo systemctl start docker && sudo systemctl enable docker
sudo chmod 666 /var/run/docker.sock

# Install AWS CLI
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip && sudo ./aws/install

# Authenticate Docker to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 083133290828.dkr.ecr.us-east-1.amazonaws.com

# Pull images
docker pull 083133290828.dkr.ecr.us-east-1.amazonaws.com/personal-website-frontend:latest
docker pull 083133290828.dkr.ecr.us-east-1.amazonaws.com/personal-website-backend:latest
docker pull postgres:15

# Create docker-compose.yml
cat <<EOT > /home/ubuntu/docker-compose.yml
services:
  postgres:
    image: postgres:15
    container_name: postgres
    restart: always
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - personal-website-network

  backend:
    image: 083133290828.dkr.ecr.us-east-1.amazonaws.com/personal-website-backend:latest
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
    image: 083133290828.dkr.ecr.us-east-1.amazonaws.com/personal-website-frontend:latest
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
cat <<EOT > /home/ubuntu/.env
POSTGRES_USER=${POSTGRES_USER}
POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
POSTGRES_DB=${POSTGRES_DB}
EOT

# Start containers
cd /home/ubuntu
docker compose --env-file .env up -d
