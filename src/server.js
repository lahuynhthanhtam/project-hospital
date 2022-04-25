import express from 'express';
import viewEngine from './config/viewEngine'
import initWebRoutes from './route/web'
import bodyParser from 'body-parser'
import connectDB from './config/connectDB'


require('dotenv').config();

let app = express();

// Config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);
connectDB();

// Luôn dùng cư pháp này để lấy biến môi trường.
// Nếu chúng ta chưa khai báo biến môi trường thì nó lấy giá trị thứ 2;

let port = process.env.PORT || 6969;
app.listen(port, () => {
    // callback
    console.log('listening on port' + port);
});