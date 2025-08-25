import { useState, useEffect } from "react"
import { StatCard } from "@/components/ui/stat-card"
import { CameraView } from "@/components/dashboard/camera-view"
import { AlertBanner, useAlerts } from "@/components/dashboard/alert-banner"
import { 
  Eye, 
  CheckCircle, 
  XCircle, 
  TrendingUp,
  Clock,
  Wifi
} from "lucide-react"
import heroBg from "@/assets/hero-bg.jpg"

export default function Dashboard() {
  const { alerts, removeAlert, showError, showWarning, showSuccess } = useAlerts()
  const [stats, setStats] = useState({
    totalDetected: 1247,
    passCount: 1226,
    failCount: 21,
    passRate: 98.3,
    avgProcessingTime: 0.8,
    systemUptime: "99.7%"
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalDetected: prev.totalDetected + Math.floor(Math.random() * 3),
        passCount: prev.passCount + Math.floor(Math.random() * 3),
        failCount: prev.failCount + (Math.random() > 0.8 ? 1 : 0)
      }))

      // Simulate occasional defect alerts
      if (Math.random() > 0.95) {
        showError("质量异常", "工位1检测到瓶身破损，已自动标记")
      } else if (Math.random() > 0.9) {
        showWarning("注意", "工位2检测置信度略低，建议人工复查")
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [showError, showWarning])

  const passRate = ((stats.passCount / stats.totalDetected) * 100).toFixed(1)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative h-32 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-industrial-blue/90 to-industrial-blue/70" />
        <div className="relative h-full flex items-center px-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">
              慧眼质控云 —— AI驱动的新一代工业质检平台
            </h1>
            <p className="text-industrial-blue-light">
              实时监控生产线质量状态 • 智能缺陷识别
            </p>
          </div>
        </div>
      </div>

      {/* Alert Banners */}
      {alerts.map((alert) => (
        <AlertBanner
          key={alert.id}
          type={alert.type}
          title={alert.title}
          message={alert.message}
          onDismiss={() => removeAlert(alert.id)}
        />
      ))}

      <div className="p-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <StatCard
            title="总检测数"
            value={stats.totalDetected.toLocaleString()}
            icon={<Eye className="w-6 h-6" />}
            className="lg:col-span-1"
          />
          <StatCard
            title="合格产品"
            value={stats.passCount.toLocaleString()}
            icon={<CheckCircle className="w-6 h-6" />}
            variant="success"
            className="lg:col-span-1"
          />
          <StatCard
            title="不合格产品"
            value={stats.failCount}
            icon={<XCircle className="w-6 h-6" />}
            variant="error"
            className="lg:col-span-1"
          />
          <StatCard
            title="合格率"
            value={`${passRate}%`}
            subtitle="目标: ≥98%"
            icon={<TrendingUp className="w-6 h-6" />}
            variant={parseFloat(passRate) >= 98 ? "success" : "warning"}
            trend={{
              value: 0.3,
              label: "vs 昨日",
              isPositive: true
            }}
            className="lg:col-span-1"
          />
          <StatCard
            title="平均延迟"
            value={`${stats.avgProcessingTime}s`}
            subtitle="目标: ≤2s"
            icon={<Clock className="w-6 h-6" />}
            variant="success"
            className="lg:col-span-1"
          />
          <StatCard
            title="系统正常运行时间"
            value={stats.systemUptime}
            icon={<Wifi className="w-6 h-6" />}
            variant="success"
            className="lg:col-span-1"
          />
        </div>

        {/* Camera Views */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CameraView
            cameraId="camera-1"
            title="工位1 - 主检测线"
            isActive={true}
          />
          <CameraView
            cameraId="camera-2" 
            title="工位2 - 备用检测线"
          />
        </div>

        {/* Additional Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card rounded-lg p-4 border border-border shadow-card">
            <h3 className="font-semibold text-foreground mb-2">快速操作</h3>
            <div className="space-y-2">
              <button 
                onClick={() => showSuccess("操作成功", "所有工位检测已启动")}
                className="w-full text-left px-3 py-2 text-sm rounded bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              >
                启动所有检测
              </button>
              <button className="w-full text-left px-3 py-2 text-sm rounded bg-industrial-warning text-industrial-gray hover:opacity-90 transition-opacity">
                暂停所有检测
              </button>
              <button className="w-full text-left px-3 py-2 text-sm rounded bg-muted text-muted-foreground hover:bg-accent transition-colors">
                导出今日报告
              </button>
            </div>
          </div>

          <div className="bg-card rounded-lg p-4 border border-border shadow-card">
            <h3 className="font-semibold text-foreground mb-2">实时状态</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">当前FPS</span>
                <span className="font-medium text-foreground">15.2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">CPU使用率</span>
                <span className="font-medium text-foreground">45%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">内存使用</span>
                <span className="font-medium text-foreground">2.1/8GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">磁盘可用</span>
                <span className="font-medium text-foreground">127GB</span>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-4 border border-border shadow-card">
            <h3 className="font-semibold text-foreground mb-2">今日概览</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">检测开始时间</span>
                <span className="font-medium text-foreground">08:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">运行时长</span>
                <span className="font-medium text-foreground">6h 32m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">平均产能</span>
                <span className="font-medium text-foreground">190件/h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">预计完成</span>
                <span className="font-medium text-foreground">17:30</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
