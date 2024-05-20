const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('.'));

const db = new sqlite3.Database('chicken_prices.db');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS chicken_prices (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            product_name TEXT NOT NULL,
            price INTEGER NOT NULL
        )
    `);
});

app.post('/api/add', (req, res) => {
    const { date, product_name, price } = req.body;
    db.run('INSERT INTO chicken_prices (date, product_name, price) VALUES (?, ?, ?)', [date, product_name, price], function(err) {
        if (err) {
            return res.status(500).json({ status: 'error', message: err.message });
        }
        res.status(201).json({ status: 'success', id: this.lastID });
    });
});

app.get('/api/list', (req, res) => {
    db.all('SELECT * FROM chicken_prices', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: err.message });
        }
        res.json(rows);
    });
});

app.get('/api/search', (req, res) => {
    const query = req.query.query;
    db.all('SELECT * FROM chicken_prices WHERE date LIKE ? OR product_name LIKE ?', [`%${query}%`, `%${query}%`], (err, rows) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: err.message });
        }
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
