## Pengertian Dockerfile
Dockerfile merupakan skrip otomatisasi yang menyediakan perintah-perintah untuk membangun sebuah Docker Image, yang merupakan blueprint dari aplikasi yang mencakup semua kebutuhan seperti kode sumber, library, dependensi, dan konfigurasi runtime. Saat dieksekusi, Dockerfile akan membuat image yang kemudian dapat dijalankan dalam container Docker.

## Kelebihan Dockerfile
Portabilitas: Dockerfile membuat aplikasi dapat dijalankan di berbagai sistem tanpa khawatir masalah kompatibilitas, karena semuanya dibungkus dalam container.
Otomatisasi: Dockerfile menyederhanakan pembuatan dan konfigurasi container secara otomatis.
Efisiensi: Dockerfile menyimpan layer atau lapisan dalam bentuk cache, memungkinkan proses build yang lebih cepat karena layer yang sudah ada tidak perlu dibangun ulang.
Konsistensi: Dengan Dockerfile, lingkungan aplikasi tetap konsisten dari mulai development hingga deployment, mengurangi kesalahan konfigurasi.
Versi Image: Dockerfile mendukung tagging versi image untuk mengidentifikasi versi tertentu dari aplikasi, membuatnya mudah dikelola.

## Kekurangan Dockerfile
Kompleksitas Konfigurasi: Menulis Dockerfile untuk aplikasi kompleks bisa menjadi sulit, terutama untuk memastikan efisiensi dan menghindari konfigurasi yang berlebihan.
Overhead Waktu Build: Proses build bisa memakan waktu lama jika Dockerfile kurang dioptimalkan atau memiliki terlalu banyak layer.
Keamanan: Menyertakan banyak aplikasi atau dependensi di dalam Dockerfile meningkatkan potensi kerentanan jika tidak dilakukan pembaruan secara berkala.
Masalah Debugging: Debugging pada container bisa jadi sulit, terutama jika aplikasi yang berjalan tidak menyediakan output yang jelas tentang kesalahan.

## Fitur Utama Dockerfile
Layering: Dockerfile memungkinkan aplikasi disusun dalam beberapa layer (lapisan), di mana setiap instruksi dalam Dockerfile akan membuat layer tersendiri.
Caching: Dockerfile mendukung caching pada setiap layer, sehingga instruksi yang tidak berubah tidak perlu dibangun ulang.
Environment Variable: Menyediakan dukungan untuk variabel lingkungan (environment variable) dengan instruksi ENV.
Multi-Stage Build: Mengizinkan multi-stage build, di mana beberapa image dapat digunakan dalam satu Dockerfile untuk membuat image akhir yang lebih ringan.
Custom Commands: Dockerfile mendukung berbagai instruksi untuk menyalin file (COPY), mengeksekusi perintah (RUN), dan menjalankan aplikasi (CMD), serta banyak lagi.

## Komponen-Komponen Dockerfile
FROM: Menentukan base image yang digunakan sebagai dasar. Ini adalah instruksi pertama dalam Dockerfile. Contoh: FROM ubuntu:latest

