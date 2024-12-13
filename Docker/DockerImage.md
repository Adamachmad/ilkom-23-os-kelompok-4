## Docker Images dan Fungsi Utamanya

**Docker Images** adalah paket yang berisi file sistem, kode aplikasi, dependensi, dan konfigurasi yang diperlukan untuk menjalankan aplikasi dalam container. Image bersifat statis dan hanya dapat diubah dengan membuat versi baru. Ketika dijalankan, image menjadi container yang bersifat dinamis.

### Fungsi Utama Docker Images

1. **Template untuk Membuat Container**: Docker Images menjadi dasar untuk membuat container yang menjalankan aplikasi dalam lingkungan terisolasi.
2. **Portabilitas**: Mengemas aplikasi dan dependensinya agar dapat berjalan di berbagai platform tanpa masalah kompatibilitas.
3. **Reusabilitas**: Layer-layer dalam image dapat digunakan kembali untuk menghemat ruang penyimpanan dan mempercepat build.
4. **Versi dan Distribusi**: Image dapat diberi tag (misalnya `v1.0`, `latest`) untuk melacak perubahan dan distribusi.
5. **Otomatisasi dan Reproducibility**: Memastikan lingkungan yang konsisten di pengembangan, pengujian, dan produksi.
6. **Isolasi Aplikasi**: Menjalankan aplikasi tanpa dipengaruhi oleh konfigurasi sistem host.
7. **Mendukung CI/CD**: Mempermudah pipeline otomatis untuk pengujian dan deployment.
8. **Skalabilitas**: Mudah melakukan scaling aplikasi berbasis microservices.

---

## Membuat Docker Image Menggunakan Nginx

### Langkah 1: Buat `Dockerfile`

Buat file bernama `Dockerfile` dengan isi sebagai berikut:

```Dockerfile
# Menggunakan image resmi Nginx sebagai base image
FROM nginx:latest

# Menyalin file HTML ke direktori Nginx
COPY ./index.html /usr/share/nginx/html/
```

Penjelasan:
- **`FROM nginx:latest`**: Menggunakan image `nginx` versi terbaru sebagai base image.
- **`COPY ./index.html /usr/share/nginx/html/`**: Menyalin file `index.html` dari direktori lokal ke direktori default Nginx untuk halaman web.

### Langkah 2: Buat File `index.html`

Buat file `index.html` sederhana di direktori yang sama:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Contoh Nginx Docker</title>
</head>
<body>
    <h1>Hello, Nginx dalam Docker!</h1>
</body>
</html>
```

### Langkah 3: Build Docker Image

Gunakan perintah berikut untuk membangun Docker Image:

```bash
docker build -t nginx-server .
```

Penjelasan perintah:
1. **`docker build`**: Perintah untuk membangun Docker Image.
2. **`-t nginx-server`**: Memberi tag (nama) pada image, dalam hal ini `nginx-server`.
3. **`.`**: Menunjukkan bahwa `Dockerfile` berada di direktori saat ini.

### Langkah 4: Menjalankan Container

Setelah image dibuat, jalankan container dengan perintah:

```bash
docker run -d -p 8080:80 nginx-server
```

Penjelasan:
- **`-d`**: Menjalankan container dalam mode background (detached).
- **`-p 8080:80`**: Mengarahkan port 8080 di host ke port 80 di container.
- **`nginx-server`**: Nama image yang dibuat.

### Langkah 5: Periksa Hasilnya

Buka browser dan akses `http://localhost:8080`. Anda akan melihat halaman `index.html` yang telah Anda buat.

### Langkah 6: Periksa Daftar Docker Images

Gunakan perintah berikut untuk melihat daftar image yang ada di sistem:

```bash
docker images
```

Penjelasan output:
- **REPOSITORY**: Nama image (misalnya `nginx-server`).
- **TAG**: Versi atau tag image (misalnya `latest`).
- **IMAGE ID**: ID unik dari image.
- **CREATED**: Waktu pembuatan image.
- **SIZE**: Ukuran image.

---

Dengan langkah-langkah di atas, Anda berhasil membuat Docker Image menggunakan Nginx dan menjalankannya sebagai container.