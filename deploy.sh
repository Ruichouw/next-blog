#!/bin/bash
# 一键部署脚本（pnpm + Next.js + pm2）

# === 配置区：按你的实际情况改这几个变量 ===
PROJECT_DIR="/root/apps/my-blog"   # 你的项目目录（这里就是 ~/apps/my-blog）
GIT_BRANCH="main"                  # 要部署的分支：main / master / 其他
PM2_APP_NAME="my-blog"             # pm2 进程名
# ===========================================

echo "🚀 开始部署：$PROJECT_DIR （分支：$GIT_BRANCH，pm2 应用：$PM2_APP_NAME）"

# 任何命令出错就中断脚本
set -e

# 进入项目目录
cd "$PROJECT_DIR"

echo "📥 拉取最新代码..."
git fetch origin
git checkout "$GIT_BRANCH"
git pull origin "$GIT_BRANCH"

echo "📦 安装依赖（pnpm install）..."
pnpm install --frozen-lockfile

echo "🏗 进行构建（pnpm build）..."
pnpm build

echo "♻️ 重载 pm2 进程：$PM2_APP_NAME ..."
pm2 reload "$PM2_APP_NAME"

echo "✅ 部署完成！时间：$(date '+%Y-%m-%d %H:%M:%S')"
