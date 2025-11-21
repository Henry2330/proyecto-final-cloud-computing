output "vpc_id" {
  description = "ID de la VPC"
  value       = aws_vpc.main.id
}

output "ecr_repository_url" {
  description = "URL del repositorio ECR"
  value       = aws_ecr_repository.app.repository_url
}

output "alb_dns_name" {
  description = "DNS del Application Load Balancer"
  value       = aws_lb.main.dns_name
}

output "alb_url" {
  description = "URL completa de la aplicación"
  value       = var.certificate_arn != "" || var.domain_name != "" ? "https://${aws_lb.main.dns_name}" : "http://${aws_lb.main.dns_name}"
}

output "alb_https_url" {
  description = "URL HTTPS de la aplicación (si HTTPS está habilitado)"
  value       = var.certificate_arn != "" || var.domain_name != "" ? "https://${aws_lb.main.dns_name}" : "HTTPS no configurado - Configure certificate_arn o domain_name"
}

output "certificate_arn" {
  description = "ARN del certificado SSL/TLS"
  value       = var.certificate_arn != "" ? var.certificate_arn : try(aws_acm_certificate.main[0].arn, "No certificate configured")
}

output "certificate_validation_records" {
  description = "Registros DNS para validar el certificado (si se creó con ACM)"
  value       = try(aws_acm_certificate.main[0].domain_validation_options, [])
}

output "ecs_cluster_name" {
  description = "Nombre del cluster ECS"
  value       = aws_ecs_cluster.main.name
}

output "ecs_service_name" {
  description = "Nombre del servicio ECS"
  value       = aws_ecs_service.app.name
}

output "cloudwatch_log_group" {
  description = "Nombre del log group de CloudWatch"
  value       = aws_cloudwatch_log_group.ecs.name
}

output "cloudwatch_dashboard_url" {
  description = "URL del dashboard de CloudWatch"
  value       = "https://console.aws.amazon.com/cloudwatch/home?region=${var.aws_region}#dashboards:name=${aws_cloudwatch_dashboard.main.dashboard_name}"
}