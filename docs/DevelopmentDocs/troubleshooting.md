# Troubleshooting Guide | 故障排除指南

## English

### Common Installation Issues

#### Node.js Version Compatibility

**Problem**: Build fails with Node.js version errors
```bash
Error: The engine "node" is incompatible with this module
```

**Solution**:
```bash
# Check current Node.js version
node --version

# Install Node.js 18+ using nvm (recommended)
nvm install 18
nvm use 18

# Or download from official website
# https://nodejs.org/
```

#### Package Installation Failures

**Problem**: npm install fails with permission errors
```bash
EACCES: permission denied, mkdir '/usr/local/lib/node_modules'
```

**Solution**:
```bash
# Option 1: Use npx instead of global install
npx create-vite@latest

# Option 2: Configure npm to use different directory
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH

# Option 3: Use yarn instead
npm install -g yarn
yarn install
```

#### Dependency Conflicts

**Problem**: Conflicting package versions
```bash
ERESOLVE unable to resolve dependency tree
```

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall with legacy peer deps
npm install --legacy-peer-deps

# Or use yarn
yarn install
```

### Runtime Errors

#### Application Won't Start

**Problem**: Development server fails to start
```bash
Error: Cannot find module 'vite'
```

**Solution**:
```bash
# Ensure all dependencies are installed
npm install

# Check if vite is installed
npm list vite

# Reinstall if missing
npm install vite --save-dev

# Start with verbose logging
npm run dev -- --debug
```

#### White Screen on Load

**Problem**: Application loads but shows blank white screen

**Solution**:
1. **Check Browser Console**
   ```javascript
   // Open browser DevTools (F12)
   // Look for JavaScript errors in Console tab
   ```

2. **Verify Build Output**
   ```bash
   # Check if build was successful
   npm run build
   
   # Serve built files locally
   npm run preview
   ```

3. **Check Environment Variables**
   ```bash
   # Verify .env file exists and has correct values
   cat .env.development
   
   # Ensure VITE_ prefix for environment variables
   VITE_API_BASE_URL=http://localhost:3001
   ```

#### Authentication Issues

**Problem**: Login fails or redirects to login repeatedly

**Solution**:
1. **Check Local Storage**
   ```javascript
   // Open browser DevTools > Application > Local Storage
   // Look for 'visionqc_user' key
   localStorage.getItem('visionqc_user')
   
   // Clear if corrupted
   localStorage.removeItem('visionqc_user')
   ```

2. **Verify Credentials**
   ```typescript
   // Default credentials for demo
   Username: admin
   Password: admin123
   ```

3. **Check Network Requests**
   ```javascript
   // Open DevTools > Network tab
   // Monitor login requests for errors
   ```

### Performance Issues

#### Slow Loading Times

**Problem**: Application takes too long to load

**Solution**:
1. **Analyze Bundle Size**
   ```bash
   # Install bundle analyzer
   npm install --save-dev vite-bundle-analyzer
   
   # Analyze build
   npx vite-bundle-analyzer dist/
   ```

2. **Enable Compression**
   ```nginx
   # Add to nginx.conf
   gzip on;
   gzip_types text/plain text/css application/json application/javascript;
   ```

3. **Optimize Images**
   ```bash
   # Compress images before adding to assets
   # Use WebP format when possible
   # Implement lazy loading for images
   ```

#### High Memory Usage

**Problem**: Browser tab consumes excessive memory

**Solution**:
1. **Check for Memory Leaks**
   ```javascript
   // Use React DevTools Profiler
   // Look for components that don't unmount properly
   ```

2. **Optimize State Management**
   ```typescript
   // Use useCallback and useMemo appropriately
   const memoizedValue = useMemo(() => expensiveCalculation(data), [data]);
   const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);
   ```

3. **Limit Real-time Updates**
   ```typescript
   // Throttle or debounce frequent updates
   import { debounce } from 'lodash';
   
   const debouncedUpdate = debounce(updateFunction, 300);
   ```

### Browser Compatibility Issues

#### Internet Explorer Support

**Problem**: Application doesn't work in older browsers

**Solution**:
```javascript
// Add polyfills for older browsers
npm install --save-dev @vitejs/plugin-legacy

// Update vite.config.ts
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ]
})
```

#### Safari Specific Issues

**Problem**: Features not working in Safari

**Solution**:
1. **Check CSS Compatibility**
   ```css
   /* Use vendor prefixes for Safari */
   -webkit-transform: translateX(100%);
   transform: translateX(100%);
   ```

2. **JavaScript Compatibility**
   ```javascript
   // Avoid using latest JavaScript features
   // Use Babel for transpilation if needed
   ```

### Network and API Issues

#### CORS Errors

**Problem**: Cross-Origin Resource Sharing errors
```bash
Access to fetch at 'https://api.example.com' from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Solution**:
1. **Development Proxy**
   ```typescript
   // vite.config.ts
   export default defineConfig({
     server: {
       proxy: {
         '/api': {
           target: 'https://api.example.com',
           changeOrigin: true,
           rewrite: (path) => path.replace(/^\/api/, '')
         }
       }
     }
   })
   ```

