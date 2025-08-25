# Deployment Guide | 部署指南

## English

### Overview

This guide covers deployment strategies for VisionQC NeXtGen across different environments, from development to production. The application is built as a static React application that can be deployed to various hosting platforms.

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git for version control
- Web server (Nginx, Apache, or cloud hosting)

### Environment Configuration

#### Environment Variables

Create environment files for different deployment stages:

##### `.env.development`
```bash
VITE_APP_TITLE=VisionQC NeXtGen (Dev)
VITE_API_BASE_URL=http://localhost:3001/api
VITE_WS_URL=ws://localhost:3001/ws
VITE_ENVIRONMENT=development
VITE_DEBUG=true
```

##### `.env.production`
```bash
VITE_APP_TITLE=VisionQC NeXtGen
VITE_API_BASE_URL=https://api.visionqc.com/v1
VITE_WS_URL=wss://api.visionqc.com/ws
VITE_ENVIRONMENT=production
VITE_DEBUG=false
```

##### `.env.staging`
```bash
VITE_APP_TITLE=VisionQC NeXtGen (Staging)
VITE_API_BASE_URL=https://staging-api.visionqc.com/v1
VITE_WS_URL=wss://staging-api.visionqc.com/ws
VITE_ENVIRONMENT=staging
VITE_DEBUG=true
```

### Build Process

#### Development Build
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

#### Production Build
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview production build locally
npm run preview
```

#### Build Optimization
```bash
# Build with development mode (for debugging)
npm run build:dev

# Analyze bundle size
npm install -g vite-bundle-analyzer
npx vite-bundle-analyzer dist/
```

### Deployment Options

#### 1. Static Hosting (Recommended)

##### Vercel Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod
```

**vercel.json** configuration:
```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

##### Netlify Deployment
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

**netlify.toml** configuration:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

#### 2. Docker Deployment

##### Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

##### nginx.conf
```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        # Handle client-side routing
        location / {
            try_files $uri $uri/ /index.html;
        }

        # Cache static assets
        location /assets/ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
    }
}
```

##### Docker Commands
```bash
# Build Docker image
docker build -t visionqc-nextgen .

# Run container
docker run -p 80:80 visionqc-nextgen

# Run with environment variables
docker run -p 80:80 -e VITE_API_BASE_URL=https://api.example.com visionqc-nextgen
```

#### 3. Traditional Web Server

##### Apache Configuration
```apache
<VirtualHost *:80>
    ServerName visionqc.example.com
    DocumentRoot /var/www/visionqc/dist

    # Handle client-side routing
    <Directory /var/www/visionqc/dist>
        Options -Indexes
        AllowOverride All
        Require all granted

        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>

    # Cache static assets
    <LocationMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg)$">
        ExpiresActive On
        ExpiresDefault "access plus 1 year"
    </LocationMatch>
