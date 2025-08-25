# API Documentation | API文档

## English

### Overview

This document describes the current mock data structures used in VisionQC NeXtGen and the planned API specifications for future backend integration. The system currently operates with simulated data to demonstrate functionality.

### Current Mock Data Structures

#### Authentication

##### User Object
```typescript
interface User {
  email: string;
  role: "admin" | "operator" | "guest";
  username: string;
}
```

##### Login Request (Mock)
```typescript
interface LoginRequest {
  username: string;
  password: string;
}
```

##### Login Response (Mock)
```typescript
interface LoginResponse {
  success: boolean;
  user: User;
  token?: string; // Future implementation
}
```

#### Dashboard Statistics

##### Stats Object
```typescript
interface DashboardStats {
  totalDetected: number;      // Total items processed
  passCount: number;          // Items that passed quality check
  failCount: number;          // Items that failed quality check
  passRate: number;           // Pass rate percentage
  avgProcessingTime: number;  // Average processing time in seconds
  systemUptime: string;       // System uptime percentage
}
```

##### Real-time Updates
```typescript
interface StatsUpdate {
  timestamp: Date;
  totalDetected: number;
  passCount: number;
  failCount: number;
}
```

#### Camera Management

##### Camera Status
```typescript
interface CameraStatus {
  cameraId: string;
  title: string;
  isActive: boolean;
  connectionStatus: "online" | "offline" | "warning";
  isDetecting: boolean;
  lastUpdate: Date;
}
```

##### Detection Result
```typescript
interface DetectionResult {
  id: string;
  cameraId: string;
  timestamp: Date;
  result: "合格" | "不合格"; // "Pass" | "Fail"
  confidence: number;        // 0-100
  defectType?: string;       // Type of defect if failed
  imageUrl: string;          // Detection image URL
  boundingBoxes?: BoundingBox[];
}

interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  confidence: number;
}
```

#### Alert System

##### Alert Object
```typescript
interface Alert {
  id: string;
  type: "error" | "warning" | "success" | "info";
  title: string;
  message: string;
  timestamp: Date;
  dismissed: boolean;
}
```

#### History Data

##### History Record
```typescript
interface HistoryRecord {
  id: string;
  timestamp: string;
  camera: string;
  result: "合格" | "不合格";
  confidence: number;
  defectType?: string;
  imageUrl: string;
}
```

### Future API Specifications

#### Base Configuration

```
Base URL: https://api.visionqc.com/v1
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>
```

#### Authentication Endpoints

##### POST /auth/login
```typescript
Request:
{
  "username": "string",
  "password": "string"
}

Response:
{
  "success": true,
  "token": "jwt_token_string",
  "user": {
    "id": "string",
    "username": "string",
    "email": "string",
    "role": "admin" | "operator" | "guest",
    "permissions": ["string"]
  },
  "expiresIn": 3600
}
```

##### POST /auth/logout
```typescript
Request: {}
Response: { "success": true }
```

##### GET /auth/me
```typescript
Response:
{
  "user": {
    "id": "string",
    "username": "string",
    "email": "string",
    "role": "admin" | "operator" | "guest",
    "permissions": ["string"]
  }
}
```

#### Dashboard Endpoints

##### GET /dashboard/stats
```typescript
Response:
{
  "totalDetected": 1247,
  "passCount": 1226,
  "failCount": 21,
  "passRate": 98.3,
  "avgProcessingTime": 0.8,
  "systemUptime": "99.7%",
  "lastUpdate": "2024-01-15T10:30:00Z"
}
```

##### GET /dashboard/realtime
WebSocket endpoint for real-time updates
```typescript
Message Format:
{
  "type": "stats_update" | "alert" | "detection",
  "data": StatsUpdate | Alert | DetectionResult,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

#### Camera Management Endpoints

##### GET /cameras
```typescript
Response:
{
  "cameras": [
    {
      "id": "camera-1",
      "name": "工位1 - 主检测线",
      "status": "online" | "offline" | "warning",
      "isActive": true,
      "streamUrl": "rtmp://...",
      "lastUpdate": "2024-01-15T10:30:00Z"
    }
  ]
}
```

##### POST /cameras/{id}/start
```typescript
Response: { "success": true, "message": "Detection started" }
```

##### POST /cameras/{id}/stop
```typescript
Response: { "success": true, "message": "Detection stopped" }
```

#### Detection Endpoints

##### GET /detections
```typescript
Query Parameters:
- page: number (default: 1)
- limit: number (default: 20)
- camera: string (optional)
- result: "pass" | "fail" (optional)
- startDate: string (ISO date, optional)
- endDate: string (ISO date, optional)

Response:
{
  "detections": DetectionResult[],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1247,
    "totalPages": 63
  }
}
```

##### GET /detections/{id}
```typescript
Response: DetectionResult
```

#### System Endpoints

##### GET /system/health
```typescript
Response:
{
  "status": "healthy" | "degraded" | "unhealthy",
  "uptime": "99.7%",
  "cpu": 45,
  "memory": {
    "used": 2.1,
    "total": 8.0,
    "unit": "GB"
  },
  "disk": {
    "available": 127,
    "unit": "GB"
  },
  "services": {
    "database": "healthy",
    "ai_service": "healthy",
    "camera_service": "healthy"
  }
}
```

### Error Handling

#### Standard Error Response
```typescript
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": "Additional error details",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

#### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

---

## 中文

### 概述

本文档描述了慧眼质控云当前使用的模拟数据结构以及未来后端集成的计划API规范。系统目前使用模拟数据来演示功能。

