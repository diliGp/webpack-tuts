const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const PORT = process.env.PORT || 4500;

app.use('/static', express.static(path.resolve(__dirname, '..', 'dist')));

app.get('/route2', (req, res) => {
    try {
        const filePath = path.resolve(__dirname, '..', 'dist', 'route2.html');
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        res.send(fileContent);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

app.get('/', (req, res) => {
    try {
        const filePath = path.resolve(__dirname, '..', 'dist', 'route1.html');
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        res.send(fileContent);
    } catch (error) {
        console.error(error)
        res.status(500).send(error);
    }
});

app.listen(
    PORT,
    () => console.log(`Listening on ${PORT}, you can navigate to http://localhost:${PORT}`)
);
