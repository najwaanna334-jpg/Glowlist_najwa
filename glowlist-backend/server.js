const express = require('express');
const cors = require('cors')
const app = express();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'glowlist_db_najwa'
});

db.connect(err => {
    if (err) {
        console.error('Gagal konek ke database:', err);
    } else {
        console.log('Berhasil konek ke databaes Glowlist');
    }
});
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Selamat Datang Di Glowlist API! ');
});

app.listen(PORT, () => {
    console.log(`Server Glowlist jalan di http://localhost:${PORT}`);
});

app.get('/produk', (req, res) => {
    const sql = 'SELECT * FROM produk';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    })

});

app.post('/produk', (req, res) => {

    const { judul, deskripsi, harga, id_kategori} = req.body;
    if(!judul || !harga || !deskripsi) {
        return res.status(400).json({message: 'Judul, deskripsi dan harga wajib diisi'});
    }
    
    const sql ='INSERT INTO produk (judul, deskripsi, harga, id_kategori, tgl_input) VALUES (?,?,?,?, NOW())';
    db.query(sql, [judul,deskripsi,harga,id_kategori], (err, result) => {
        if (err) return res.status(500).json({ error: err.sqlMessage});
        res.json({
            message: 'Produk berhasil ditambahkan!',
            id_produk: result.insertId
        })
    })
})

app.get('/kategori', (req, res) => {
    const sql = 'SELECT * FROM kategori';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    })
});