import { cn } from "@/lib/utils"

interface StatusIndicatorProps {
  status: "online" | "offline" | "warning"
  size?: "sm" | "md" | "lg"
  label?: string
  className?: string
}

export function StatusIndicator({ status, size = "md", label, className }: StatusIndicatorProps) {
  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4"
  }

  const statusClasses = {
    online: "bg-status-online shadow-[0_0_8px_hsl(var(--status-online))]",
    offline: "bg-status-offline shadow-[0_0_8px_hsl(var(--status-offline))]",
    warning: "bg-status-warning shadow-[0_0_8px_hsl(var(--status-warning))]"
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div 
        className={cn(
          "rounded-full border-2 border-background animate-pulse",
          sizeClasses[size],
          statusClasses[status]
        )}
      />
      {label && (
        <span className="text-sm font-medium text-foreground">
          {label}
        </span>
      )}
    </div>
  )
}