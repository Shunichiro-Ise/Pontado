# URL一覧
### ローカルフロント（docker-compose）：
http://localhost:3000￼
### ローカルバックエンド（docker-compose）：
http://localhost:4000/api/health￼
### App Runner（本番 API）：
https://psq2fqpvv8.eu-west-2.awsapprunner.com/api/health￼ (AppRunner再起動で変更の可能性あり)
### CloudFront（本番フロント）：
https://d3jd5z33zivvds.cloudfront.net￼

# コマンド一覧
## ローカル環境 (Dockerコンテナ)
起動
docker-compose up --build
バックグラウンドで起動したい場合
docker-compose up -d --build
停止
docker-compose down

## ローカル環境 (NodeJSで直接)
### Backend
cd backend
npm install      # 初回のみ
npm run start:dev
http://localhost:3000/api/health

### Frontend
cd frontend
npm install      # 初回のみ
npm run dev
http://localhost:5173

## 手動AWS接続コマンド
### Backend
cd backend
ECR ログイン
aws ecr get-login-password --region eu-west-2 \
  | docker login --username AWS --password-stdin 215896857065.dkr.ecr.eu-west-2.amazonaws.com
buildx 用 builder 作成（初回だけ）
docker buildx create --use --name pontado-builder || docker buildx use pontado-builder
docker buildx inspect --bootstrap
linux/amd64 でビルドして ECR に push
docker buildx build \
  --platform linux/amd64 \
  -t 215896857065.dkr.ecr.eu-west-2.amazonaws.com/pontado:latest \
  --push \
  .

### Frontend
cd frontend
ビルド
npm install       # 初回のみ
npm run build     # dist/ ができる
S3 にアップロード
aws s3 sync dist s3://<S3_BUCKET名> --delete
CloudFront キャッシュ削除
aws cloudfront create-invalidation \
  --distribution-id <CLOUDFRONT_DISTRIBUTION_ID> \
  --paths "/*"