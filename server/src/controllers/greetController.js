// このファイルは「リファクタリング前」の状態です。
// バリデーションとメッセージ生成のロジックがコントローラーに直接書かれています。
// 演習: これらを別ファイル(例: services/greetService.js)に切り出してみましょう。

function postGreet(req, res) {
  const name = req.body.name;

  // バリデーション処理がここに直書きされている
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: '名前を入力してください' });
  }

  // メッセージ生成ロジックもここに直書きされている
  const trimmedName = name.trim();
  const message = `こんにちは、${trimmedName}さん！`;

  return res.status(200).json({ message });
}

function getHealth(req, res) {
  return res.status(200).json({
    status: 'ok',
    service: 'sample-node-api',
    timestamp: new Date().toISOString(),
  });
}

export { getHealth, postGreet };
