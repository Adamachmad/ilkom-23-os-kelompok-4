# getting started
use uvicorn for running Order services

```bash
uvicorn order1:app --reload --port 7080
uvicorn order2:app --reload --port 7081
uvicorn order3:app --reload --port 7082
```



# how to run docker compose
Menjalankan Docker Compose:
Bangun dan jalankan semua layanan:

docker-compose up --build

# Pengujian
1. Tambahkan data ke Sinatra Service:
curl -X POST http://localhost:4567/users -H "Content-Type: application/json" -d '{"name": "Alice", "email": "alice@example.com"}'

2. Ambil data dari FastAPI Service:
curl http://localhost:8000/order/1

Dengan pengaturan ini, FastAPI Service dapat melakukan permintaan HTTP ke Sinatra Service untuk mengambil data pengguna berdasarkan ID dan mengembalikannya sebagai bagian dari detail pesanan.

# Perubahan kode 
gunakan command ini setiap ada perubahan kode

```bash
docker-compose up --build
```

Ini akan membangun ulang image dari Dockerfile yang ada dan menjalankan container lagi. Perintah ini memastikan bahwa perubahan dalam kode atau konfigurasi akan diambil ketika membangun ulang image.


Jika hanya merubah konfigurasi, gunakan command berikut:

```bash
docker-compose restart
```

Gunakan docker-compose restart jika hanya ada perubahan kecil (misalnya, file konfigurasi atau non-kode):
Ini akan memulai ulang container tanpa membangun ulang image, cocok jika perubahanmu tidak mempengaruhi Dockerfile atau build process.


## jika menggunakan volume

Jika ada volume yang digunakan untuk sinkronisasi kode dengan container, hanya lakukan restart:

Jika volume diatur sedemikian rupa sehingga perubahan kode langsung terlihat oleh container (misalnya dengan menggunakan volume untuk mounting folder dari host ke container), kamu hanya perlu menjalankan perintah restart:

```bash
docker-compose restart
```