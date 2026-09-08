import express from 'express';
import cors from 'cors';
import { pathToFileURL } from 'node:url';
import greetRoutes from './routes/greetRoutes.js';

const app = express();

// フロントエンド(別ポート)からのアクセスを許可する
app.use(cors());

// JSON形式のリクエストボディをパースできるようにする
app.use(express.json());

// "/api" 以下のルーティングを greetRoutes に任せる
app.use('/api', greetRoutes);

const PORT = process.env.PORT || 3001;

// テストからimportされたときはサーバーを自動起動しない
// (テストは app オブジェクトだけを使ってリクエストをシミュレートするため)
const isMainModule = process.argv[1]
  && pathToFileURL(process.argv[1]).href === import.meta.url;

if (isMainModule) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;
