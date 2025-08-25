# Contributing to VisionQC NeXtGen | 贡献指南

## English

### Welcome Contributors!

Thank you for your interest in contributing to VisionQC NeXtGen! This document provides guidelines for contributing to the project.

### Code of Conduct

By participating in this project, you agree to abide by our code of conduct:
- Be respectful and inclusive
- Focus on constructive feedback
- Help create a welcoming environment for all contributors

### Getting Started

1. **Fork the Repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/visionqc-nextgen.git
   cd visionqc-nextgen
   ```

2. **Set Up Development Environment**
   ```bash
   # Install dependencies
   npm install
   
   # Copy environment file
   cp .env.example .env.development
   
   # Start development server
   npm run dev
   ```

3. **Create a Branch**
   ```bash
   # Create and switch to a new branch
   git checkout -b feature/your-feature-name
   ```

### Types of Contributions

#### 🐛 Bug Reports
- Use the bug report template
- Include steps to reproduce
- Provide system information
- Add screenshots if applicable

#### ✨ Feature Requests
- Use the feature request template
- Explain the use case
- Describe the expected behavior
- Consider implementation complexity

#### 📝 Documentation
- Fix typos and grammar
- Improve clarity and examples
- Add missing documentation
- Update outdated information

#### 🔧 Code Contributions
- Follow coding standards
- Add tests for new features
- Update documentation
- Ensure backward compatibility

### Development Workflow

#### 1. Branch Naming Convention
```bash
feature/add-camera-management    # New features
bugfix/fix-login-issue          # Bug fixes
docs/update-readme              # Documentation
refactor/improve-performance    # Code refactoring
hotfix/critical-security-fix    # Critical fixes
```

#### 2. Commit Message Format
```bash
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
feat(dashboard): add real-time statistics display
fix(auth): resolve token expiration handling
docs(api): update authentication endpoints
style(ui): improve button hover animations
```

#### 3. Pull Request Process

1. **Before Submitting**
   ```bash
   # Run tests
   npm test
   
   # Check linting
   npm run lint
   
   # Build successfully
   npm run build
   ```

2. **PR Requirements**
   - [ ] Clear description of changes
   - [ ] Tests pass
   - [ ] Code follows style guidelines
   - [ ] Documentation updated
   - [ ] No breaking changes (or clearly documented)

3. **PR Template**
   ```markdown
   ## Description
   Brief description of changes
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Performance improvement
   
   ## Testing
   - [ ] Unit tests pass
   - [ ] Integration tests pass
   - [ ] Manual testing completed
   
   ## Screenshots (if applicable)
   Add screenshots here
   ```

### Coding Standards

#### TypeScript Guidelines
```typescript
// ✅ Good: Use descriptive interfaces
interface CameraDetectionResult {
  cameraId: string;
  confidence: number;
  timestamp: Date;
}

// ✅ Good: Use proper typing
const processDetection = (result: CameraDetectionResult): boolean => {
  return result.confidence > 0.8;
};

