const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

require('./Database/database');

const app = express();

app.use(morgan(':method :url | Status :status | Size :res[content-length] | Time :response-time ms'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require('./routes/testRoute'));
app.use(require('./routes/distritoRoute'));
app.use(require('./routes/concelhoRoute'));
app.use(require('./routes/especialidadeRoute'));
app.use(require('./routes/prescricaoRoute'));
app.use(require('./routes/exameRoute'));
app.use(require('./routes/formularioRoute'));
app.use(require('./routes/miscRoute'));

app.use('/www', express.static('www'))

app.get('/', (req, res) => {
    res.redirect(301, '/www/PaginaPrincipal.html');
  });

app.listen('3050', (err) => {
    if(err)
        throw err;

    console.log('running on port 3050');
});
