# Gunakan image Ubuntu dengan Python
FROM python:3.9-slim

# Setel direktori kerja di dalam container
WORKDIR /app

# Salin file requirements.txt (jika ada) dan install dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Salin semua file aplikasi ke dalam container
COPY . .

# Expose port yang akan digunakan aplikasi
EXPOSE 8000

# Jalankan aplikasi dengan Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]


# Berikut adalah penjelasan rinci tentang kode **Dockerfile** yang telah Anda kerjakan:

#     ### **Dockerfile Kode**:
    
#     ```dockerfile
#     # Gunakan image Ubuntu dengan Python
#     FROM python:3.9-slim
    
#     # Setel direktori kerja di dalam container
#     WORKDIR /app
    
#     # Salin file requirements.txt (jika ada) dan install dependencies
#     COPY requirements.txt ./
#     RUN pip install --no-cache-dir -r requirements.txt
    
#     # Salin semua file aplikasi ke dalam container
#     COPY . .
    
#     # Expose port yang akan digunakan aplikasi
#     EXPOSE 8000
    
#     # Jalankan aplikasi dengan Uvicorn
#     CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
#     ```
    
#     ### **Penjelasan Kode Dockerfile**:
    
#     1. **`FROM python:3.9-slim`**:
#        - Perintah ini menentukan image dasar yang akan digunakan untuk membangun container. Dalam hal ini, Anda menggunakan image **Python 3.9 versi slim**, yang merupakan versi ringan dari image Python, cocok untuk membuat container yang lebih kecil dan lebih cepat.
#        - Docker akan mendownload image ini jika belum tersedia di mesin Anda.
    
#     2. **`WORKDIR /app`**:
#        - **WORKDIR** menetapkan direktori kerja di dalam container. Semua perintah berikutnya (seperti **COPY** dan **RUN**) akan dijalankan dalam direktori ini.
#        - Ini memastikan bahwa semua file dan perintah diatur di lokasi yang konsisten di dalam container.
    
#     3. **`COPY requirements.txt ./`**:
#        - Perintah ini menyalin file `requirements.txt` dari direktori proyek lokal Anda (di host) ke dalam container di dalam direktori kerja `/app`.
#        - **requirements.txt** berisi daftar dependensi yang dibutuhkan oleh aplikasi Anda.
    
#     4. **`RUN pip install --no-cache-dir -r requirements.txt`**:
#        - **RUN** adalah perintah yang digunakan untuk mengeksekusi perintah di dalam image saat membangunnya. Pada baris ini, perintah digunakan untuk menginstal dependensi Python yang terdaftar di file `requirements.txt`.
#        - Opsi **--no-cache-dir** digunakan untuk memastikan bahwa pip tidak menyimpan cache dari paket yang diinstal, sehingga ukuran image tetap kecil.
    
#     5. **`COPY . .`**:
#        - Perintah ini menyalin semua file dari direktori proyek di host ke dalam direktori kerja di container (`/app`).
#        - Ini termasuk semua file aplikasi yang diperlukan untuk menjalankan FastAPI.
    
#     6. **`EXPOSE 8000`**:
#        - Perintah **EXPOSE** memberitahu Docker bahwa container akan mendengarkan koneksi pada port **8000**. Ini adalah port standar yang digunakan oleh FastAPI ketika dijalankan dengan Uvicorn.
#        - Namun, **EXPOSE** tidak membuka port secara langsung di host. Anda perlu memetakannya saat menjalankan container dengan menggunakan opsi `-p`, seperti yang Anda lakukan di perintah `docker run -p`.
    
#     7. **`CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`**:
#        - **CMD** digunakan untuk menentukan perintah default yang akan dijalankan ketika container dijalankan. Dalam hal ini, Anda menjalankan server FastAPI menggunakan Uvicorn, server ASGI yang mendukung FastAPI.
#        - **"uvicorn main:app"** menginstruksikan Uvicorn untuk menjalankan aplikasi FastAPI yang didefinisikan di file `main.py` dan di dalam objek `app`.
#        - **"--host 0.0.0.0"** memungkinkan container untuk menerima koneksi dari semua alamat IP, bukan hanya dari localhost di dalam container. Ini penting agar aplikasi dapat diakses dari luar container.
#        - **"--port 8000"** menentukan port di mana aplikasi akan berjalan di dalam container.
    
#     ### **Alur Kerja Dockerfile**:
#     1. **Base Image**: Dockerfile menggunakan image dasar **Python 3.9-slim**.
#     2. **Setup Work Directory**: Direktori kerja di dalam container disetel ke `/app`.
#     3. **Install Dependencies**: File `requirements.txt` disalin dan dependensi Python diinstal menggunakan pip.
#     4. **Copy Application Files**: Semua file aplikasi disalin ke dalam container.
#     5. **Expose Port**: Port **8000** diekspos untuk akses jaringan dari luar.
#     6. **Run Application**: Uvicorn dijalankan untuk memulai aplikasi FastAPI, mendengarkan pada port **8000**.
    
#     ### **Ringkasan:**
#     - Dockerfile ini digunakan untuk membangun container yang menjalankan aplikasi **FastAPI** di dalam server **Uvicorn**.
#     - **Base image** yang digunakan adalah **Python 3.9-slim** untuk menjaga image tetap ringan.
#     - Anda telah menggunakan **multi-stage build** untuk memastikan aplikasi dan dependensinya terinstal dengan benar dan dijalankan dengan command yang ditentukan.
#     - Port **8000** dibuka untuk memungkinkan akses ke aplikasi dari luar container.
    