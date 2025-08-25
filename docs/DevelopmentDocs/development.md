# Development Guide | 开发指南

## English

### Development Environment Setup

#### Prerequisites
- **Node.js 18+** - JavaScript runtime
- **npm 9+** or **yarn 1.22+** - Package manager
- **Git** - Version control
- **VS Code** (recommended) - Code editor with extensions

#### Recommended VS Code Extensions
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

#### Initial Setup
```bash
# Clone the repository
git clone https://github.com/your-org/visionqc-nextgen.git
cd visionqc-nextgen

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.development

# Start development server
npm run dev
```

#### Environment Configuration
```bash
# .env.development
VITE_APP_TITLE=VisionQC NeXtGen (Dev)
VITE_API_BASE_URL=http://localhost:3001/api
VITE_WS_URL=ws://localhost:3001/ws
VITE_ENVIRONMENT=development
VITE_DEBUG=true
```

### Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (shadcn/ui)
│   ├── dashboard/       # Dashboard-specific components
│   ├── layout/          # Layout and navigation components
│   └── ProtectedRoute.tsx
├── hooks/               # Custom React hooks
│   ├── useAuth.tsx      # Authentication hook
│   ├── use-toast.ts     # Toast notifications
│   └── use-mobile.tsx   # Mobile detection
├── lib/                 # Utility functions
│   └── utils.ts         # Common utilities
├── pages/               # Page components (routes)
│   ├── Dashboard.tsx    # Main dashboard
│   ├── History.tsx      # Detection history
│   ├── Login.tsx        # Authentication
│   ├── Layout.tsx       # Common layout
│   └── Index.tsx        # Home page wrapper
├── assets/              # Static assets
│   └── hero-bg.jpg      # Images and media
├── App.tsx              # Root application component
├── main.tsx             # Application entry point
└── index.css            # Global styles and design system
```

### Coding Standards

#### TypeScript Guidelines

##### Interface Naming
```typescript
// ✅ Good - Use PascalCase for interfaces
interface UserProfile {
  id: string;
  username: string;
  role: UserRole;
}

// ✅ Good - Use descriptive names
interface CameraDetectionResult {
  cameraId: string;
  confidence: number;
  boundingBoxes: BoundingBox[];
}

// ❌ Avoid - Generic or unclear names
interface Data {
  stuff: any;
}
```

##### Component Props
```typescript
// ✅ Good - Define props interface
interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error';
  className?: string;
}

export function StatCard({ title, value, icon, variant = 'default', className }: StatCardProps) {
  // Component implementation
}
```

##### Hooks
```typescript
// ✅ Good - Custom hook with proper typing
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

#### React Component Guidelines

##### Functional Components
```typescript
// ✅ Good - Use arrow functions for components
export const CameraView = ({ cameraId, title, isActive }: CameraViewProps) => {
  const [isDetecting, setIsDetecting] = useState(false);
  
  return (
    <Card className="shadow-card">
      {/* Component JSX */}
    </Card>
  );
};

// ✅ Good - Use default export for page components
export default function Dashboard() {
  // Page component implementation
}
```

##### State Management
```typescript
// ✅ Good - Use descriptive state names
const [detectionStats, setDetectionStats] = useState<DetectionStats>({
  totalDetected: 0,
  passCount: 0,
  failCount: 0
});

// ✅ Good - Use useCallback for event handlers
const handleStartDetection = useCallback(() => {
  setIsDetecting(true);
  // Start detection logic
}, []);
```

#### CSS and Styling Guidelines

##### Tailwind CSS Usage
```typescript
// ✅ Good - Use semantic class combinations
<div className="bg-card border border-border rounded-lg p-4 shadow-card">
  <h3 className="text-lg font-semibold text-foreground mb-2">
    Camera Status
  </h3>
</div>

// ✅ Good - Use design system colors
<Button variant="destructive" className="bg-industrial-error">
  Stop Detection
</Button>

// ❌ Avoid - Hardcoded colors
<div className="bg-red-500 text-white">
  Error Message
</div>
```