2. **Backend Configuration**
   ```javascript
   // Express.js example
   app.use(cors({
     origin: ['http://localhost:5173', 'https://yourdomain.com'],
     credentials: true
   }));
   ```

#### WebSocket Connection Issues

**Problem**: Real-time updates not working

**Solution**:
1. **Check WebSocket URL**
   ```typescript
   // Ensure correct protocol (ws:// or wss://)
   const wsUrl = process.env.VITE_WS_URL || 'ws://localhost:3001/ws';
   ```

2. **Handle Connection Errors**
   ```typescript
   const ws = new WebSocket(wsUrl);
   
   ws.onopen = () => console.log('WebSocket connected');
   ws.onerror = (error) => console.error('WebSocket error:', error);
   ws.onclose = () => {
     console.log('WebSocket disconnected, attempting reconnect...');
     setTimeout(() => connectWebSocket(), 5000);
   };
   ```

### Build and Deployment Issues

#### Build Failures

**Problem**: Production build fails
```bash
Build failed with errors
```

**Solution**:
1. **Check TypeScript Errors**
   ```bash
   # Run TypeScript check
   npx tsc --noEmit
   
   # Fix all TypeScript errors before building
   ```

2. **Verify Environment Variables**
   ```bash
   # Ensure all required VITE_ variables are set
   echo $VITE_API_BASE_URL
   ```

3. **Clear Build Cache**
   ```bash
   # Clear Vite cache
   rm -rf node_modules/.vite
   
   # Rebuild
   npm run build
   ```

#### Deployment Issues

**Problem**: Application doesn't work after deployment

**Solution**:
1. **Check Base Path**
   ```typescript
   // vite.config.ts for subdirectory deployment
   export default defineConfig({
     base: '/subdirectory/',
     // ... other config
   })
   ```

2. **Verify Static File Serving**
   ```nginx
   # Ensure proper routing for SPA
   location / {
     try_files $uri $uri/ /index.html;
   }
   ```

3. **Check Environment Variables**
   ```bash
   # Verify production environment variables
   # Ensure API URLs are accessible from production
   ```

### Debugging Tools and Techniques

#### Browser DevTools

1. **Console Debugging**
   ```javascript
   // Add debug logs
   console.log('Component mounted:', componentName);
   console.error('Error occurred:', error);
   ```

2. **Network Monitoring**
   ```javascript
   // Monitor API calls in Network tab
   // Check request/response headers
   // Verify status codes
   ```

3. **React DevTools**
   ```javascript
   // Install React DevTools browser extension
   // Inspect component props and state
   // Profile component performance
   ```

#### Application Debugging

1. **Error Boundaries**
   ```typescript
   class ErrorBoundary extends React.Component {
     constructor(props) {
       super(props);
       this.state = { hasError: false };
     }
   
     static getDerivedStateFromError(error) {
       return { hasError: true };
     }
   
     componentDidCatch(error, errorInfo) {
       console.error('Error caught by boundary:', error, errorInfo);
     }
   
     render() {
       if (this.state.hasError) {
         return <h1>Something went wrong.</h1>;
       }
       return this.props.children;
     }
   }
   ```

2. **Logging Service**
   ```typescript
   // Implement centralized logging
   const logger = {
     info: (message: string, data?: any) => {
       console.log(`[INFO] ${message}`, data);
     },
     error: (message: string, error?: Error) => {
       console.error(`[ERROR] ${message}`, error);
       // Send to external logging service
     }
   };
   ```

---

## 中文

### 常见安装问题

#### Node.js版本兼容性

**问题**: 构建因Node.js版本错误而失败
```bash
Error: The engine "node" is incompatible with this module
```

**解决方案**:
```bash
# 检查当前Node.js版本
node --version

# 使用nvm安装Node.js 18+（推荐）
nvm install 18
nvm use 18

# 或从官方网站下载
# https://nodejs.org/
```

#### 包安装失败

**问题**: npm install因权限错误失败
```bash
EACCES: permission denied, mkdir '/usr/local/lib/node_modules'
```

**解决方案**:
```bash
# 选项1: 使用npx而不是全局安装
npx create-vite@latest

# 选项2: 配置npm使用不同目录
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH

# 选项3: 使用yarn代替
npm install -g yarn
yarn install
```

#### 依赖冲突

**问题**: 包版本冲突
```bash
ERESOLVE unable to resolve dependency tree
```

**解决方案**:
```bash
# 清除npm缓存
npm cache clean --force

# 删除node_modules和package-lock.json
rm -rf node_modules package-lock.json

# 使用legacy peer deps重新安装
npm install --legacy-peer-deps

# 或使用yarn
yarn install
```

