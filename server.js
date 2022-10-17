const express = require('express');
const path = require('path');
const app = express();

//console.log('Servindo os arquivos estáticos');

app.use(express.static(__dirname + '/dist/atmatec'));

//console.log('Regra de direcionamento do router do angular.');

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/atmatec/index.html'));
});

app.listen(process.env.PORT || 8080);
