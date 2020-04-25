const express = require("express")
const app = express()

app.get("/api/users", function (req, res) {
  res.json([{
    id: 1, name: "maeda"
  }, {
    id: 2, name: "takada"
  }])
})

app.get("/api/users2", function (req, res) {
  res.json([{
    id: 1, name: "ikeda"
  }, {
    id: 2, name: "rrrr"
  }])
})

app.listen(9999)
