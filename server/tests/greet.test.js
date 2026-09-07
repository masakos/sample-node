const request = require('supertest');
const app = require('../src/app');

describe('GET /api/health', () => {
  it('サーバーの稼働状態を確認できる', async () => {
    const res = await request(app).get('/api/health');

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.service).toBe('sample-node-api');
    expect(res.body.timestamp).toEqual(expect.any(String));
    expect(Number.isNaN(Date.parse(res.body.timestamp))).toBe(false);
  });
});

describe('POST /api/greet', () => {
  it('名前を送るとあいさつメッセージが返ってくる', async () => {
    const res = await request(app)
      .post('/api/greet')
      .send({ name: '太郎' });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('こんにちは、太郎さん！');
  });

  it('前後の空白はトリムされる', async () => {
    const res = await request(app)
      .post('/api/greet')
      .send({ name: '  花子  ' });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('こんにちは、花子さん！');
  });

  it('名前が空だと400エラーになる', async () => {
    const res = await request(app)
      .post('/api/greet')
      .send({ name: '' });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('nameフィールドがない場合も400エラーになる', async () => {
    const res = await request(app)
      .post('/api/greet')
      .send({});

    expect(res.statusCode).toBe(400);
  });
});
