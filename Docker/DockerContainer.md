Berikut penjelasan mengenai **Docker Container** dengan contoh konkret menggunakan **Nginx**:

---

## Pengertian Docker Container

**Docker Container** adalah unit perangkat lunak yang terisolasi yang mencakup semua yang dibutuhkan untuk menjalankan suatu aplikasi, seperti kode, dependensi, pustaka, dan pengaturan lingkungan. Dengan Docker Container, aplikasi dapat berjalan secara konsisten di berbagai lingkungan seperti pengembangan, pengujian, dan produksi.

Docker menggunakan teknologi **virtualisasi tingkat sistem operasi** sehingga lebih ringan dibandingkan dengan mesin virtual (VM). Setiap container berbagi kernel OS yang sama namun berjalan secara terisolasi satu sama lain.

---

## Fungsi Docker Container

1. **Isolasi Aplikasi**  
   Mengisolasi aplikasi beserta dependensinya agar tidak terjadi konflik antar aplikasi yang berjalan di sistem yang sama.

2. **Portabilitas**  
   Container dapat dijalankan di berbagai platform seperti pengembangan lokal, server, atau cloud tanpa konfigurasi ulang.

3. **Efisiensi Sumber Daya**  
   Karena container berbagi kernel OS, container lebih ringan dibandingkan VM sehingga penggunaan sumber daya lebih efisien.

4. **Pengelolaan Aplikasi yang Mudah**  
   Pengembang dapat dengan cepat membuat, menjalankan, menghentikan, atau menghapus container.

5. **Penyebaran Cepat**  
   Aplikasi dalam container dapat dipindahkan dari pengembangan ke produksi dengan cepat dan tanpa hambatan.

---

## Perintah Docker Run dan Penjelasannya

### Perintah untuk Menjalankan Container Nginx

```bash
docker run -d -p 8080:80 nginx
```

### Penjelasan Perintah

1. **`docker run`**  
   Perintah untuk membuat dan menjalankan container dari image yang disebutkan.

2. **`-d`**  
   Menjalankan container di **mode detached** (latar belakang), sehingga terminal tetap bisa digunakan untuk perintah lain.

3. **`-p 8080:80`**  
   Memetakan port 80 di container ke port 8080 di host, sehingga saat mengakses `http://localhost:8080`, sebenarnya kita mengakses port 80 di container Nginx.  
   - **8080**: Port di host (komputer lokal).  
   - **80**: Port di dalam container yang digunakan Nginx.

4. **`nginx`**  
   Nama image yang digunakan untuk membuat container.

---

## Contoh Langkah Lengkap Menjalankan Nginx di Docker

1. **Tarik Image Nginx** (jika belum ada di lokal):

   ```bash
   docker pull nginx
   ```

2. **Jalankan Container Nginx**:

   ```bash
   docker run -d -p 8080:80 nginx
   ```

3. **Periksa Container yang Berjalan**:

   ```bash
   docker ps
   ```

   Output akan menampilkan container yang berjalan, misalnya:

   ```
   CONTAINER ID   IMAGE    COMMAND                  PORTS                  NAMES
   123456789abc   nginx    "/docker-entrypoint.…"   0.0.0.0:8080->80/tcp   eager_curie
   ```

4. **Akses Aplikasi**:  
   Buka browser dan akses `http://localhost:8080`. Anda akan melihat halaman default Nginx.

---

## Kesimpulan

**Docker Container** memungkinkan aplikasi dan dependensinya dijalankan secara konsisten di berbagai lingkungan. Dengan fungsi seperti isolasi, portabilitas, dan efisiensi sumber daya, Docker mempermudah pengelolaan aplikasi. Perintah **`docker run -d -p 8080:80 nginx`** memungkinkan menjalankan Nginx di container dengan port yang dipetakan, memberikan fleksibilitas dalam penyebaran layanan web.