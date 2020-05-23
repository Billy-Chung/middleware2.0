// app.js
const express = require('express')
const app = express()
const port = 3000

app.use(function (req, res, next) {
    let date = new Date()
    let reqMethod = req.method
    let oriGinalUrl = req.originalUrl
    function getDateTime() {

        let year = date.getFullYear();

        let month = date.getMonth() + 1;
        month = (month < 10 ? "0" : "") + month;

        let day = date.getDate();
        day = (day < 10 ? "0" : "") + day;

        let hour = date.getHours();
        hour = (hour < 10 ? "0" : "") + hour;

        let min = date.getMinutes();
        min = (min < 10 ? "0" : "") + min;

        let sec = date.getSeconds();
        sec = (sec < 10 ? "0" : "") + sec;

        return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;

    }

    next();
    res.end();
    res.on('finish', function (req, res, next) {
        let returnTime = new Date()
        let gap = returnTime - date        
        console.log(getDateTime(), '|', reqMethod, 'from', oriGinalUrl ,'|' ,'total time:', gap,'ms')
        }   

    )

})

app.get('/', (req, res) => {
    res.send('列出全部 Todo')
})

app.get('/new', (req, res) => {
    res.send('新增 Todo 頁面')
})

app.get('/:id', (req, res) => {
    res.send('顯示一筆 Todo')
})

app.post('/', (req, res) => {
    res.send('新增一筆  Todo')
})

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})