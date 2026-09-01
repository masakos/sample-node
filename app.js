import http from "node:http";

const fortunes = ["大吉", "中吉", "小吉"];

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/fortune") {
    const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];

    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(fortune);
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Not Found");
});

server.listen(3000, () => {
  console.log("サーバーがポート3000で起動しました");
});