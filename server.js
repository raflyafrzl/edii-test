const express = require("express")
const app = express()
const handler = require("./handler")


app.use(express.json())


app.get("/getdatauser/:id", handler.getDataUser)
app.post("/setdatauser", handler.setDataUser)
app.delete("/deletedatauser/:id", handler.delDataUser)

app.listen(3000, () => {
    console.log("listening on port : 3000")
})