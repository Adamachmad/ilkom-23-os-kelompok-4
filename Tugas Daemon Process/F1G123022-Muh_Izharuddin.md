Berikut adalah studi kasus dan laporan proyek lain yang menggunakan daemon proses dengan PHP native dan NSSM. Studi kasus ini adalah tentang pemantauan stok produk di sebuah toko online dan mencatat setiap perubahan stok ke dalam log.

---

# Pemantauan Stok Produk Menggunakan Daemon Process dengan NSSM dan Laragon

## 1. Pendahuluan
Proyek ini bertujuan untuk memantau perubahan stok produk di toko online dan mencatat setiap perubahan ke dalam log menggunakan daemon process. Daemon ini akan berjalan di latar belakang dan memonitor file stok produk. Agar daemon tetap aktif meskipun terminal ditutup, kita akan menggunakan NSSM (Non-Sucking Service Manager) sebagai manajer layanan untuk menjalankan daemon process secara otomatis.

## 2. Persiapan
Pastikan Laragon telah diinstal sebagai lingkungan pengembangan lokal dan NSSM sebagai alat untuk mengelola daemon di Windows.

### Langkah-langkah persiapan:
1. **Unduh NSSM** dari situs resmi dan ekstrak ke direktori yang mudah diakses (misalnya `C:\nssm-2.24\win64`).
2. Pastikan PHP dan Laragon terpasang dan dapat digunakan sebagai server lokal.

## 3. Struktur Proyek
Struktur folder proyek adalah sebagai berikut:

```plaintext
C:\laragon\www\inventory-monitor
├── daemon.php
├── index.php
├── log.txt
├── config.php
└── products.csv (file yang berisi data stok produk)
```

## 4. Membuat Website Pemantauan Stok Produk

### 4.1. File Konfigurasi
**File**: `config.php`

```php
<?php
define('PRODUCT_FILE', __DIR__ . '/products.csv'); // File yang berisi data stok
define('LOG_FILE', __DIR__ . '/log.txt'); // File log
?>
```

# 4.2. Tampilan Website
File: `index.php`

```php
<?php
require 'config.php';

function readLog() {
    return file_exists(LOG_FILE) ? file_get_contents(LOG_FILE) : 'Log is empty.';
}

$logContent = readLog();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inventory Monitor</title>
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
        .logs {
            background: #f8f8f8;
            padding: 15px;
            border-radius: 4px;
            margin-top: 20px;
            font-family: monospace;
            white-space: pre-wrap;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Inventory Monitor</h1>
        <h2>Log Perubahan Stok Produk</h2>
        <div class="logs">
            <?php echo htmlspecialchars($logContent); ?>
        </div>
    </div>
</body>
</html>
```

# 4.3. Daemon Process
File: `daemon.php`

```php
<?php
require 'config.php';

class StockMonitor {
    private $lastState = [];

    public function __construct() {
        if (!file_exists(LOG_FILE)) {
            file_put_contents(LOG_FILE, "Log file created.\n");
        }
        $this->lastState = $this->readStockData();
    }

    public function readStockData() {
        $data = [];
        if (($handle = fopen(PRODUCT_FILE, "r")) !== FALSE) {
            while (($line = fgetcsv($handle)) !== FALSE) {
                $data[$line[0]] = $line[1]; // ID Produk => Stok
            }
            fclose($handle);
        }
        return $data;
    }

    public function logChange($message) {
        $timestamp = date('Y-m-d H:i:s');
        file_put_contents(LOG_FILE, "[$timestamp] $message\n", FILE_APPEND);
    }

    public function start() {
        while (true) {
            $currentState = $this->readStockData();
            foreach ($currentState as $productId => $stock) {
                if (isset($this->lastState[$productId])) {
                    if ($stock != $this->lastState[$productId]) {
                        $this->logChange("Stock changed for Product ID $productId: Old Stock = {$this->lastState[$productId]}, New Stock = $stock");
                    }
                } else {
                    $this->logChange("New Product added: Product ID $productId, Stock = $stock");
                }
            }

            foreach ($this->lastState as $productId => $stock) {
                if (!isset($currentState[$productId])) {
                    $this->logChange("Product removed: Product ID $productId");
                }
            }

            $this->lastState = $currentState;
            sleep(5); // Cek setiap 5 detik
        }
    }
}

$stockMonitor = new StockMonitor();
$stockMonitor->start();
?>
```

# 5. Menjalankan Daemon Process Menggunakan NSSM

# 5.1. Instalasi NSSM
1. **Download dan Ekstrak NSSM** dari situs resmi.
2. **Buka Command Prompt sebagai Administrator**.
3. Jalankan perintah berikut untuk menginstal daemon process sebagai service di Windows:

```bash
C:\nssm-2.24\win64\nssm.exe install StockMonitor
```

# 5.2. Konfigurasi Service
Isi jendela konfigurasi yang muncul sebagai berikut:
- **Path**: Lokasi executable PHP (misalnya `C:\laragon\bin\php\php-8.1.10-Win32-vs16-x64\php.exe`).
- **Startup Directory**: Lokasi direktori proyek (misalnya `C:\laragon\www\inventory-monitor`).
- **Arguments**: Nama file daemon (`daemon.php`).

# 5.3. Menjalankan dan Menghentikan Daemon
- Untuk menjalankan daemon, gunakan perintah:
  ```bash
  C:\nssm-2.24\win64\nssm.exe start StockMonitor
  ```

- Untuk menghentikan daemon, gunakan perintah:
  ```bash
  C:\nssm-2.24\win64\nssm.exe stop StockMonitor
  ```

# 6. Memantau Perubahan dan Log
Setiap kali ada perubahan stok pada file `products.csv`, daemon akan mencatat perubahan tersebut di `log.txt`. Untuk melihat hasilnya, buka `index.php` di browser dan lihat perubahan stok yang tercatat di log.

# 7. Bukti Screenshoot Program Berhasil Berjalan
- **Tampilan Website**: Menampilkan log perubahan stok produk.
- **Log Perubahan**: Berisi catatan perubahan stok produk di `products.csv`.

# 8. Penutup
Dengan konfigurasi ini, daemon process akan berjalan otomatis tanpa perlu dijalankan secara manual. NSSM akan memastikan daemon terus berjalan di latar belakang, dan jika terjadi masalah, daemon dapat di-restart dengan mudah.

---

