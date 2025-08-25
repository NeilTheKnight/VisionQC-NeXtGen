import { useState, useEffect } from "react"
import { X, AlertTriangle, CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface AlertBannerProps {
  type: "success" | "warning" | "error"
  title: string
  message: string
  autoDismiss?: boolean
  dismissAfter?: number
  onDismiss?: () => void
}

export function AlertBanner({ 
  type, 
  title, 
  message, 
  autoDismiss = true, 
  dismissAfter = 5000,
  onDismiss 
}: AlertBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (autoDismiss) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onDismiss?.()
      }, dismissAfter)
      return () => clearTimeout(timer)
    }
  }, [autoDismiss, dismissAfter, onDismiss])

  if (!isVisible) return null

  const variants = {
    success: {
      bg: "bg-industrial-success",
      icon: CheckCircle,
      text: "text-white"
    },
    warning: {
      bg: "bg-industrial-warning", 
      icon: AlertCircle,
      text: "text-industrial-gray"
    },
    error: {
      bg: "bg-industrial-error",
      icon: AlertTriangle,
      text: "text-white"
    }
  }

  const variant = variants[type]
  const IconComponent = variant.icon

  return (
    <div 
      className={cn(
        "fixed top-4 left-1/2 transform -translate-x-1/2 z-50 min-w-[400px] max-w-2xl",
        "animate-in slide-in-from-top-2 duration-300"
      )}
    >
      <div className={cn(
        "rounded-lg shadow-industrial p-4 flex items-start gap-3",
        variant.bg,
        variant.text
      )}>
        <IconComponent className="w-6 h-6 flex-shrink-0 mt-0.5" />
        
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-base leading-tight">
            {title}
          </h4>
          <p className="text-sm mt-1 opacity-90">
            {message}
          </p>
        </div>

        <Button
          size="sm"
          variant="ghost"
          className={cn(
            "h-6 w-6 p-0 flex-shrink-0",
            variant.text,
            "hover:bg-white/20"
          )}
          onClick={() => {
            setIsVisible(false)
            onDismiss?.()
          }}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

// Hook for managing alerts
export function useAlerts() {
  const [alerts, setAlerts] = useState<Array<{
    id: string
    type: "success" | "warning" | "error"
    title: string
    message: string
  }>>([])

  const addAlert = (alert: Omit<typeof alerts[0], "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    setAlerts(prev => [...prev, { ...alert, id }])
  }

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id))
  }

  return {
    alerts,
    addAlert,
    removeAlert,
    showSuccess: (title: string, message: string) => addAlert({ type: "success", title, message }),
    showWarning: (title: string, message: string) => addAlert({ type: "warning", title, message }),
    showError: (title: string, message: string) => addAlert({ type: "error", title, message })
  }
}