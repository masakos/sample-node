# React + Express ミニ学習プロジェクト

名前を入力すると挨拶メッセージが返ってくるだけの、最小構成のSPA + REST APIです。
ペアプログラミングでの機能追加と、サーバー側コードのリファクタリング演習を想定しています。

## 1. 概念

- **SPA（Single Page Application）**：最初に index.html などのHTMLを読み込み、その後はJavaScript（React）が画面の必要な部分だけを更新する。ページ全体のリロードを基本的に行わずに画面を切り替える。
- **サーバー (Express)**: `GET /api/health` で稼働状態を確認でき、`POST /api/greet` でJSONを受け取り、挨拶メッセージを返すシンプルなREST API。
- **クライアント⇔サーバー通信**: ブラウザの`fetch`でJSONをやり取りする。通信処理は`client/src/api/greetApi.js`に集約し、コンポーネント(`GreetForm.jsx`)は「呼び出すだけ」にすることで関心を分離している。
- **クライアント⇔サーバー通信**: クライアントの環境変数`VITE_API_BASE_URL`で指定したAPIサーバーへ、絶対URLでリクエストを送信する。APIサーバーはCORSを許可している。

## 2. セットアップと起動

```bash
# ターミナル1: サーバー
cd server
npm install
npm start        # http://localhost:3001

# ターミナル2: クライアント
cd client
npm install
npm run dev       # http://localhost:5173
```

`.env.example`を`.env`としてコピーし、APIサーバーのURLを設定します。PowerShellでは次のコマンドを実行できます。

```powershell
Copy-Item .env.example .env
```

`.env`の内容:

```env
VITE_API_BASE_URL=http://localhost:3001
```

ブラウザで`http://localhost:5173`を開き、名前を入力して送信すると挨拶が表示されます。

サーバーの稼働確認は、ブラウザやcurlで`http://localhost:3001/api/health`にアクセスしてください。

## 3. テストの実行

このプロジェクトでは、**サーバー側のみ**自動テストを用意しています。

```bash
cd server && npm test    # Jest + Supertest
```

- **Jest**: テストランナー/アサーションライブラリ(テストの実行と検証を担当)
- **Supertest**: サーバーを起動せずにHTTPリクエストをシミュレートし、Expressのエンドポイントをテストするためのライブラリ


## 4. ペアプログラミング演習: 機能を1つ追加する

`server/src/controllers/greetController.js` と `client/src/components/GreetForm.jsx` を
ドライバー/ナビゲーターで交代しながら編集してみましょう。(どれか1つ):

- **挨拶に時間帯を反映する**: サーバー側で現在時刻から「おはよう/こんにちは/こんばんは」を出し分ける
- **入力履歴を表示する**: クライアント側で送信した名前をリストに追加して画面に表示する(state追加)
- **文字数バリデーション**: 名前が20文字を超えたらサーバー側で400エラーを返す

進め方の例:
1. まずサーバー側のテスト(`greet.test.js`)に「期待する挙動」のテストケースを追加する(テストが先に落ちる状態を作る = TDD)
2. `greetController.js`を編集してテストを通す
3. 必要であればクライアント側(`GreetForm.jsx`)も編集して画面に反映する(クライアント側にはテストは追加しない)

## 5. リファクタリング演習(サーバー側)

`greetController.js`は意図的に、バリデーションとメッセージ生成のロジックが
コントローラー関数の中に直書きされた状態にしてあります。

**お題**: 以下の構成に分離してみましょう。

```
server/src/
  controllers/greetController.js   # リクエスト/レスポンスの受け渡しのみ
  services/greetService.js         # バリデーション + メッセージ生成ロジック
```

ポイントとして生徒に伝えたいこと:
- コントローラーは「HTTPの入出力」だけを担当し、ビジネスロジックを持たない
- ロジックを純粋関数として切り出すと、Expressを介さずに単体テストしやすくなる
- リファクタリング中も`npm test`を都度実行し、**挙動が変わっていないこと**を確認しながら進める(テストがあるからこそ安心してリファクタリングできる、という体験がゴール)

## 6. CI (GitHub Actions)

`.github/workflows/ci.yml`により、`main`ブランチへのpush/PR時に以下が自動実行されます。

- `server`ディレクトリで`npm install` → `npm test`(Jest)

(クライアント側はテスト対象外のため、CIジョブも用意していません)

GitHubにpushする前に、`server`ディレクトリで一度`npm install`を実行し、
生成された`package-lock.json`もコミットしておいてください
(CIの`cache-dependency-path`がこのファイルを参照します)。

