# User Guide | 用户手册

## English

### Overview

VisionQC NeXtGen is an AI-powered industrial vision quality control system designed for real-time defect detection and quality monitoring in manufacturing environments. This guide provides comprehensive instructions for operators and administrators.

### Getting Started

#### System Requirements
- **Web Browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Screen Resolution**: Minimum 1280x720, Recommended 1920x1080
- **Internet Connection**: Stable connection for real-time updates
- **Permissions**: Camera access (if using local cameras)

#### First Login

1. **Access the System**
   - Open your web browser
   - Navigate to the VisionQC NeXtGen URL
   - You will see the login screen

2. **Login Credentials**
   - Enter your username and password
   - Default admin credentials:
     - Username: `admin`
     - Password: `admin123`
   - Click "登录" (Login) button

3. **Initial Setup**
   - Upon first login, you'll be directed to the main dashboard
   - The system will automatically start with demo data

### Main Dashboard

#### Dashboard Overview

The main dashboard provides a comprehensive view of your quality control operations:

##### Hero Section
- **System Title**: 慧眼质控云 —— AI驱动的新一代工业质检平台
- **Subtitle**: 实时监控生产线质量状态 • 智能缺陷识别

##### Key Metrics (Statistics Cards)

1. **总检测数 (Total Detections)**
   - Shows total number of items processed
   - Updates in real-time during operation

2. **合格产品 (Pass Count)**
   - Number of items that passed quality inspection
   - Displayed with green success indicator

3. **不合格产品 (Fail Count)**
   - Number of items that failed quality inspection
   - Displayed with red error indicator

4. **合格率 (Pass Rate)**
   - Percentage of items passing quality control
   - Target: ≥98%
   - Shows trend comparison with previous day

5. **平均延迟 (Average Processing Time)**
   - Average time to process each item
   - Target: ≤2 seconds
   - Measured in seconds

6. **系统正常运行时间 (System Uptime)**
   - Percentage of time system has been operational
   - Indicates system reliability

#### Camera Views

##### Camera 1 - 工位1 (Main Detection Line)
- **Status Indicator**: Shows online/offline/warning status
- **Live Feed**: Real-time camera view (simulated)
- **Detection Overlay**: Bounding boxes around detected objects
- **Controls**: Start/stop detection buttons

##### Camera 2 - 工位2 (Backup Detection Line)
- Similar functionality to Camera 1
- Can be activated as needed

#### Real-time Alerts

The system displays three types of alerts:

1. **Error Alerts (红色)**: Critical quality issues
   - Example: "质量异常 - 工位1检测到瓶身破损，已自动标记"

2. **Warning Alerts (黄色)**: Attention required
   - Example: "注意 - 工位2检测置信度略低，建议人工复查"

3. **Success Alerts (绿色)**: Successful operations
   - Example: "操作成功 - 所有工位检测已启动"

#### Quick Actions Panel

Located on the right side of the dashboard:

1. **启动所有检测 (Start All Detection)**
   - Activates detection on all cameras
   - Shows success notification when completed

2. **暂停所有检测 (Pause All Detection)**
   - Temporarily stops all detection processes
   - Can be resumed later

