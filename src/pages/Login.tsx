import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock, Shield } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useToast } from "@/hooks/use-toast"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call with default credentials
      if (email === "admin@example.com" && password === "admin123") {
        await login({
          email,
          role: "admin",
          username: "系统管理员"
        })
        toast({
          title: "登录成功",
          description: "欢迎回到 VisionQC NeXtGen 系统",
        })
        navigate("/")
      } else {
        toast({
          variant: "destructive",
          title: "登录失败",
          description: "邮箱或密码错误，请重试",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "登录失败",
        description: "系统错误，请稍后重试",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-industrial-bg to-industrial-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Title */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-industrial-primary/10 border border-industrial-primary/20">
              <Shield className="w-8 h-8 text-industrial-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-industrial-text">VisionQC NeXtGen</h1>
          <p className="text-industrial-text-secondary">慧眼质控云 —— AI驱动的新一代工业质检平台</p>
        </div>

        {/* Login Form */}
        <Card className="border border-industrial-border bg-card/50 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-xl text-industrial-text">用户登录</CardTitle>
            <CardDescription className="text-industrial-text-secondary">
              请输入您的登录凭据以访问系统
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-industrial-text flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  邮箱地址
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-industrial-text flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  密码
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="请输入密码"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-11 w-11 px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm text-industrial-text-secondary cursor-pointer"
                  >
                    记住我
                  </Label>
                </div>
                <Button variant="link" className="px-0 text-industrial-primary hover:text-industrial-primary/80">
                  忘记密码？
                </Button>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full h-11"
                disabled={isLoading}
              >
                {isLoading ? "登录中..." : "登录"}
              </Button>
            </form>

            {/* Register Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-industrial-text-secondary">
                还没有账户？{" "}
                <Button variant="link" className="px-0 text-industrial-primary hover:text-industrial-primary/80">
                  注册访客账户
                </Button>
              </p>
            </div>

            {/* Demo Credentials */}
            <div className="mt-4 p-3 bg-industrial-surface/50 rounded-lg border border-industrial-border">
              <p className="text-xs text-industrial-text-secondary text-center">
                演示账户: admin@example.com / admin123
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
