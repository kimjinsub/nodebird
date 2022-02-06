const express = require('express');
const postRouter = require('./routes/post');
const db = require('./models');
const app = express();
db.sequelize.sync()
    .then(() => {
        console.log('db 연결 성공');
    })
    .catch(console.error);
    
app.get('/', (req, res) => {
    res.send('hello express');
})

app.get('/api', (req, res) => {
    res.send('hello api');
})

app.get('/api/posts', (req, res) => {
    res.json([
        { id: 1, content: 'hello' },
        { id: 2, content: 'hello2' },
        { id: 3, content: 'hello3' }
    ]);
});

app.use('/post', postRouter);

app.listen(3065, () => {
    console.log('서버 실행 중');
});
// const http = require('http');
// const server = http.createServer((req, res) => {
//     console.log(req.url, req.method);
//     res.write('<h1>Hello nodebird-back</h1>');
//     res.end('Hello node');
// });
// server.listen(3065, () => {
//     console.log('서버 실행 중');
// });

// 보통의 통신 합의사항(restAPI)
// app.get -> 가져오다
// app.post -> 생성하다
// app.put -> 전체수정
// app.delete -> 제거
// app.patch -> 부분수정
// app.options -> 찔러보기
// app.head -> 헤더만가져오기(헤더/바디)