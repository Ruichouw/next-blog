#!/bin/bash
# 本地一键部署脚本：本地构建 + 打包 + 上传 + 服务器部署

set -e

# === 配置区（根据你情况已填写，大部分不用动） ===
LOCAL_PROJECT_DIR="/d/FontCode/blog/my-blog"   # 你的本地项目目录
REMOTE_USER="root"
REMOTE_HOST="110.41.19.112"                     # ← 把这里改成你的服务器IP
REMOTE_DIR="/root/apps/my-blog"                # 服务器项目目录
TAR_NAME="build-artifact.tar.gz"
GIT_BRANCH="main"                              # 如果你不是用 main 分支，这里要改
# ============================================

echo "📂 切换到本地项目目录：$LOCAL_PROJECT_DIR"
cd "$LOCAL_PROJECT_DIR"

echo "📥 拉取最新代码（$GIT_BRANCH）..."
git pull origin "$GIT_BRANCH"

echo "📦 安装依赖（pnpm install）..."
pnpm install

echo "🏗 本地构建（pnpm build）..."
pnpm build

echo "🧹 删除旧的构建包..."
rm -f "$TAR_NAME"

echo "📦 打包构建产物..."
tar czf "$TAR_NAME" \
  .next \
  package.json \
  pnpm-lock.yaml \
  next.config.* \
  public

echo "🚀 上传构建包到服务器..."
scp "$TAR_NAME" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/$TAR_NAME"

echo "📡 远程执行服务器部署脚本..."
ssh "$REMOTE_USER@$REMOTE_HOST" "cd $REMOTE_DIR && ./server-deploy.sh"

echo "🎉 部署完成！"
