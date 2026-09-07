const express = require('express');
const cors = require('cors');
const greetRoutes = require('./routes/greetRoutes');

const app = express();

// フロントエンド(別ポート)からのアクセスを許可する
app.use(cors());
// JSON形式のリクエストボディをパースできるようにする
app.use(express.json());

// "/api" 以下のルーティングを greetRoutes に任せる
app.use('/api', greetRoutes);

const PORT = process.env.PORT || 3001;

// テストからrequireされたときはサーバーを自動起動しない
// (テストは app オブジェクトだけを使ってリクエストをシミュレートするため)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
