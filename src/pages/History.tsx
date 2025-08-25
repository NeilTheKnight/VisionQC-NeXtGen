import { useState } from "react"
import Layout from "./Layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Calendar
} from "lucide-react"

export default function History() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCamera, setSelectedCamera] = useState("all")
  const [selectedResult, setSelectedResult] = useState("all")

  // Mock data for demonstration
  const historyData = Array.from({ length: 12 }, (_, i) => ({
    id: `detect_${Date.now()}_${i}`,
    timestamp: new Date(Date.now() - i * 3600000).toLocaleString(),
    camera: `工位${(i % 2) + 1}`,
    result: i % 8 === 0 ? "不合格" : "合格",
    confidence: Math.floor(Math.random() * 20) + 80,
    defectType: i % 8 === 0 ? "瓶身破损" : null,
    imageUrl: `data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 200 150">
        <rect width="200" height="150" fill="#f1f5f9"/>
        <rect x="60" y="30" width="80" height="90" fill="none" stroke="${i % 8 === 0 ? '#ef4444' : '#22c55e'}" stroke-width="2" rx="4"/>
        <text x="100" y="75" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#64748b">
          检测图像 ${i + 1}
        </text>
        <text x="100" y="90" text-anchor="middle" font-family="sans-serif" font-size="10" fill="${i % 8 === 0 ? '#ef4444' : '#22c55e'}">
          ${i % 8 === 0 ? '缺陷检测' : '正常产品'}
        </text>
      </svg>
    `)}`
  }))

  const filteredData = historyData.filter(item => {
    const matchesSearch = item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.defectType?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCamera = selectedCamera === "all" || item.camera === selectedCamera
    const matchesResult = selectedResult === "all" || item.result === selectedResult
    
    return matchesSearch && matchesCamera && matchesResult
  })

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">检测历史记录</h1>
            <p className="text-muted-foreground">查看和管理历史检测数据</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              导出CSV
            </Button>
            <Button className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              生成报告
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              筛选条件
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">搜索</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="搜索ID或缺陷类型..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">检测工位</label>
                <Select value={selectedCamera} onValueChange={setSelectedCamera}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择工位" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部工位</SelectItem>
                    <SelectItem value="工位1">工位1</SelectItem>
                    <SelectItem value="工位2">工位2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">检测结果</label>
                <Select value={selectedResult} onValueChange={setSelectedResult}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择结果" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部结果</SelectItem>
                    <SelectItem value="合格">合格</SelectItem>
                    <SelectItem value="不合格">不合格</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">时间范围</label>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  选择日期
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle>检测记录 ({filteredData.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredData.map((item) => (
                <div
                  key={item.id}
                  className="border border-border rounded-lg p-4 space-y-3 hover:shadow-card transition-shadow cursor-pointer"
                >
                  {/* Image */}
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <img 
                      src={item.imageUrl} 
                      alt={`检测图像 ${item.id}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">
                        {item.camera}
                      </span>
                      <div className="flex items-center gap-1">
                        {item.result === "合格" ? (
                          <CheckCircle className="w-4 h-4 text-industrial-success" />
                        ) : (
                          <XCircle className="w-4 h-4 text-industrial-error" />
                        )}
                        <span 
                          className={`text-xs font-medium ${
                            item.result === "合格" 
                              ? "text-industrial-success" 
                              : "text-industrial-error"
                          }`}
                        >
                          {item.result}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      {item.timestamp}
                    </div>

                    <div className="text-xs">
                      <span className="text-muted-foreground">置信度: </span>
                      <span className="font-medium text-foreground">{item.confidence}%</span>
                    </div>

                    {item.defectType && (
                      <div className="text-xs">
                        <span className="text-muted-foreground">缺陷类型: </span>
                        <span className="font-medium text-industrial-error">{item.defectType}</span>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="w-3 h-3 mr-1" />
                        查看
                      </Button>
                      {item.result === "不合格" && (
                        <Button size="sm" variant="outline" className="flex-1">
                          复判
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredData.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-2">未找到匹配的记录</div>
                <div className="text-sm text-muted-foreground">请尝试调整筛选条件</div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}