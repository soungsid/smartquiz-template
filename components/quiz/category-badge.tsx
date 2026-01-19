import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"
import { 
  Beaker, 
  Calculator, 
  Globe, 
  BookOpen, 
  Code, 
  Music, 
  Palette,
  Trophy,
  Lightbulb
} from "lucide-react"

const categoryConfig: Record<string, { icon: LucideIcon; color: string }> = {
  science: { icon: Beaker, color: "bg-primary/20 text-primary border-primary/30" },
  mathematics: { icon: Calculator, color: "bg-secondary/20 text-secondary border-secondary/30" },
  geography: { icon: Globe, color: "bg-accent/20 text-accent border-accent/30" },
  history: { icon: BookOpen, color: "bg-warning/20 text-warning border-warning/30" },
  technology: { icon: Code, color: "bg-primary/20 text-primary border-primary/30" },
  music: { icon: Music, color: "bg-accent/20 text-accent border-accent/30" },
  art: { icon: Palette, color: "bg-secondary/20 text-secondary border-secondary/30" },
  sports: { icon: Trophy, color: "bg-success/20 text-success border-success/30" },
  general: { icon: Lightbulb, color: "bg-muted text-muted-foreground border-border" },
}

interface CategoryBadgeProps {
  category: string
  size?: "sm" | "md" | "lg"
  showIcon?: boolean
  className?: string
}

const sizeStyles = {
  sm: "px-2 py-1 text-xs gap-1",
  md: "px-3 py-1.5 text-sm gap-1.5",
  lg: "px-4 py-2 text-base gap-2",
}

const iconSizes = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5",
}

export function CategoryBadge({
  category,
  size = "md",
  showIcon = true,
  className,
}: CategoryBadgeProps) {
  const config = categoryConfig[category.toLowerCase()] || categoryConfig.general
  const Icon = config.icon

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium capitalize",
        config.color,
        sizeStyles[size],
        className
      )}
    >
      {showIcon && <Icon className={iconSizes[size]} />}
      {category}
    </span>
  )
}
