const express = require("express"); // express프레임워크를 가져와서 express변수에 저장
const app = express(); // app 객체를 만들고
const port = 3000; // 포트번호

const goodsRouter = require("./routes/goods.js");
const cartsRouter = require("./routes/carts.js");
const connect = require("./schemas");
connect();

// 전역 미들웨어 적용 (body-parser Middleware)
app.use(express.json());
app.use("/api", [goodsRouter, cartsRouter]);

app.post("/", (req, res) => {
  console.log(req.body);

  res.send("기본 URI에 POST 메소드가 정상적으로 실행되었습니다.");
});

app.get("/", (req, res) => {
  console.log(req.query);

  const obj = {
    KeyKey: "value입니다.",
    "이름입니다.": "이름일까요?",
  };

  res.status(400).json(obj);
});

app.get("/:id", (req, res) => {
  console.log(req.params);

  res.send(":id URI에 정상적으로 반환되었습니다.");
});

// app.get('/', (req, res) => { // get으로 api를 실행할 수 있게 해주고
//   res.send('Hello World!');
// });

// localhost:3000/api -> goodsRouter
app.use("/api", goodsRouter);

app.listen(port, () => {
  // 실제 서버를 실행 하는 부분
  console.log(port, "포트로 서버가 열렸어요!");
});
