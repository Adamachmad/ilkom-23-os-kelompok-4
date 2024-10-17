# Daemon Process di Laragon

## 1. Pengertian Daemon Process
Daemon process adalah program yang berjalan di latar belakang dan umumnya tidak memerlukan interaksi langsung dari pengguna. Di sistem operasi berbasis Unix/Linux, daemon sering dimulai saat booting dan tetap berjalan untuk menyediakan layanan sistem. Contoh dari daemon yang umum digunakan adalah **web server** (seperti Apache), **database server** (seperti MySQL), dan **task scheduler** (seperti cron).

Pada Windows, meskipun istilah "daemon" tidak sering digunakan, konsep yang sama berlaku untuk **services** yang berjalan di background tanpa interaksi langsung, seperti MySQL dan Apache di Laragon.

## 2. Laragon dan Daemon Process
Laragon adalah environment untuk mengelola local server yang digunakan dalam pengembangan web, biasanya untuk PHP, Node.js, Python, dan framework lainnya. Laragon memungkinkan beberapa service seperti **Apache**, **MySQL**, dan **Redis** untuk berjalan sebagai proses latar belakang (daemon), yang berguna dalam pengembangan aplikasi.

## 3. Siapkan Lingkungan Pengembangan
1. Unduh [Laragon](https://laragon.org/download) dari situs resmi.
2. Install Laragon dan pastikan server Apache dan MySQL berjalan.

## 4. Struktur File Website
Buatlah folder website anda sebagai berikut:

- C:laragon\www\website\index.php
- C:laragon\www\website\login.php
- C:laragon\www\website\logout.php
- C:laragon\www\website\daemon.php
- C:laragon\www\website\logins.txt (sebagai penyimpanan login sementara)

### a. File index.php
File ini akan menampilkan form login:

```php
<!-- index.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>
</head>
<body>
    <h2>Login</h2>
    <form action="login.php" method="POST">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>
        <br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <br>
        <input type="submit" value="Login">
    </form>
</body>
</html>

```

### b. File login.php
File ini akan memproses login:

```php
<!-- login.php -->
<?php
session_start();

// Simulasi data login
$valid_username = 'admin';
$valid_password = 'password123';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Cek kredensial
    if ($username === $valid_username && $password === $valid_password) {
        $_SESSION['loggedin'] = true;
        $_SESSION['username'] = $username;
        header('Location: daemon.php'); // Arahkan ke daemon.php setelah login sukses
    } else {
        echo "Username atau password salah!";
    }
}
?>

```
### c. File daemon.php
File ini akan berfungsi sebagai daemon yang berjalan di latar belakang.

```php
<!-- daemon.php -->
<?php
session_start();
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header('Location: index.php'); // Jika tidak login, kembali ke form login
    exit;
}

// Fungsi untuk menulis log
function writeLog($message) {
    file_put_contents('logins.txt', date('Y-m-d H:i:s') . " " . $message . PHP_EOL, FILE_APPEND);
}

// Daemon loop
while (true) {
    writeLog("User " . $_SESSION['username'] . " is logged in.");
    sleep(5); // Tidur selama 5 detik
}
?>

```

### d. File logout.php
File ini akan menangani logout.

```php
<!-- logout.php -->
<?php
session_start();
$_SESSION = [];
session_destroy();
header('Location: index.php'); // Arahkan kembali ke halaman login
exit;
?>

```

## 5. Menjalankan Program sebagai Daemon
Untuk menjalankan daemon.php sebagai daemon, lakukan langkah berikut:

### Menggunakan terminal
1. Buka terminal (command prompt) dan navigasikan ke folder proyek Anda:

```bash
cd C:\laragon\www\website

```

2. Jalankan daemon.php menggunakan PHP:

```bash
php -f daemon.php &

```

Dengan cara ini, daemon akan berjalan dibelakang

## 6. Pengujian
1. Buka browser dan kunjungi http://localhost/website/index.php.
2. Masukkan username admin dan password password123, lalu klik "Login".
3. Setelah berhasil login, daemon akan mulai menulis log ke logins.txt.
4. Untuk melihat log, buka logins.txt di folder proyek.

## 7. Menghentikan Daemon
Untuk menghentikan daemon yang berjalan temukan PID-nya dan gunakan perintah kill

### Temukan PID dengan perintah:
```bash
tasklist /FI "IMAGENAME eq php.exe"

```

### Setelah menemukan PID yang sesuai, gunakan perintah kill untuk menghentikan proses:
```bash
taskkill /PID <PID> /F

```
