Jaringan di Linux

Perintah Jaringan
Perintah	    Fungsi
ifconfig	    Melihat dan mengkonfigurasi jaringan (deprecated)
ip	            Alternatif modern untuk ifconfig
ping	        Mengecek koneksi ke host lain
netstat / ss	Melihat koneksi jaringan yang sedang aktif
scp	            Mengirim file antar komputer melalui SSH

Contoh Perintah:

# Mengecek konektivitas jaringan
ping google.com

# Mengirim file ke server remote
scp file.txt user@server:/path/to/destination