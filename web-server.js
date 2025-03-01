const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Rota para servir a página web
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Rota para servir o conteúdo do log
app.get('/log', (req, res) => {
    const logFilePath = req.query.path || 'default.log';

    if (!fs.existsSync(logFilePath)) {
        return res.status(404).send('Arquivo de log não encontrado.');
    }

    const logContent = fs.readFileSync(logFilePath, 'utf-8');
    res.send(logContent);
});

// Caso deseje, mude localhost por seu dominio
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