### 当前模拟数据结构

#### 认证

##### 用户对象
```typescript
interface User {
  email: string;
  role: "admin" | "operator" | "guest";
  username: string;
}
```

##### 登录请求 (模拟)
```typescript
interface LoginRequest {
  username: string;
  password: string;
}
```

##### 登录响应 (模拟)
```typescript
interface LoginResponse {
  success: boolean;
  user: User;
  token?: string; // 未来实现
}
```

#### 仪表板统计

##### 统计对象
```typescript
interface DashboardStats {
  totalDetected: number;      // 处理的总项目数
  passCount: number;          // 通过质量检查的项目
  failCount: number;          // 未通过质量检查的项目
  passRate: number;           // 通过率百分比
  avgProcessingTime: number;  // 平均处理时间（秒）
  systemUptime: string;       // 系统正常运行时间百分比
}
```

##### 实时更新
```typescript
interface StatsUpdate {
  timestamp: Date;
  totalDetected: number;
  passCount: number;
  failCount: number;
}
```

#### 摄像头管理

##### 摄像头状态
```typescript
interface CameraStatus {
  cameraId: string;
  title: string;
  isActive: boolean;
  connectionStatus: "online" | "offline" | "warning";
  isDetecting: boolean;
  lastUpdate: Date;
}
```

##### 检测结果
```typescript
interface DetectionResult {
  id: string;
  cameraId: string;
  timestamp: Date;
  result: "合格" | "不合格";
  confidence: number;        // 0-100
  defectType?: string;       // 如果失败，缺陷类型
  imageUrl: string;          // 检测图像URL
  boundingBoxes?: BoundingBox[];
}

interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  confidence: number;
}
```

#### 告警系统

##### 告警对象
```typescript
interface Alert {
  id: string;
  type: "error" | "warning" | "success" | "info";
  title: string;
  message: string;
  timestamp: Date;
  dismissed: boolean;
}
```

#### 历史数据

##### 历史记录
```typescript
interface HistoryRecord {
  id: string;
  timestamp: string;
  camera: string;
  result: "合格" | "不合格";
  confidence: number;
  defectType?: string;
  imageUrl: string;
}
```

### 未来API规范

#### 基础配置

```
基础URL: https://api.visionqc.com/v1
内容类型: application/json
授权: Bearer <JWT_TOKEN>
```

#### 认证端点

##### POST /auth/login
```typescript
请求:
{
  "username": "string",
  "password": "string"
}

响应:
{
  "success": true,
  "token": "jwt_token_string",
  "user": {
    "id": "string",
    "username": "string",
    "email": "string",
    "role": "admin" | "operator" | "guest",
    "permissions": ["string"]
  },
  "expiresIn": 3600
}
```

##### POST /auth/logout
```typescript
请求: {}
响应: { "success": true }
```

##### GET /auth/me
```typescript
响应:
{
  "user": {
    "id": "string",
    "username": "string",
    "email": "string",
    "role": "admin" | "operator" | "guest",
    "permissions": ["string"]
  }
}
```

#### 仪表板端点

##### GET /dashboard/stats
```typescript
响应:
{
  "totalDetected": 1247,
  "passCount": 1226,
  "failCount": 21,
  "passRate": 98.3,
  "avgProcessingTime": 0.8,
  "systemUptime": "99.7%",
  "lastUpdate": "2024-01-15T10:30:00Z"
}
```

##### GET /dashboard/realtime
实时更新的WebSocket端点
```typescript
消息格式:
{
  "type": "stats_update" | "alert" | "detection",
  "data": StatsUpdate | Alert | DetectionResult,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

#### 摄像头管理端点

##### GET /cameras
```typescript
响应:
{
  "cameras": [
    {
      "id": "camera-1",
      "name": "工位1 - 主检测线",
      "status": "online" | "offline" | "warning",
      "isActive": true,
      "streamUrl": "rtmp://...",
      "lastUpdate": "2024-01-15T10:30:00Z"
    }
  ]
}
```

##### POST /cameras/{id}/start
```typescript
响应: { "success": true, "message": "检测已启动" }
```

##### POST /cameras/{id}/stop
```typescript
响应: { "success": true, "message": "检测已停止" }
```

#### 检测端点

##### GET /detections
```typescript
查询参数:
- page: number (默认: 1)
- limit: number (默认: 20)
- camera: string (可选)
- result: "pass" | "fail" (可选)
- startDate: string (ISO日期, 可选)
- endDate: string (ISO日期, 可选)

响应:
{
  "detections": DetectionResult[],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1247,
    "totalPages": 63
  }
}
```

##### GET /detections/{id}
```typescript
响应: DetectionResult
```

#### 系统端点

##### GET /system/health
```typescript
响应:
{
  "status": "healthy" | "degraded" | "unhealthy",
  "uptime": "99.7%",
  "cpu": 45,
  "memory": {
    "used": 2.1,
    "total": 8.0,
    "unit": "GB"
  },
  "disk": {
    "available": 127,
    "unit": "GB"
  },
  "services": {
    "database": "healthy",
    "ai_service": "healthy",
    "camera_service": "healthy"
  }
}
```

### 错误处理

#### 标准错误响应
```typescript
{
  "error": {
    "code": "ERROR_CODE",
    "message": "人类可读的错误消息",
    "details": "额外的错误详情",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

#### HTTP状态码
- `200` - 成功
- `201` - 已创建
- `400` - 错误请求
- `401` - 未授权
- `403` - 禁止访问
- `404` - 未找到
- `422` - 验证错误
- `500` - 内部服务器错误
