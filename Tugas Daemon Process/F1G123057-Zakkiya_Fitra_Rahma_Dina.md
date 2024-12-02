# Melakukan Daemon process dilaragon

## 1. Struktur File Website
Buatlah folder website anda sebagai berikut:

- C:laragon\www\TugasDaemonOS\index.php
- C:laragon\www\TugasDaemonOS\log_daemon.php
- C:laragon\www\TugasDaemonOS\order.php

### a. File index.php

```php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Barang</title>
</head>
<body>
    <h1>Form Pemesanan Barang</h1>
    <form action="order.php" method="post">
        <label for="nama">Nama:</label>
        <input type="text" id="nama" name="nama" required><br><br>
        
        <label for="barang">Nama Barang:</label>
        <input type="text" id="barang" name="barang" required><br><br>

        <label for="jumlah">Jumlah:</label>
        <input type="number" id="jumlah" name="jumlah" required><br><br>

        <button type="submit">Pesan</button>
    </form>
</body>
</html>


```

### b. File log_daemon.php

```php
<?php
$queueFile = "orders_queue.txt";
$logFile = "log.txt";

// Daemon berjalan terus menerus
while (true) {
    clearstatcache();  // Bersihkan cache file status
    
    // Cek apakah ada file antrian
    if (file_exists($queueFile) && filesize($queueFile) > 0) {
        // Ambil semua antrian
        $orders = file($queueFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        
        // Proses setiap antrian
        foreach ($orders as $order) {
            // Tambahkan ke log
            file_put_contents($logFile, $order . "\n", FILE_APPEND);
        }

        // Kosongkan antrian setelah diproses
        file_put_contents($queueFile, "");
    }

    // Tunggu 5 detik sebelum memeriksa lagi
    sleep(5);
}
?>

```
### c. File order.php

```php
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nama = htmlspecialchars($_POST['nama']);
    $barang = htmlspecialchars($_POST['barang']);
    $jumlah = intval($_POST['jumlah']);

    // Simpan ke file antrian (orders_queue.txt)
    $order = "Nama: $nama, Barang: $barang, Jumlah: $jumlah, Waktu: " . date('Y-m-d H:i:s') . "\n";
    file_put_contents("orders_queue.txt", $order, FILE_APPEND);

    echo "Terima kasih, $nama! Pesanan Anda telah dimasukkan ke dalam antrian.";
}
?>

```