##### Component Styling
```typescript
// ✅ Good - Use cn utility for conditional classes
import { cn } from "@/lib/utils";

<div className={cn(
  "base-classes",
  variant === "error" && "error-classes",
  className
)}>
```

### Testing Strategy

#### Unit Testing
```typescript
// Example test file: components/ui/stat-card.test.tsx
import { render, screen } from '@testing-library/react';
import { StatCard } from './stat-card';

describe('StatCard', () => {
  it('renders title and value correctly', () => {
    render(<StatCard title="Test Metric" value="123" />);
    
    expect(screen.getByText('Test Metric')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
  });

  it('applies variant styling correctly', () => {
    render(<StatCard title="Error" value="0" variant="error" />);
    
    const card = screen.getByRole('article');
    expect(card).toHaveClass('border-industrial-error');
  });
});
```

#### Integration Testing
```typescript
// Example: pages/Dashboard.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dashboard from './Dashboard';

const createTestQueryClient = () => new QueryClient({
  defaultOptions: { queries: { retry: false } }
});

describe('Dashboard', () => {
  it('displays real-time statistics', async () => {
    const queryClient = createTestQueryClient();
    
    render(
      <QueryClientProvider client={queryClient}>
        <Dashboard />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/总检测数/)).toBeInTheDocument();
    });
  });
});
```

### Git Workflow

#### Branch Naming Convention
```bash
# Feature branches
feature/camera-management
feature/user-authentication
feature/detection-history

# Bug fixes
bugfix/login-validation
bugfix/camera-connection-issue

# Hotfixes
hotfix/security-patch
hotfix/critical-bug-fix

# Release branches
release/v1.0.0
release/v1.1.0
```

#### Commit Message Format
```bash
# Format: <type>(<scope>): <description>

# Examples:
feat(dashboard): add real-time statistics display
fix(auth): resolve login validation issue
docs(readme): update installation instructions
style(ui): improve button hover states
refactor(hooks): simplify useAuth implementation
test(components): add StatCard unit tests
chore(deps): update React to v18.3.1
```

#### Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Make Changes and Commit**
   ```bash
   git add .
   git commit -m "feat(feature): implement new functionality"
   ```

3. **Push and Create PR**
   ```bash
   git push origin feature/new-feature
   # Create PR through GitHub interface
   ```

4. **PR Requirements**
   - [ ] Code follows style guidelines
   - [ ] Tests pass
   - [ ] Documentation updated
   - [ ] No console errors
   - [ ] Responsive design verified

### Code Review Guidelines

#### Reviewer Checklist
- [ ] **Functionality**: Does the code work as intended?
- [ ] **Performance**: Are there any performance concerns?
- [ ] **Security**: Are there any security vulnerabilities?
- [ ] **Accessibility**: Is the UI accessible to all users?
- [ ] **Testing**: Are there adequate tests?
- [ ] **Documentation**: Is the code well-documented?

#### Common Review Comments
```typescript
// ✅ Good - Specific, actionable feedback
"Consider using useMemo here to prevent unnecessary recalculations"
"This component could benefit from error boundary handling"
"Add TypeScript interface for this prop object"

// ❌ Avoid - Vague or unhelpful comments
"This looks wrong"
"Change this"
```

### Performance Guidelines

#### Component Optimization
```typescript
// ✅ Good - Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);

// ✅ Good - Memoize components that receive stable props
const MemoizedComponent = memo(({ data }: Props) => {
  return <div>{data.value}</div>;
});

// ✅ Good - Use callback for event handlers
const handleClick = useCallback((id: string) => {
  onItemClick(id);
}, [onItemClick]);
```

