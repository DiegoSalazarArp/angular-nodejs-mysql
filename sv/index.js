const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')


const apiRouter = require('./routes/api');

const app = express();

require('./db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors());
app.use('/api', apiRouter);




app.listen(3000, () => {
    console.log('Servidor escuchando');
});