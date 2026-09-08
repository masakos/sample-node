function postGreet(req, res) {
  const name = req.body.name;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: '名前を入力してください' });
  }

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
