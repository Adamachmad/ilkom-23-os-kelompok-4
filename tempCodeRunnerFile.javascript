const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Menampilkan HTML dari server.js
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Tambah Jadwal</title>
        </head>
        <body>
            <h1>Tambah Jadwal Baru</h1>
            <form action="/add-schedule" method="POST">
                <label>Mata Kuliah:</label>
                <input type="text" name="subject" required><br>
                <label>Waktu (HH:MM):</label>
                <input type="time" name="time" required><br>
                <button type="submit">Tambahkan Jadwal</button>
            </form>
        </body>
        </html>
    `);
});

app.post('/add-schedule', (req, res) => {
    const subject = req.body.subject;
    const time = req.body.time;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: 'your-email@gmail.com', pass: 'your-password' }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'recipient-email@gmail.com',
        subject: Pengingat Jadwal: ${subject},
        text: Jangan lupa, jadwal ${subject} dimulai pada pukul ${time}.
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.send('Jadwal berhasil ditambahkan, email terkirim!');
    });
});

// Menjalankan server di port 3000
app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});