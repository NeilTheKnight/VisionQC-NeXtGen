# System Architecture | 系统架构

## English

### Overview

VisionQC NeXtGen follows a modern, component-based architecture built on React and TypeScript. The system is designed with modularity, scalability, and maintainability in mind, following industry best practices for industrial software applications.

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    VisionQC NeXtGen                        │
├─────────────────────────────────────────────────────────────┤
│  Presentation Layer (React Frontend)                       │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│  │   Pages     │ │ Components  │ │   Hooks     │          │
│  │             │ │             │ │             │          │
│  │ • Dashboard │ │ • UI        │ │ • useAuth   │          │
│  │ • History   │ │ • Layout    │ │ • useAlerts │          │
│  │ • Login     │ │ • Dashboard │ │ • useMobile │          │
│  └─────────────┘ └─────────────┘ └─────────────┘          │
├─────────────────────────────────────────────────────────────┤
│  State Management Layer                                    │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│  │ React Query │ │ Local State │ │ Context API │          │
│  │             │ │             │ │             │          │
│  │ • Caching   │ │ • Component │ │ • Auth      │          │
│  │ • Sync      │ │   State     │ │ • Theme     │          │
│  └─────────────┘ └─────────────┘ └─────────────┘          │
├─────────────────────────────────────────────────────────────┤
│  Data Layer (Mock/Future API)                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│  │ Mock Data   │ │ Local       │ │ Future API  │          │
│  │             │ │ Storage     │ │             │          │
│  │ • Stats     │ │ • Auth      │ │ • REST      │          │
│  │ • Alerts    │ │ • Settings  │ │ • WebSocket │          │
│  └─────────────┘ └─────────────┘ └─────────────┘          │
└─────────────────────────────────────────────────────────────┘
```

### Component Architecture

#### 1. **Pages Layer**
- **Purpose**: Top-level route components that compose the application views
- **Components**:
  - `Index.tsx` - Main dashboard wrapper
  - `Dashboard.tsx` - Real-time monitoring interface
  - `History.tsx` - Detection history and reporting
  - `Login.tsx` - Authentication interface
  - `Layout.tsx` - Common layout wrapper

#### 2. **Components Layer**

##### UI Components (`/components/ui/`)
- **shadcn/ui based components** - Consistent, accessible UI primitives
- **Custom components**:
  - `stat-card.tsx` - Quality metrics display
  - `status-indicator.tsx` - System status visualization

##### Dashboard Components (`/components/dashboard/`)
- `camera-view.tsx` - Live camera feed and detection overlay
- `alert-banner.tsx` - Real-time alert notifications

##### Layout Components (`/components/layout/`)
- `navigation.tsx` - Main navigation sidebar

#### 3. **Hooks Layer**
- `useAuth.tsx` - Authentication state management
- `use-toast.ts` - Toast notification system
- `use-mobile.tsx` - Responsive design utilities

### Data Flow Architecture

```
User Interaction
       ↓
   React Component
       ↓
   Custom Hook (if needed)
       ↓
   State Update (Local/Context/Query)
       ↓
   Re-render with New Data
       ↓
   UI Update
