const sqlite3 = require('sqlite3').verbose();
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

    const stmt = db.prepare("INSERT INTO chicken_prices (date, product_name, price) VALUES (?, ?, ?)");
    const prices = [
        ['2014', '雞排', 40],
        ['2015', '雞排', 45],
        ['2016', '雞排', 50],
        ['2017', '雞排', 55],
        ['2018', '雞排', 60],
        ['2019', '雞排', 65],
        ['2020', '雞排', 70],
        ['2021', '雞排', 75],
        ['2022', '雞排', 80],
        ['2023', '雞排', 85],
    ];
    for (const [date, product_name, price] of prices) {
        stmt.run(date, product_name, price);
    }
    stmt.finalize();
});

db.close();
