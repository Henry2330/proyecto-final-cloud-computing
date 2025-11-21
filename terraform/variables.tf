variable "aws_region" {
  description = "Región de AWS"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Nombre del proyecto"
  type        = string
  default     = "proyecto-cicd"
}

variable "environment" {
  description = "Ambiente (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "app_port" {
  description = "Puerto de la aplicación"
  type        = number
  default     = 3000
}

variable "app_count" {
  description = "Número de instancias de la aplicación"
  type        = number
  default     = 1
}

variable "fargate_cpu" {
  description = "CPU para Fargate task"
  type        = string
  default     = "256"
}

variable "fargate_memory" {
  description = "Memoria para Fargate task"
  type        = string
  default     = "512"
}

variable "health_check_path" {
  description = "Path para health check"
  type        = string
  default     = "/health"
}

variable "autoscaling_enabled" {
  description = "Habilitar auto scaling para ECS"
  type        = bool
  default     = false
}

variable "autoscaling_min_capacity" {
  description = "Capacidad mínima para auto scaling"
  type        = number
  default     = 1
}

variable "autoscaling_max_capacity" {
  description = "Capacidad máxima para auto scaling"
  type        = number
  default     = 4
}

variable "autoscaling_cpu_target" {
  description = "Target de CPU para auto scaling (%)"
  type        = number
  default     = 70
}

variable "autoscaling_memory_target" {
  description = "Target de memoria para auto scaling (%)"
  type        = number
  default     = 80
}

variable "certificate_arn" {
  description = "ARN del certificado SSL/TLS de ACM para HTTPS"
  type        = string
  default     = ""
}

variable "domain_name" {
  description = "Nombre del dominio para el certificado SSL"
  type        = string
  default     = ""
}

