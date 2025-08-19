# 🧪 最小 Docker 測試環境指南

## ✅ 成功設置！

您的 Docker 環境已經成功設置並測試通過。以下是測試結果和使用說明：

## 📊 當前狀態

- ✅ **前端容器**: 運行正常 (http://localhost:3000)
- ✅ **後端容器**: 運行正常 (http://localhost:5001)
- ✅ **Docker Desktop**: 正常運行
- ✅ **最小 React 應用程式**: 部署成功
- ✅ **Node.js Express API**: 部署成功
- ✅ **前端 ↔ 後端連接**: 通信正常

## 🚀 最小測試步驟

### 1. 前端 + 後端一鍵測試（推薦）
```bash
# 啟動前端和後端服務
./minimal-test.sh start

# 測試服務狀態
./minimal-test.sh test

# 停止所有服務
./minimal-test.sh stop
```

### 2. 手動測試步驟
```bash
# 啟動後端 (埠號 5001 避免 macOS 衝突)
docker run -d -p 5001:5000 --name backend-test sep-prototype-backend

# 啟動前端
docker run -d -p 3000:3000 --name frontend-test sep-prototype-frontend

# 測試後端
curl http://localhost:5001

# 檢查容器狀態
docker ps
```

### 2. 清理測試環境
```bash
# 停止並移除測試容器
docker stop frontend-test
docker rm frontend-test
```

### 3. 完整環境測試
```bash
# 運行快速測試腳本
./quick-test.sh

# 啟動所有服務（可能需要修復埠號衝突）
./docker-manager.sh start
```

## 🔧 已建立的最小化檔案

### Frontend 檔案結構
```
frontend/
├── package.json          # 最小依賴 (只有 React 核心)
├── Dockerfile            # 容器配置
├── public/
│   └── index.html        # HTML 模板
└── src/
    ├── index.js          # React 入口點
    ├── App.js            # 包含後端連接測試的主組件
    ├── App.css           # 基本樣式
    └── index.css         # 全局樣式
```

### Backend 檔案結構
```
backend/
├── package.json          # Node.js 依賴 (Express, CORS)
├── Dockerfile            # 容器配置
└── index.js              # Express 服務器
```

### 最小 package.json 依賴

**Frontend:**
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  }
}
```

**Backend:**
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3"
  }
}
```

## 🌐 測試 URL

- **前端測試頁面**: http://localhost:3000
- **後端 API**: http://localhost:5001
- **後端健康檢查**: http://localhost:5001/health
- **顯示內容**: SEP Prototype Docker 環境測試頁面 + 後端連接狀態

## 🛠️ 實用腳本

- **`./minimal-test.sh`**: 前端 + 後端一鍵管理
- **`./quick-test.sh`**: 快速環境檢查
- **`./docker-manager.sh`**: 完整服務管理
- **`./health-check.sh`**: 詳細健康檢查

## 🎯 成功指標

如果您看到以下內容，表示環境設置成功：

1. ✅ 前端和後端 Docker 容器正常啟動
2. ✅ 前端頁面正常載入 (http://localhost:3000)
3. ✅ 後端 API 正常響應 (http://localhost:5001)
4. ✅ 前端顯示 "後端狀態: ✅ 已連接"
5. ✅ 顯示後端回應訊息 "SEP Backend API is running!"
6. ✅ 刷新按鈕正常工作並重新測試連接

## 🚨 常見問題解決

### 埠號衝突
如果遇到埠號被佔用：
```bash
# 檢查佔用埠號的程序
lsof -i :3000
lsof -i :8086

# 停止佔用的程序或使用不同埠號
```

### 容器建構失敗
```bash
# 清理 Docker 快取
docker system prune -a

# 重新建構
docker compose build --no-cache frontend
```

## 🎉 下一步

現在您的基本 Docker 環境已經工作，您可以：

1. 逐步添加後端服務測試
2. 集成 InfluxDB 和 Grafana
3. 開發更複雜的功能
4. 添加測試和監控

恭喜！您的 Docker 微服務原型環境已經成功運行！ 🎊
