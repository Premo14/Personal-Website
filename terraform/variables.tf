variable "aws_region" {
  description = "The AWS region to deploy in"
  default     = "us-east-1"
}

variable "ami_id" {
  description = "AMI ID for the EC2 instance"
  default     = "ami-0866a3c8686eaeeba"
}

variable "instance_type" {
  description = "EC2 instance type"
  default     = "t2.micro"
}

variable "key_name" {
  description = "Name of the AWS key pair"
}

variable "private_key_path" {
  description = "Path to the private key file for SSH access"
}

variable "postgres_user" {
  description = "Postgres username"
  type        = string
}

variable "postgres_password" {
  description = "Postgres password"
  type        = string
}

variable "postgres_db" {
  description = "Postgres database name"
  type        = string
}

variable "postgres_port" {
  description = "5432"
}

variable "backend_port" {
  description = "Backend port"
  default     = 8080
}

variable "vite_build_stage" {
  description = "Tells app to build in production"
  default = "production"
}

variable "role" {
  description = "Role for EC2 instance"
}

variable "certificate_arn" {
  description = "The ARN of the SSL certificate for HTTPS"
}