#### Bundle Optimization
```typescript
// ✅ Good - Lazy load pages
const Dashboard = lazy(() => import('./pages/Dashboard'));
const History = lazy(() => import('./pages/History'));

// ✅ Good - Dynamic imports for large libraries
const loadChartLibrary = async () => {
  const { Chart } = await import('chart.js');
  return Chart;
};
```

### Debugging and Development Tools

#### Browser DevTools
- **React Developer Tools** - Component inspection
- **Redux DevTools** - State debugging (if using Redux)
- **Network Tab** - API request monitoring
- **Performance Tab** - Performance profiling

#### VS Code Debugging
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Chrome",
      "request": "launch",
      "type": "chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

---

## 中文

### 开发环境设置

#### 前置条件
- **Node.js 18+** - JavaScript运行时
- **npm 9+** 或 **yarn 1.22+** - 包管理器
- **Git** - 版本控制
- **VS Code**（推荐）- 代码编辑器及扩展

#### 推荐的VS Code扩展
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

#### 初始设置
```bash
# 克隆仓库
git clone https://github.com/your-org/visionqc-nextgen.git
cd visionqc-nextgen

# 安装依赖
npm install

# 复制环境文件
cp .env.example .env.development

# 启动开发服务器
npm run dev
```

### 编码规范

#### TypeScript指南

##### 接口命名
```typescript
// ✅ 好 - 使用PascalCase命名接口
interface UserProfile {
  id: string;
  username: string;
  role: UserRole;
}

// ✅ 好 - 使用描述性名称
interface CameraDetectionResult {
  cameraId: string;
  confidence: number;
  boundingBoxes: BoundingBox[];
}

// ❌ 避免 - 通用或不清楚的名称
interface Data {
  stuff: any;
}
```

##### 组件属性
```typescript
// ✅ 好 - 定义属性接口
interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error';
  className?: string;
}

export function StatCard({ title, value, icon, variant = 'default', className }: StatCardProps) {
  // 组件实现
}
```

#### React组件指南

##### 函数式组件
```typescript
// ✅ 好 - 使用箭头函数定义组件
export const CameraView = ({ cameraId, title, isActive }: CameraViewProps) => {
  const [isDetecting, setIsDetecting] = useState(false);
  
  return (
    <Card className="shadow-card">
      {/* 组件JSX */}
    </Card>
  );
};

// ✅ 好 - 页面组件使用默认导出
export default function Dashboard() {
  // 页面组件实现
}
```

### Git工作流

#### 分支命名约定
```bash
# 功能分支
feature/camera-management
feature/user-authentication
feature/detection-history

# 错误修复
bugfix/login-validation
bugfix/camera-connection-issue

# 热修复
hotfix/security-patch
hotfix/critical-bug-fix

# 发布分支
release/v1.0.0
release/v1.1.0
```

#### 提交消息格式
```bash
# 格式: <类型>(<范围>): <描述>

# 示例:
feat(dashboard): 添加实时统计显示
fix(auth): 解决登录验证问题
docs(readme): 更新安装说明
style(ui): 改进按钮悬停状态
refactor(hooks): 简化useAuth实现
test(components): 添加StatCard单元测试
chore(deps): 更新React到v18.3.1
```

### 性能指南

#### 组件优化
```typescript
// ✅ 好 - 记忆化昂贵的计算
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);

// ✅ 好 - 记忆化接收稳定属性的组件
const MemoizedComponent = memo(({ data }: Props) => {
  return <div>{data.value}</div>;
});

// ✅ 好 - 为事件处理器使用回调
const handleClick = useCallback((id: string) => {
  onItemClick(id);
}, [onItemClick]);
```

### 调试和开发工具

#### 浏览器开发工具
- **React开发者工具** - 组件检查
- **Redux开发工具** - 状态调试（如果使用Redux）
- **网络标签** - API请求监控
- **性能标签** - 性能分析

#### VS Code调试
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "启动Chrome",
      "request": "launch",
      "type": "chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```
