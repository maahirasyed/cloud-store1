const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

let db;

function connectDB() {
    db = mysql.createConnection({
        host: 'mysql', // ✅ IMPORTANT
        user: 'root',
        password: 'root',
        database: 'ecommerce',
    });

    db.connect(err => {
        if (err) {
            console.log("❌ DB not ready, retrying...");
            setTimeout(connectDB, 5000);
        } else {
            console.log("✅ MySQL Connected!");
        }
    });
}

connectDB();

app.get('/products', (req, res) => {
    db.query("SELECT * FROM products", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000 🚀");
});
