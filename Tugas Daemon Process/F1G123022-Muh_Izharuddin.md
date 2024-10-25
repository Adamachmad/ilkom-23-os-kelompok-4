#cara menggunakan daemon process dengan PHP native dan NSSM:


Pemantauan Pengguna Aktif di Aplikasi Menggunakan Daemon Process dengan NSSM dan Laragon

# 1. Pendahuluan
Proyek ini bertujuan untuk memantau pengguna aktif di aplikasi web. Pengguna aktif didefinisikan sebagai pengguna yang mengakses aplikasi dalam jangka waktu tertentu (misalnya, 10 menit terakhir). Setiap 5 menit, daemon akan memeriksa aktivitas pengguna di database, menghitung jumlah pengguna yang aktif, dan mencatatnya dalam log.

Daemon process ini akan berjalan di latar belakang secara otomatis menggunakan **NSSM** dan dijalankan melalui PHP. Laporan jumlah pengguna aktif ini dapat digunakan untuk memantau aktivitas aplikasi secara real-time.

# 2. Persiapan
Sebelum memulai, pastikan Laragon dan PHP telah terinstal sebagai server lokal, dan NSSM sudah diinstal untuk mengelola daemon di Windows.

#Langkah-langkah persiapan:
1. Unduh NSSM dari situs resmi dan ekstrak ke direktori yang mudah diakses (misalnya `C:\nssm-2.24\win64`).
2. Pastikan PHP dan Laragon terpasang serta berjalan sebagai server lokal.

# 3. Struktur Proyek
Struktur folder proyek adalah sebagai berikut:

```plaintext
C:\laragon\www\user-activity-monitor
├── daemon.php
├── index.php
├── log.txt
├── config.php
└── db.sql (file untuk inisialisasi database)
```

# 4. Membuat Sistem Pemantauan Pengguna Aktif

4.1. File Konfigurasi
File: `config.php`

```php
<?php
// Database connection settings
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'user_activity');
define('LOG_FILE', __DIR__ . '/log.txt');

// Connect to the database
function connect_db() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    return $conn;
}
?>
```

4.2. Inisialisasi Database
Buat file SQL untuk inisialisasi tabel yang menyimpan data aktivitas pengguna.

File: `db.sql`

```sql
CREATE DATABASE IF NOT EXISTS user_activity;

USE user_activity;

CREATE TABLE IF NOT EXISTS user_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    activity_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

4.3. Tampilan Website
File: `index.php`

```php
<?php
require 'config.php';

function getActiveUsers() {
    $conn = connect_db();
    $tenMinutesAgo = date('Y-m-d H:i:s', time() - 600); // 10 menit yang lalu
    $sql = "SELECT COUNT(DISTINCT user_id) AS active_users FROM user_logs WHERE activity_time > '$tenMinutesAgo'";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    return $row['active_users'];
}

$activeUsers = getActiveUsers();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Activity Monitor</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background: #f5f5f5;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .active-users {
            background: #f8f8f8;
            padding: 15px;
            border-radius: 4px;
            margin-top: 20px;
            font-family: monospace;
            font-size: 24px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>User Activity Monitor</h1>
        <h2>Pengguna Aktif dalam 10 Menit Terakhir</h2>
        <div class="active-users">
            <?php echo $activeUsers; ?> pengguna aktif
        </div>
    </div>
</body>
</html>
```

4.4. Daemon Process
File: `daemon.php`

```php
<?php
require 'config.php';

class UserActivityMonitor {
    public function logActiveUsers() {
        $conn = connect_db();
        $tenMinutesAgo = date('Y-m-d H:i:s', time() - 600); // 10 menit yang lalu
        $sql = "SELECT COUNT(DISTINCT user_id) AS active_users FROM user_logs WHERE activity_time > '$tenMinutesAgo'";
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();
        $activeUsers = $row['active_users'];

        $timestamp = date('Y-m-d H:i:s');
        $logMessage = "[$timestamp] Pengguna aktif: $activeUsers\n";
        file_put_contents(LOG_FILE, $logMessage, FILE_APPEND);
    }

    public function start() {
        while (true) {
            $this->logActiveUsers();
            sleep(300); // Cek setiap 5 menit
        }
    }
}

$monitor = new UserActivityMonitor();
$monitor->start();
?>
```

# 5. Menjalankan Daemon Process Menggunakan NSSM

5.1. Instalasi NSSM
1. Buka Command Prompt sebagai Administrator.
2. Jalankan perintah berikut untuk menginstal daemon process sebagai service di Windows:

```bash
C:\nssm-2.24\win64\nssm.exe install UserActivityMonitor
```

5.2. Konfigurasi Service
Isi jendela konfigurasi yang muncul sebagai berikut:
- **Path**: Lokasi executable PHP (misalnya `C:\laragon\bin\php\php-8.1.10-Win32-vs16-x64\php.exe`).
- **Startup Directory**: Lokasi direktori proyek (misalnya `C:\laragon\www\user-activity-monitor`).
- **Arguments**: Nama file daemon (`daemon.php`).

5.3. Menjalankan dan Menghentikan Daemon
- Untuk menjalankan daemon, gunakan perintah:
  ```bash
  C:\nssm-2.24\win64\nssm.exe start UserActivityMonitor
  ```

- Untuk menghentikan daemon, gunakan perintah:
  ```bash
  C:\nssm-2.24\win64\nssm.exe stop UserActivityMonitor
  ```

# 6. Memantau Perubahan dan Log
Setiap 5 menit, daemon akan menghitung jumlah pengguna aktif dalam 10 menit terakhir dan mencatatnya di `log.txt`. Anda dapat melihat log tersebut di halaman website `index.php`.

# 7. Bukti Screenshoot Program Berhasil Berjalan
- **Tampilan Website**: Menampilkan jumlah pengguna aktif dalam 10 menit terakhir.
- ![Deskripsi Gambar]([https://drive.google.com/uc?export=view&id=FILE_ID](https://drive.google.com/file/d/16uVFWi4U02970iOiXcKaVCpvg0CDYamR/view?usp=drive_link))

- **Log Perubahan**: Berisi catatan jumlah pengguna aktif setiap 5 menit.
![Deskripsi Gambar]([https://drive.google.com/uc?export=view&id=FILE_ID](https://drive.google.com/file/d/1qKcLeiWJPdWjGspM9NxzbIRs78abBJtE/view?usp=drive_link))

# 8. Penutup
Dengan daemon process ini, sistem pemantauan pengguna aktif dapat berjalan otomatis tanpa perlu pengawasan manual. **NSSM** memastikan daemon terus berjalan di latar belakang, dan jika terjadi masalah, daemon dapat di-restart dengan mudah.

---
