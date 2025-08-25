import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusIndicator } from "@/components/ui/status-indicator"
import { 
  Play, 
  Pause, 
  Camera, 
  Maximize2,
  Settings
} from "lucide-react"
import { cn } from "@/lib/utils"

interface CameraViewProps {
  cameraId: string
  title: string
  isActive?: boolean
  className?: string
}

export function CameraView({ cameraId, title, isActive = false, className }: CameraViewProps) {
  const [isDetecting, setIsDetecting] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"online" | "offline" | "warning">("online")

  // Simulate real-time detection state
  useEffect(() => {
    if (isDetecting) {
      const interval = setInterval(() => {
        // Simulate occasional warnings
        setConnectionStatus(Math.random() > 0.9 ? "warning" : "online")
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [isDetecting])

  return (
    <Card className={cn("shadow-card", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Camera className="w-5 h-5 text-primary" />
            {title}
          </CardTitle>
          <StatusIndicator 
            status={connectionStatus} 
            label={connectionStatus === "online" ? "在线" : connectionStatus === "warning" ? "警告" : "离线"} 
          />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Video Stream Container */}
        <div className="relative bg-muted rounded-lg overflow-hidden aspect-video">
          {/* Simulated video stream */}
          <div className="absolute inset-0 bg-gradient-to-br from-industrial-blue-light/20 to-industrial-gray/20 flex items-center justify-center">
            {isDetecting ? (
              <div className="space-y-4 text-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-muted-foreground">检测中...</p>
              </div>
            ) : (
              <div className="text-center">
                <Camera className="w-16 h-16 text-muted-foreground/50 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">点击开始检测</p>
              </div>
            )}
          </div>

          {/* Detection Overlay */}
          {isDetecting && (
            <>
              {/* Simulated bounding boxes */}
              <div className="absolute top-20 left-16 w-24 h-32 border-2 border-industrial-success rounded">
                <div className="bg-industrial-success text-white text-xs px-1 py-0.5 rounded-br">
                  正常 98%
                </div>
              </div>
              <div className="absolute top-32 right-20 w-20 h-28 border-2 border-industrial-error rounded">
                <div className="bg-industrial-error text-white text-xs px-1 py-0.5 rounded-br">
                  缺陷 85%
                </div>
              </div>
            </>
          )}

          {/* Video Controls */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <Button 
              size="sm" 
              variant="secondary"
              className="bg-background/80 backdrop-blur-sm"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
            <Button 
              size="sm" 
              variant="secondary"
              className="bg-background/80 backdrop-blur-sm"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={() => setIsDetecting(!isDetecting)}
            className={cn(
              "flex-1 h-12 text-base font-medium",
              isDetecting 
                ? "bg-industrial-warning hover:bg-industrial-warning/90" 
                : "bg-gradient-primary hover:opacity-90"
            )}
          >
            {isDetecting ? (
              <>
                <Pause className="w-5 h-5 mr-2" />
                暂停检测
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                开始检测
              </>
            )}
          </Button>
        </div>

        {/* Detection Stats */}
        {isDetecting && (
          <div className="grid grid-cols-3 gap-3 pt-2 border-t border-border">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">检测数</p>
              <p className="text-lg font-bold text-foreground">1,247</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">合格率</p>
              <p className="text-lg font-bold text-industrial-success">98.3%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">FPS</p>
              <p className="text-lg font-bold text-foreground">15.2</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}