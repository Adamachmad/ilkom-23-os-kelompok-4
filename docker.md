# Docker Documentation
Docker adalah platform yang memungkinkan pengembangan, deployment, dan eksekusi aplikasi di dalam container. Tugas ini bertujuan untuk memahami dasar penggunaan Docker melalui eksperimen praktis.

## 1. Instalasi Docker
- Mengunduh [Docker Desktop](https://www.docker.com/products/docker-desktop/) dari situs resmi.
- Setelah mengunduh *Docker Desktop* jalankan *Docker Desktop* pada komputer anda

## 2. Inisiasi Docker Image
Untuk memulai dengan Docker, langkah pertama adalah inisiasi image. Berikut langkah-langkahnya:
1. Buat sebuah folder untuk menyimpan file Dockerfile dan file index.
2. Di dalam folder tersebut buat *Dockerfile*
3. Masukan perintah berikut ke dalam file *Dockerfile*
dockerfile
# Gunakan base image PHP 8.2 dengan server built-in
FROM php:8.2-apache

# Salin file index.php ke dalam direktori root web server
COPY . /var/www/html/

# Atur permission untuk memastikan file dapat diakses
RUN chown -R www-data:www-data /var/www/html/

# Expose port 80 untuk Apache
EXPOSE 80

# Jalankan Apache di container
CMD ["apache2-foreground"]

4. Buat satu folder lagi yang bernama php, lalu buat file *index.php* ke dalam folder php.
5. Masukkan syntax php ke dalam file tersebut, contohnya:
php
<?php
echo "Hello, World!";
?>

6. Lakukan perintah berikut untuk membuat *Docker Image*
bash
docker build -t (nama image yang ingin dibuat) .

Berikut contoh gambarnya:
![Deskripsi Gambar](https://drive.google.com/uc?id=1jkGYsoyvSPQHLtcx-OKJ8eKHM6dCeDJk)

## 3. Menjalankan Container
Setelah membuat *Docker Image* selanjutnya adalah untuk menjalankan container
1. Jalankan command prompt
bash
docker run -d -p 8080:80 (nama image)

Berikut contoh gambarnya:
![Deskripsi Gambar](https://drive.google.com/uc?id=1a6UNfJKE_uUtNyJA3p7cMGM2oPLRRUiV)

## 4. Memeriksa Jika Container Sudah Berjalan
1. Pada *Docker Desktop*  masuk ke tab *Container*
2. Jika sudah berjalan icon kolom action akan berbentuk kotak
![Deskripsi Gambar](https://drive.google.com/uc?id=16KOc0LzTQCY8wid7BFMEkKLwwtJfsKqU)

## 5. Jika Sudah Berjalan Kunjungi Port Sesuai Dengan Container Yang ada
Jika website berhasil terbuka, container berjalan tanpa error
![Deskripsi Gambar](https://drive.google.com/uc?id=1c8jiIFwTWtHr7fI012quc-YXO1Fw4ke3)