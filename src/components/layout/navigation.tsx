import { NavLink } from "react-router-dom"
import { cn } from "@/lib/utils"
import { 
  Eye, 
  History, 
  Settings, 
  Users, 
  LogOut,
  Activity
} from "lucide-react"
import { StatusIndicator } from "@/components/ui/status-indicator"
import { useAuth } from "@/hooks/useAuth"

const navigationItems = [
  {
    name: "实时检测",
    href: "/",
    icon: Eye
  },
  {
    name: "历史记录", 
    href: "/history",
    icon: History
  },
  {
    name: "系统监控",
    href: "/monitoring",
    icon: Activity
  },
  {
    name: "用户管理",
    href: "/users",
    icon: Users
  },
  {
    name: "系统设置",
    href: "/settings", 
    icon: Settings
  }
]

export function Navigation() {
  const { user, logout } = useAuth()
  
  return (
    <nav className="w-60 bg-card border-r border-border shadow-card">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Eye className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">VisionQC</h1>
            <p className="text-sm text-muted-foreground">NeXtGen</p>
          </div>
        </div>
      </div>

      <div className="px-6 mb-6">
        <div className="p-3 bg-muted rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">系统状态</span>
            <StatusIndicator status="online" size="sm" />
          </div>
          <div className="text-xs text-muted-foreground">
            所有设备运行正常
          </div>
        </div>
      </div>

      <div className="px-3 space-y-1">
        {navigationItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground shadow-industrial"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )
            }
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
      </div>

      <div className="absolute bottom-6 left-3 right-3 space-y-3">
        {/* User Info */}
        <div className="px-3 py-2 border border-border rounded-lg bg-muted/50">
          <p className="text-sm font-medium text-foreground">{user?.username}</p>
          <p className="text-xs text-muted-foreground">{user?.email}</p>
        </div>
        
        {/* Logout Button */}
        <button 
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          退出登录
        </button>
      </div>
    </nav>
  )
}