```

### State Management Strategy

#### 1. **Local Component State**
- Used for: UI state, form inputs, temporary data
- Implementation: `useState`, `useReducer`

#### 2. **Context API**
- Used for: Authentication, theme, global app state
- Implementation: `AuthProvider`, `ThemeProvider`

#### 3. **React Query**
- Used for: Server state, caching, synchronization
- Implementation: `QueryClient`, custom query hooks

### Routing Architecture

```
App Router (React Router DOM)
├── /login (Public)
├── / (Protected)
│   └── Dashboard
├── /history (Protected)
├── /monitoring (Protected - Future)
├── /users (Protected - Future)
├── /settings (Protected - Future)
└── /* (404 - NotFound)
```

### Security Architecture

#### Authentication Flow
```
1. User Login → 2. Validate Credentials → 3. Store User Data
                                              ↓
6. Access Protected Routes ← 5. Check Auth Status ← 4. Set Auth Context
```

#### Route Protection
- `ProtectedRoute` component wraps authenticated routes
- Automatic redirect to login for unauthenticated users
- Role-based access control ready for implementation

### Design System Architecture

#### Color System
- **Industrial Theme**: Professional colors for manufacturing environments
- **Status Colors**: Semantic colors for system states (online, offline, warning)
- **CSS Variables**: Consistent theming with HSL color space

#### Component Hierarchy
```
shadcn/ui Base Components
         ↓
Custom UI Components
         ↓
Domain-Specific Components
         ↓
Page Components
```

### Future Architecture Considerations

#### Backend Integration Points
1. **Authentication Service** - JWT-based authentication
2. **Camera Management API** - Real-time video streaming
3. **Detection Service** - AI model integration (YOLOv8)
4. **Data Storage** - Detection history and analytics
5. **WebSocket Service** - Real-time updates and alerts

#### Scalability Considerations
- **Component Lazy Loading** - Code splitting for better performance
- **State Normalization** - Efficient data structures for large datasets
- **Caching Strategy** - Optimized data fetching and storage
- **Error Boundaries** - Graceful error handling and recovery

---

## 中文

### 概述

慧眼质控云采用基于React和TypeScript的现代化组件架构。系统设计注重模块化、可扩展性和可维护性，遵循工业软件应用的行业最佳实践。

### 高层架构

```
┌─────────────────────────────────────────────────────────────┐
│                    慧眼质控云                               │
├─────────────────────────────────────────────────────────────┤
│  表现层 (React 前端)                                       │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│  │    页面     │ │    组件     │ │   Hooks     │          │
│  │             │ │             │ │             │          │
│  │ • 仪表板    │ │ • UI组件    │ │ • useAuth   │          │
│  │ • 历史记录  │ │ • 布局组件  │ │ • useAlerts │          │
│  │ • 登录页面  │ │ • 仪表板组件│ │ • useMobile │          │
│  └─────────────┘ └─────────────┘ └─────────────┘          │
├─────────────────────────────────────────────────────────────┤
│  状态管理层                                                │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│  │ React Query │ │   本地状态  │ │ Context API │          │
│  │             │ │             │ │             │          │
│  │ • 缓存      │ │ • 组件状态  │ │ • 认证      │          │
│  │ • 同步      │ │             │ │ • 主题      │          │
│  └─────────────┘ └─────────────┘ └─────────────┘          │
├─────────────────────────────────────────────────────────────┤
│  数据层 (模拟/未来API)                                     │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│  │   模拟数据  │ │  本地存储   │ │  未来API    │          │
│  │             │ │             │ │             │          │
│  │ • 统计数据  │ │ • 认证信息  │ │ • REST      │          │
│  │ • 告警信息  │ │ • 设置      │ │ • WebSocket │          │
│  └─────────────┘ └─────────────┘ └─────────────┘          │
└─────────────────────────────────────────────────────────────┘
```

### 组件架构

#### 1. **页面层**
- **用途**: 组成应用视图的顶级路由组件
- **组件**:
  - `Index.tsx` - 主仪表板包装器
  - `Dashboard.tsx` - 实时监控界面
  - `History.tsx` - 检测历史和报告
  - `Login.tsx` - 认证界面
  - `Layout.tsx` - 通用布局包装器

#### 2. **组件层**

##### UI组件 (`/components/ui/`)
- **基于shadcn/ui的组件** - 一致、可访问的UI原语
- **自定义组件**:
  - `stat-card.tsx` - 质量指标显示
  - `status-indicator.tsx` - 系统状态可视化

##### 仪表板组件 (`/components/dashboard/`)
- `camera-view.tsx` - 实时摄像头画面和检测覆盖层
- `alert-banner.tsx` - 实时告警通知

##### 布局组件 (`/components/layout/`)
- `navigation.tsx` - 主导航侧边栏

#### 3. **Hooks层**
- `useAuth.tsx` - 认证状态管理
- `use-toast.ts` - 提示通知系统
- `use-mobile.tsx` - 响应式设计工具

### 数据流架构

```
用户交互
   ↓
React组件
   ↓
自定义Hook (如需要)
   ↓
状态更新 (本地/Context/Query)
   ↓
使用新数据重新渲染
   ↓
UI更新
```

### 状态管理策略

#### 1. **本地组件状态**
- 用于: UI状态、表单输入、临时数据
- 实现: `useState`, `useReducer`

#### 2. **Context API**
- 用于: 认证、主题、全局应用状态
- 实现: `AuthProvider`, `ThemeProvider`

#### 3. **React Query**
- 用于: 服务器状态、缓存、同步
- 实现: `QueryClient`, 自定义查询hooks

### 路由架构

```
应用路由器 (React Router DOM)
├── /login (公开)
├── / (受保护)
│   └── 仪表板
├── /history (受保护)
├── /monitoring (受保护 - 未来)
├── /users (受保护 - 未来)
├── /settings (受保护 - 未来)
└── /* (404 - 未找到)
```

### 安全架构

#### 认证流程
```
1. 用户登录 → 2. 验证凭据 → 3. 存储用户数据
                                ↓
6. 访问受保护路由 ← 5. 检查认证状态 ← 4. 设置认证上下文
```

#### 路由保护
- `ProtectedRoute` 组件包装认证路由
- 未认证用户自动重定向到登录页面
- 基于角色的访问控制准备就绪

### 设计系统架构

#### 颜色系统
- **工业主题**: 适合制造环境的专业色彩
- **状态颜色**: 系统状态的语义色彩（在线、离线、警告）
- **CSS变量**: 使用HSL色彩空间的一致主题

#### 组件层次结构
```
shadcn/ui 基础组件
         ↓
自定义UI组件
         ↓
领域特定组件
         ↓
页面组件
```

### 未来架构考虑

#### 后端集成点
1. **认证服务** - 基于JWT的认证
2. **摄像头管理API** - 实时视频流
3. **检测服务** - AI模型集成 (YOLOv8)
4. **数据存储** - 检测历史和分析
5. **WebSocket服务** - 实时更新和告警

#### 可扩展性考虑
- **组件懒加载** - 代码分割以提高性能
- **状态规范化** - 大数据集的高效数据结构
- **缓存策略** - 优化的数据获取和存储
- **错误边界** - 优雅的错误处理和恢复
