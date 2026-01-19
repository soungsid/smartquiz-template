import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  variant?: "default" | "primary" | "accent" | "success"
  className?: string
}

const variantStyles = {
  default: "bg-muted/50",
  primary: "bg-primary/10",
  accent: "bg-accent/10",
  success: "bg-success/10",
}

const iconVariantStyles = {
  default: "bg-muted text-muted-foreground",
  primary: "gradient-primary text-primary-foreground",
  accent: "bg-accent/20 text-accent",
  success: "bg-success/20 text-success",
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  variant = "default",
  className,
}: StatCardProps) {
  return (
    <div className={cn("glass rounded-2xl p-6 hover-lift", className)}>
      <div className="flex items-start justify-between mb-4">
        <div className={cn("p-3 rounded-xl", iconVariantStyles[variant])}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full",
            trend.isPositive 
              ? "bg-success/20 text-success" 
              : "bg-destructive/20 text-destructive"
          )}>
            <span>{trend.isPositive ? "+" : ""}{trend.value}%</span>
          </div>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-3xl font-bold text-foreground">{value}</p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  )
}
