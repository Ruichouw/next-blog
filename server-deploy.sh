#!/bin/bash
# 服务器端部署脚本（解压本地构建结果 + reload pm2）

set -e

APP_DIR="/root/apps/my-blog"
PM2_APP_NAME="my-blog"          # 如果 pm2 list 里叫别的名字，这里要改
TAR_NAME="build-artifact.tar.gz"

echo "📂 进入项目目录：$APP_DIR"
cd "$APP_DIR"

if [ ! -f "$TAR_NAME" ]; then
  echo "❌ 找不到 $TAR_NAME，请确认本地已上传构建包"
  exit 1
fi

echo "🧹 删除旧 .next ..."
rm -rf .next

echo "📦 解压新构建..."
tar xzf "$TAR_NAME"

echo "📦 安装生产依赖..."
pnpm install --prod --frozen-lockfile

echo "♻️ 重载 pm2 ..."
pm2 reload "$PM2_APP_NAME"

echo "🧹 清理构建包..."
rm -f "$TAR_NAME"

echo "✅ 服务器部署完成 $(date)"