3. **导出今日报告 (Export Today's Report)**
   - Generates and downloads daily quality report
   - Includes statistics and detection history

#### System Status Panel

Displays real-time system performance:

- **当前FPS (Current FPS)**: Processing frame rate
- **CPU使用率 (CPU Usage)**: System CPU utilization
- **内存使用 (Memory Usage)**: RAM consumption
- **磁盘可用 (Disk Available)**: Available storage space

#### Daily Overview Panel

Shows today's operational summary:

- **检测开始时间 (Detection Start Time)**: When detection began
- **运行时长 (Runtime Duration)**: How long system has been running
- **平均产能 (Average Throughput)**: Items processed per hour
- **预计完成 (Estimated Completion)**: Projected end time

### Camera Operations

#### Starting Detection

1. **Individual Camera**
   - Click on the camera view card
   - Click "开始检测" (Start Detection) button
   - Camera status will change to "检测中" (Detecting)

2. **All Cameras**
   - Use "启动所有检测" button in Quick Actions panel
   - All active cameras will begin detection simultaneously

#### Monitoring Detection

1. **Visual Indicators**
   - Green bounding boxes: Items passing quality check
   - Red bounding boxes: Items failing quality check
   - Confidence percentages displayed on each detection

2. **Status Monitoring**
   - Online (在线): Camera connected and functioning
   - Warning (警告): Camera connected but issues detected
   - Offline (离线): Camera disconnected or not responding

#### Stopping Detection

1. **Individual Camera**
   - Click "停止检测" (Stop Detection) button
   - Camera will return to standby mode

2. **All Cameras**
   - Use "暂停所有检测" button in Quick Actions panel
   - All cameras will stop detection

### History and Reporting

#### Accessing History

1. Navigate to "历史记录" (History) from the sidebar menu
2. The history page displays all past detection records

#### Filtering Records

Use the filter controls at the top of the history page:

1. **Search Bar**: Enter keywords to search records
2. **Camera Filter**: Select specific camera (工位1, 工位2, or all)
3. **Result Filter**: Filter by pass/fail status
4. **Date Range**: Select specific time periods

#### Viewing Detection Details

Each history record shows:

- **Timestamp**: When detection occurred
- **Camera**: Which workstation performed detection
- **Result**: 合格 (Pass) or 不合格 (Fail)
- **Confidence**: Detection confidence percentage
- **Defect Type**: Type of defect if item failed
- **Image**: Captured image with detection overlay

#### Exporting Data

1. **CSV Export**: Click "导出CSV" button for spreadsheet data
2. **Report Generation**: Click "生成报告" for formatted report

### User Management

#### User Roles

1. **Administrator (管理员)**
   - Full system access
   - User management capabilities
   - System configuration access

2. **Operator (操作员)**
   - Dashboard access
   - Camera operation controls
   - History viewing

3. **Guest (访客)**
   - Read-only dashboard access
   - Limited functionality

#### Changing User Settings

1. Click on user profile in the top-right corner
2. Select "设置" (Settings) from dropdown menu
3. Modify user preferences and save changes

### Troubleshooting Common Issues

#### Camera Connection Issues

1. **Check Status Indicator**
   - Red indicator means camera is offline
   - Yellow indicator means connection issues

2. **Refresh Connection**
   - Click camera settings icon
   - Select "重新连接" (Reconnect)

#### Detection Not Working

1. **Verify Camera Status**
   - Ensure camera shows "在线" (Online) status
   - Check if detection is actually started

2. **Check System Resources**
   - Monitor CPU and memory usage in status panel
   - Restart detection if resources are high

#### Slow Performance

1. **Check Network Connection**
   - Ensure stable internet connection
   - Refresh browser if needed

2. **Clear Browser Cache**
   - Clear browser cache and cookies
   - Restart browser application

---

## 中文

### 概述

慧眼质控云是一个AI驱动的工业视觉质量控制系统，专为制造环境中的实时缺陷检测和质量监控而设计。本指南为操作员和管理员提供全面的使用说明。

### 入门指南

#### 系统要求
- **网页浏览器**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **屏幕分辨率**: 最低1280x720，推荐1920x1080
- **网络连接**: 稳定的网络连接以获取实时更新
- **权限**: 摄像头访问权限（如使用本地摄像头）

#### 首次登录

1. **访问系统**
   - 打开网页浏览器
   - 导航到慧眼质控云URL
   - 您将看到登录界面

2. **登录凭据**
   - 输入用户名和密码
   - 默认管理员凭据：
     - 用户名：`admin`
     - 密码：`admin123`
   - 点击"登录"按钮

3. **初始设置**
   - 首次登录后，您将被引导到主仪表板
   - 系统将自动启动并显示演示数据

### 主仪表板

#### 仪表板概览

主仪表板提供质量控制操作的全面视图：

##### 标题区域
- **系统标题**: 慧眼质控云 —— AI驱动的新一代工业质检平台
- **副标题**: 实时监控生产线质量状态 • 智能缺陷识别

##### 关键指标（统计卡片）

1. **总检测数**
   - 显示已处理项目的总数
   - 在操作期间实时更新

2. **合格产品**
   - 通过质量检查的项目数量
   - 以绿色成功指示器显示

3. **不合格产品**
   - 未通过质量检查的项目数量
   - 以红色错误指示器显示

4. **合格率**
   - 通过质量控制的项目百分比
   - 目标：≥98%
   - 显示与前一天的趋势比较

5. **平均延迟**
   - 处理每个项目的平均时间
   - 目标：≤2秒
   - 以秒为单位测量

6. **系统正常运行时间**
   - 系统运行的时间百分比
   - 表示系统可靠性

#### 摄像头视图

##### 摄像头1 - 工位1（主检测线）
- **状态指示器**: 显示在线/离线/警告状态
- **实时画面**: 实时摄像头视图（模拟）
- **检测覆盖层**: 检测对象周围的边界框
- **控制**: 开始/停止检测按钮

##### 摄像头2 - 工位2（备用检测线）
- 与摄像头1功能类似
- 可根据需要激活

#### 实时告警

系统显示三种类型的告警：

1. **错误告警（红色）**: 关键质量问题
   - 示例："质量异常 - 工位1检测到瓶身破损，已自动标记"

2. **警告告警（黄色）**: 需要注意
   - 示例："注意 - 工位2检测置信度略低，建议人工复查"

3. **成功告警（绿色）**: 成功操作
   - 示例："操作成功 - 所有工位检测已启动"

#### 快速操作面板

位于仪表板右侧：

1. **启动所有检测**
   - 激活所有摄像头的检测
   - 完成时显示成功通知

2. **暂停所有检测**
   - 临时停止所有检测过程
   - 稍后可以恢复

3. **导出今日报告**
   - 生成并下载每日质量报告
   - 包括统计数据和检测历史

#### 系统状态面板

显示实时系统性能：

- **当前FPS**: 处理帧率
- **CPU使用率**: 系统CPU利用率
- **内存使用**: RAM消耗
- **磁盘可用**: 可用存储空间

#### 今日概览面板

显示今天的操作摘要：

- **检测开始时间**: 检测开始的时间
- **运行时长**: 系统运行的时间
- **平均产能**: 每小时处理的项目数
- **预计完成**: 预计结束时间

### 摄像头操作

#### 开始检测

1. **单个摄像头**
   - 点击摄像头视图卡片
   - 点击"开始检测"按钮
   - 摄像头状态将变为"检测中"

2. **所有摄像头**
   - 使用快速操作面板中的"启动所有检测"按钮
   - 所有活动摄像头将同时开始检测

#### 监控检测

1. **视觉指示器**
   - 绿色边界框：通过质量检查的项目
   - 红色边界框：未通过质量检查的项目
   - 每个检测上显示置信度百分比

2. **状态监控**
   - 在线：摄像头已连接并正常工作
   - 警告：摄像头已连接但检测到问题
   - 离线：摄像头断开连接或无响应

#### 停止检测

1. **单个摄像头**
   - 点击"停止检测"按钮
   - 摄像头将返回待机模式

2. **所有摄像头**
   - 使用快速操作面板中的"暂停所有检测"按钮
   - 所有摄像头将停止检测

### 历史记录和报告

#### 访问历史记录

1. 从侧边栏菜单导航到"历史记录"
2. 历史记录页面显示所有过去的检测记录

#### 筛选记录

使用历史记录页面顶部的筛选控件：

1. **搜索栏**: 输入关键词搜索记录
2. **摄像头筛选**: 选择特定摄像头（工位1、工位2或全部）
3. **结果筛选**: 按通过/失败状态筛选
4. **日期范围**: 选择特定时间段

#### 查看检测详情

每个历史记录显示：

- **时间戳**: 检测发生的时间
- **摄像头**: 执行检测的工位
- **结果**: 合格或不合格
- **置信度**: 检测置信度百分比
- **缺陷类型**: 如果项目失败，缺陷类型
- **图像**: 带有检测覆盖层的捕获图像

#### 导出数据

1. **CSV导出**: 点击"导出CSV"按钮获取电子表格数据
2. **报告生成**: 点击"生成报告"获取格式化报告

### 用户管理

#### 用户角色

1. **管理员**
   - 完整系统访问权限
   - 用户管理功能
   - 系统配置访问权限

2. **操作员**
   - 仪表板访问权限
   - 摄像头操作控制
   - 历史记录查看

3. **访客**
   - 只读仪表板访问权限
   - 有限功能

#### 更改用户设置

1. 点击右上角的用户配置文件
2. 从下拉菜单中选择"设置"
3. 修改用户首选项并保存更改

### 常见问题故障排除

#### 摄像头连接问题

1. **检查状态指示器**
   - 红色指示器表示摄像头离线
   - 黄色指示器表示连接问题

2. **刷新连接**
   - 点击摄像头设置图标
   - 选择"重新连接"

#### 检测不工作

1. **验证摄像头状态**
   - 确保摄像头显示"在线"状态
   - 检查检测是否实际启动

2. **检查系统资源**
   - 在状态面板中监控CPU和内存使用情况
   - 如果资源使用率高，重启检测

#### 性能缓慢

1. **检查网络连接**
   - 确保稳定的网络连接
   - 如需要，刷新浏览器

2. **清除浏览器缓存**
   - 清除浏览器缓存和cookie
   - 重启浏览器应用程序
