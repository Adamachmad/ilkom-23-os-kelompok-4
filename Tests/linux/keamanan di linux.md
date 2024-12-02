Keamanan di Linux

Menggunakan sudo
Tambahkan sudo untuk menjalankan perintah dengan hak akses root.
Contoh:
    sudo apt update

Firewall dengan ufw
Mengaktifkan firewall:
    sudo ufw enable

Membuka port tertentu:
    sudo ufw allow 22/tcp

Izin File dan Direktori
Simbol	Arti
r	    Read (membaca)
w	    Write (menulis)
x	    Execute (menjalankan)

Contoh mengubah izin file:
# Memberikan izin penuh kepada pemilik
chmod 700 file.txt