// ❌ Avoid: Using 'any' type
const processData = (data: any) => {
  // Avoid this
};
```

#### React Component Guidelines
```typescript
// ✅ Good: Functional component with proper props
interface StatCardProps {
  title: string;
  value: string | number;
  variant?: 'default' | 'success' | 'error';
}

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  variant = 'default' 
}) => {
  return (
    <div className={`stat-card stat-card--${variant}`}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};
```

#### CSS/Styling Guidelines
```typescript
// ✅ Good: Use design system classes
<Button className="bg-primary text-primary-foreground hover:bg-primary/90">
  Submit
</Button>

// ✅ Good: Use semantic class combinations
<div className="bg-card border border-border rounded-lg p-4 shadow-card">
  Content
</div>

// ❌ Avoid: Hardcoded values
<div className="bg-blue-500 text-white p-2">
  Content
</div>
```

### Testing Guidelines

#### Unit Tests
```typescript
// Example: components/StatCard.test.tsx
import { render, screen } from '@testing-library/react';
import { StatCard } from './StatCard';

describe('StatCard', () => {
  it('renders title and value correctly', () => {
    render(<StatCard title="Test" value="123" />);
    
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
  });
  
  it('applies variant styling', () => {
    render(<StatCard title="Error" value="0" variant="error" />);
    
    const card = screen.getByRole('article');
    expect(card).toHaveClass('stat-card--error');
  });
});
```

#### Integration Tests
```typescript
// Example: pages/Dashboard.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dashboard from './Dashboard';

describe('Dashboard Integration', () => {
  it('displays statistics after loading', async () => {
    const queryClient = new QueryClient();
    
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

### Documentation Standards

#### Code Comments
```typescript
/**
 * Processes camera detection results and updates statistics
 * @param results - Array of detection results from cameras
 * @param threshold - Minimum confidence threshold (0-1)
 * @returns Updated statistics object
 */
export const processDetectionResults = (
  results: DetectionResult[],
  threshold: number = 0.8
): Statistics => {
  // Implementation
};
```

#### README Updates
- Keep installation instructions current
- Update feature lists when adding functionality
- Include relevant screenshots
- Maintain both English and Chinese versions

### Release Process

#### Version Numbering
We follow [Semantic Versioning](https://semver.org/):
- `MAJOR.MINOR.PATCH`
- `1.0.0` → `1.0.1` (patch: bug fixes)
- `1.0.0` → `1.1.0` (minor: new features)
- `1.0.0` → `2.0.0` (major: breaking changes)

#### Release Checklist
- [ ] All tests pass
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Version bumped in package.json
- [ ] Git tag created
- [ ] Release notes written

### Getting Help

#### Communication Channels
- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and ideas
- **Pull Request Reviews**: Code-specific discussions

#### Resources
- [Development Guide](docs/DevelopmentDocs/development.md)
- [Architecture Documentation](docs/DevelopmentDocs/architecture.md)
- [API Documentation](docs/API/api.md)
- [User Guide](docs/User-Guide/user-guide.md)

---

## 中文

### 欢迎贡献者！

感谢您对慧眼质控云项目的贡献兴趣！本文档提供了项目贡献指南。

### 行为准则

参与此项目即表示您同意遵守我们的行为准则：
- 保持尊重和包容
- 专注于建设性反馈
- 帮助为所有贡献者创造友好环境

### 开始贡献

1. **Fork仓库**
   ```bash
   # 在GitHub上Fork，然后克隆您的fork
   git clone https://github.com/YOUR_USERNAME/visionqc-nextgen.git
   cd visionqc-nextgen
   ```

2. **设置开发环境**
   ```bash
   # 安装依赖
   npm install
   
   # 复制环境文件
   cp .env.example .env.development
   
   # 启动开发服务器
   npm run dev
   ```

3. **创建分支**
   ```bash
   # 创建并切换到新分支
   git checkout -b feature/your-feature-name
   ```

### 贡献类型

#### 🐛 错误报告
- 使用错误报告模板
- 包含重现步骤
- 提供系统信息
- 如适用，添加截图

#### ✨ 功能请求
- 使用功能请求模板
- 解释使用场景
- 描述期望行为
- 考虑实现复杂性

#### 📝 文档
- 修复拼写和语法错误
- 改进清晰度和示例
- 添加缺失的文档
- 更新过时信息

#### 🔧 代码贡献
- 遵循编码标准
- 为新功能添加测试
- 更新文档
- 确保向后兼容性

### 开发工作流

#### 1. 分支命名约定
```bash
feature/add-camera-management    # 新功能
bugfix/fix-login-issue          # 错误修复
docs/update-readme              # 文档
refactor/improve-performance    # 代码重构
hotfix/critical-security-fix    # 关键修复
```

#### 2. 提交消息格式
```bash
<类型>(<范围>): <描述>

[可选正文]

[可选页脚]
```

**类型：**
- `feat`: 新功能
- `fix`: 错误修复
- `docs`: 文档更改
- `style`: 代码样式更改
- `refactor`: 代码重构
- `test`: 添加或更新测试
- `chore`: 维护任务

**示例：**
```bash
feat(dashboard): 添加实时统计显示
fix(auth): 解决令牌过期处理
docs(api): 更新认证端点
style(ui): 改进按钮悬停动画
```

### 编码标准

#### TypeScript指南
```typescript
// ✅ 好：使用描述性接口
interface CameraDetectionResult {
  cameraId: string;
  confidence: number;
  timestamp: Date;
}

// ✅ 好：使用适当的类型
const processDetection = (result: CameraDetectionResult): boolean => {
  return result.confidence > 0.8;
};

// ❌ 避免：使用'any'类型
const processData = (data: any) => {
  // 避免这样做
};
```

### 测试指南

#### 单元测试
```typescript
// 示例：components/StatCard.test.tsx
import { render, screen } from '@testing-library/react';
import { StatCard } from './StatCard';

describe('StatCard', () => {
  it('正确渲染标题和值', () => {
    render(<StatCard title="测试" value="123" />);
    
    expect(screen.getByText('测试')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
  });
});
```

### 获取帮助

#### 沟通渠道
- **GitHub Issues**: 错误报告和功能请求
- **GitHub Discussions**: 一般问题和想法
- **Pull Request Reviews**: 代码特定讨论

#### 资源
- [开发指南](docs/DevelopmentDocs/development.md)
- [架构文档](docs/DevelopmentDocs/architecture.md)
- [API文档](docs/API/api.md)
- [用户指南](docs/User-Guide/user-guide.md)
