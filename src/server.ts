import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 8000;
const router = require('./router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use( '/static',
  express.static(`${__dirname}/public`));

app.use(express.static('src/public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/upload', router);

app.listen(port, function () {
    console.log('Server is running on PORT',port);
});