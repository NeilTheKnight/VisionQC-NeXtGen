import { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: ReactNode
  trend?: {
    value: number
    label: string
    isPositive?: boolean
  }
  variant?: "default" | "success" | "warning" | "error"
  className?: string
}

export function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  variant = "default",
  className 
}: StatCardProps) {
  const variantClasses = {
    default: "border-border",
    success: "border-industrial-success/20 bg-industrial-success/5",
    warning: "border-industrial-warning/20 bg-industrial-warning/5", 
    error: "border-industrial-error/20 bg-industrial-error/5"
  }

  return (
    <Card className={cn("shadow-card", variantClasses[variant], className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>
            <p className="text-3xl font-bold text-foreground">
              {value}
            </p>
            {subtitle && (
              <p className="text-sm text-muted-foreground">
                {subtitle}
              </p>
            )}
            {trend && (
              <div className="flex items-center gap-1">
                <span 
                  className={cn(
                    "text-sm font-medium",
                    trend.isPositive ? "text-industrial-success" : "text-industrial-error"
                  )}
                >
                  {trend.isPositive ? "+" : ""}{trend.value}%
                </span>
                <span className="text-sm text-muted-foreground">
                  {trend.label}
                </span>
              </div>
            )}
          </div>
          {icon && (
            <div className="text-primary/80">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}