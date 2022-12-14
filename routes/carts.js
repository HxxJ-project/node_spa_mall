const express = require("express");
const router = express.Router();

const Cart = require("../schemas/cart.js");
const Goods = require("../schemas/goods.js");

// localhost:3000/api/carts GET Method
router.get("/carts", async (req, res) => {
  const carts = await Cart.find({});
  const goodsIds = carts.map((cart) => {
    return cart.goodsId; // carts 안에있는 goodsId만 goodsIds에 저장해라
  });

  // Goods에 해당하는 모든 정보를 가지고오고, goodsIds 변수안에 존재하는 값일 때에만 저장
  const goods = await Goods.find({ goodsId: goodsIds }); // find mongoose에서 실행

  const results = carts.map((cart) => {
    return {
      quantity: cart.quantity,
      goods: goods.find((item) => item.goodsId === cart.goodsId), // find Array에서 실행
    };
  });

  res.json({
    carts: results,
  });
});

module.exports = router;