### 运行时错误

#### 应用无法启动

**问题**: 开发服务器启动失败
```bash
Error: Cannot find module 'vite'
```

**解决方案**:
```bash
# 确保所有依赖已安装
npm install

# 检查vite是否已安装
npm list vite

# 如果缺失则重新安装
npm install vite --save-dev

# 使用详细日志启动
npm run dev -- --debug
```

#### 加载时白屏

**问题**: 应用加载但显示空白白屏

**解决方案**:
1. **检查浏览器控制台**
   ```javascript
   // 打开浏览器开发工具(F12)
   // 在控制台标签中查找JavaScript错误
   ```

2. **验证构建输出**
   ```bash
   # 检查构建是否成功
   npm run build
   
   # 本地服务构建文件
   npm run preview
   ```

3. **检查环境变量**
   ```bash
   # 验证.env文件存在且有正确值
   cat .env.development
   
   # 确保环境变量有VITE_前缀
   VITE_API_BASE_URL=http://localhost:3001
   ```

#### 认证问题

**问题**: 登录失败或重复重定向到登录页面

**解决方案**:
1. **检查本地存储**
   ```javascript
   // 打开浏览器开发工具 > 应用 > 本地存储
   // 查找'visionqc_user'键
   localStorage.getItem('visionqc_user')
   
   // 如果损坏则清除
   localStorage.removeItem('visionqc_user')
   ```

2. **验证凭据**
   ```typescript
   // 演示的默认凭据
   用户名: admin
   密码: admin123
   ```

3. **检查网络请求**
   ```javascript
   // 打开开发工具 > 网络标签
   // 监控登录请求的错误
   ```

### 性能问题

#### 加载时间慢

**问题**: 应用加载时间过长

**解决方案**:
1. **分析包大小**
   ```bash
   # 安装包分析器
   npm install --save-dev vite-bundle-analyzer
   
   # 分析构建
   npx vite-bundle-analyzer dist/
   ```

2. **启用压缩**
   ```nginx
   # 添加到nginx.conf
   gzip on;
   gzip_types text/plain text/css application/json application/javascript;
   ```

3. **优化图片**
   ```bash
   # 在添加到资源前压缩图片
   # 尽可能使用WebP格式
   # 为图片实现懒加载
   ```

#### 高内存使用

**问题**: 浏览器标签消耗过多内存

**解决方案**:
1. **检查内存泄漏**
   ```javascript
   // 使用React DevTools Profiler
   // 查找未正确卸载的组件
   ```

2. **优化状态管理**
   ```typescript
   // 适当使用useCallback和useMemo
   const memoizedValue = useMemo(() => expensiveCalculation(data), [data]);
   const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);
   ```

3. **限制实时更新**
   ```typescript
   // 节流或防抖频繁更新
   import { debounce } from 'lodash';
   
   const debouncedUpdate = debounce(updateFunction, 300);
   ```

### 浏览器兼容性问题

#### Internet Explorer支持

**问题**: 应用在旧浏览器中不工作

**解决方案**:
```javascript
// 为旧浏览器添加polyfills
npm install --save-dev @vitejs/plugin-legacy

// 更新vite.config.ts
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ]
})
```

#### Safari特定问题

**问题**: 功能在Safari中不工作

**解决方案**:
1. **检查CSS兼容性**
   ```css
   /* 为Safari使用供应商前缀 */
   -webkit-transform: translateX(100%);
   transform: translateX(100%);
   ```

2. **JavaScript兼容性**
   ```javascript
   // 避免使用最新的JavaScript功能
   // 如需要使用Babel进行转译
   ```

### 网络和API问题

#### CORS错误

**问题**: 跨域资源共享错误
```bash
Access to fetch at 'https://api.example.com' from origin 'http://localhost:5173' has been blocked by CORS policy
```

**解决方案**:
1. **开发代理**
   ```typescript
   // vite.config.ts
   export default defineConfig({
     server: {
       proxy: {
         '/api': {
           target: 'https://api.example.com',
           changeOrigin: true,
           rewrite: (path) => path.replace(/^\/api/, '')
         }
       }
     }
   })
   ```

2. **后端配置**
   ```javascript
   // Express.js示例
   app.use(cors({
     origin: ['http://localhost:5173', 'https://yourdomain.com'],
     credentials: true
   }));
   ```

### 调试工具和技术

#### 浏览器开发工具

1. **控制台调试**
   ```javascript
   // 添加调试日志
   console.log('组件已挂载:', componentName);
   console.error('发生错误:', error);
   ```

2. **网络监控**
   ```javascript
   // 在网络标签中监控API调用
   // 检查请求/响应头
   // 验证状态码
   ```

3. **React开发工具**
   ```javascript
   // 安装React DevTools浏览器扩展
   // 检查组件props和state
   // 分析组件性能
   ```
