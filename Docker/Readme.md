
Berikut adalah langkah-langkah untuk menjalankan Docker di WSL dengan PHP:

---

#Cara Menjalankan Docker di WSL
### Persiapan
1. Pastikan PC terhubung ke internet.
2. Pastikan Ubuntu, WSL, dan Docker sudah terinstal.
   - Untuk WSL, jalankan perintah berikut di CMD atau PowerShell:
     ```bash
     wsl --install
     ```
   - Untuk Docker, instal [Docker Desktop](https://www.docker.com/products/docker-desktop) dan pastikan **WSL Integration** diaktifkan pada pengaturan Docker Desktop (`Settings > Resources > WSL Integration`).

#### Langkah-Langkah
1. Buka WSL:
   - Di CMD atau PowerShell, jalankan perintah:
     wsl
     ```
     Anda akan masuk ke terminal Ubuntu.

2. Masuk ke direktori home:
   - Jalankan:
     cd
     ```

3. Buat direktori baru untuk proyek:
   - Gunakan perintah:
     mkdir FolderBaru
     ```
     Ganti `FolderBaru` dengan nama direktori yang diinginkan.

4. Masuk ke direktori yang baru dibuat:
   - Jalankan:
     cd FolderBaru
     ```

5. Buat file Dockerfile:
   - Gunakan salah satu dari perintah berikut:
     - Dengan `touch`:
       touch Dockerfile
       ```
     - Dengan `nano` (untuk langsung mengedit):
       nano Dockerfile
       ```

6. Masukkan isi Dockerfile:
   - Jika menggunakan `nano`, tambahkan baris berikut:
     ```dockerfile
     FROM php:8.1-apache
     COPY . /var/www/html
     EXPOSE 80
     ```
   - Tekan `CTRL + O` untuk menyimpan, lalu `CTRL + X` untuk keluar.

7. Periksa isi Dockerfile:
   - Gunakan perintah:
     cat Dockerfile
     ```

8. Buat file PHP baru:
   - Jalankan:
     touch index.php
     ```

9. Edit file `index.php`:
   - Gunakan `nano` untuk menambahkan kode PHP:
     nano index.php
     ```
   - Tambahkan isi berikut:
     ```php
     <?php
     echo "Hello, World from PHP running in Docker!";
     ?>
     ```
   - Simpan dengan `CTRL + O` dan keluar dengan `CTRL + X`.

10. Bangun Docker image:
    - Jalankan perintah:
      docker build -t hello-world .
      ```
    - Tunggu hingga proses selesai.

11. Jalankan container:
    - Gunakan perintah berikut untuk menjalankan aplikasi di port 8080:
      docker run -d -p 8080:80 --name php-container hello-world
      ```

12. Akses aplikasi di browser:
    - Buka browser Anda dan kunjungi:
      ```
      http://localhost:8080
      ```

---

### Catatan Tambahan
- Periksa container yang sedang berjalan:
  docker ps
  ```
- Menghentikan container:
  docker stop php-container
  ```
- Menghapus container:
  docker rm php-container
  ```