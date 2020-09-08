const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const { assert } = require('chai');
const port = 3000
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here

// here

const breakPoint = Math.pow(10, 6)

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.post("/add", (req, res) => {
    const { num1, num2 } = req.body
    console.log(num1, num2)
    try {
        assert(Number.isFinite(num1) && Number.isFinite(num2), "invalid data types")
        assert(num1 < breakPoint && num2 < breakPoint, "Overflow")
        res.json({
            "status": "success",
            "message": "the sum of given two numbers",
            "sum": num1+num2
        })
    }
    catch (err) {
        res.json({
            "status": "error",
            "message": err.message,
        })
    }
})

app.post("/sub", (req, res) => {
    const { num1, num2 } = req.body
    try {
        assert(Number.isFinite(num1) && Number.isFinite(num2), "invalid data types")
        assert(num1 > breakPoint && num2 > breakPoint, "Underflow")
        res.json({
            "status": "success",
            "message": "the difference of given two numbers",
            "sum": num1-num2
        })
    }
    catch (err) {
        res.json({
            "status": "error",
            "message": err.message,
        })
    }
})

app.post("/multiply", (req, res) => {
    const { num1, num2 } = req.body
    try {
        assert(Number.isFinite(num1) && Number.isFinite(num2), "invalid data types")
        assert(num1 < breakPoint && num2 < breakPoint, "Overflow")
        res.json({
            "status": "success",
            "message": "the product of given two numbers",
            "sum": num1*num2
        })
    }
    catch (err) {
        res.json({
            "status": "error",
            "message": err.message,
        })
    }
})

app.post("/division", (req, res) => {
    const { num1, num2 } = req.body
    try {
        assert(num2 != 0, "Cannot divide by zero")
        res.json({
            "status": "success",
            "message": "The division of given numbers",
            "sum": num1/num2
        })
    }
    catch (err) {
        res.json({
            "status": "error",
            "message": err.message
        })
    }
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;