</VirtualHost>
```

##### Nginx Configuration
```nginx
server {
    listen 80;
    server_name visionqc.example.com;
    root /var/www/visionqc/dist;
    index index.html;

    # Handle client-side routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

### CI/CD Pipeline

#### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build application
      run: npm run build
      env:
        VITE_API_BASE_URL: ${{ secrets.API_BASE_URL }}
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

### Performance Optimization

#### Build Optimization
```javascript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          charts: ['recharts']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
```

#### CDN Configuration
```html
<!-- Preload critical resources -->
<link rel="preload" href="/assets/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preconnect" href="https://api.visionqc.com">
<link rel="dns-prefetch" href="https://api.visionqc.com">
```

### Security Considerations

#### Content Security Policy
```nginx
add_header Content-Security-Policy "
    default-src 'self';
    script-src 'self' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https:;
    connect-src 'self' https://api.visionqc.com wss://api.visionqc.com;
    font-src 'self';
" always;
```

#### HTTPS Configuration
```nginx
server {
    listen 443 ssl http2;
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;
}
```

### Monitoring and Logging

#### Health Check Endpoint
```javascript
// Add to your server
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version
  });
});
```

#### Error Tracking
```javascript
// Add error boundary and reporting
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  environment: process.env.VITE_ENVIRONMENT
});
```

---

## 中文

### 概述

本指南涵盖了慧眼质控云在不同环境中的部署策略，从开发到生产环境。该应用程序构建为静态React应用程序，可以部署到各种托管平台。

### 前置条件

- 安装Node.js 18+
- npm或yarn包管理器
- Git版本控制
- Web服务器（Nginx、Apache或云托管）

### 环境配置

#### 环境变量

为不同的部署阶段创建环境文件：

##### `.env.development`
```bash
VITE_APP_TITLE=慧眼质控云 (开发)
VITE_API_BASE_URL=http://localhost:3001/api
VITE_WS_URL=ws://localhost:3001/ws
VITE_ENVIRONMENT=development
VITE_DEBUG=true
```

##### `.env.production`
```bash
VITE_APP_TITLE=慧眼质控云
VITE_API_BASE_URL=https://api.visionqc.com/v1
VITE_WS_URL=wss://api.visionqc.com/ws
VITE_ENVIRONMENT=production
VITE_DEBUG=false
```

##### `.env.staging`
```bash
VITE_APP_TITLE=慧眼质控云 (测试)
VITE_API_BASE_URL=https://staging-api.visionqc.com/v1
VITE_WS_URL=wss://staging-api.visionqc.com/ws
VITE_ENVIRONMENT=staging
VITE_DEBUG=true
```

### 构建过程

#### 开发构建
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

#### 生产构建
```bash
# 安装依赖
npm install

# 生产构建
npm run build

# 本地预览生产构建
npm run preview
```

#### 构建优化
```bash
# 开发模式构建（用于调试）
npm run build:dev

# 分析包大小
npm install -g vite-bundle-analyzer
npx vite-bundle-analyzer dist/
```

### 部署选项

#### 1. 静态托管（推荐）

##### Vercel部署
```bash
# 安装Vercel CLI
npm install -g vercel

# 部署到Vercel
vercel

# 部署到生产环境
vercel --prod
```

**vercel.json** 配置：
```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

##### Netlify部署
```bash
# 安装Netlify CLI
npm install -g netlify-cli

# 构建并部署
npm run build
netlify deploy --prod --dir=dist
```

**netlify.toml** 配置：
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

#### 2. Docker部署

##### Dockerfile
```dockerfile
# 构建阶段
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# 生产阶段
FROM nginx:alpine

# 复制构建资源
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制nginx配置
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

##### Docker命令
```bash
# 构建Docker镜像
docker build -t visionqc-nextgen .

# 运行容器
docker run -p 80:80 visionqc-nextgen

# 使用环境变量运行
docker run -p 80:80 -e VITE_API_BASE_URL=https://api.example.com visionqc-nextgen
```

### CI/CD流水线

#### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: 部署到生产环境

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: 设置Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: 安装依赖
      run: npm ci
    
    - name: 运行测试
      run: npm test
    
    - name: 构建应用
      run: npm run build
      env:
        VITE_API_BASE_URL: ${{ secrets.API_BASE_URL }}
    
    - name: 部署到Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

### 性能优化

#### 构建优化
```javascript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          charts: ['recharts']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
```

### 安全考虑

#### 内容安全策略
```nginx
add_header Content-Security-Policy "
    default-src 'self';
    script-src 'self' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https:;
    connect-src 'self' https://api.visionqc.com wss://api.visionqc.com;
    font-src 'self';
" always;
```

### 监控和日志

#### 健康检查端点
```javascript
// 添加到您的服务器
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version
  });
});
```

#### 错误跟踪
```javascript
// 添加错误边界和报告
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  environment: process.env.VITE_ENVIRONMENT
});
```
