# LANGKAH-LANGKAH MENJALANKAN DAEMON PYTHON
## Langkah Pertama
Clone proyek dari repositori dengan perintah:
 ```
git clone <URL_proyek>
 ```
## Langkah Kedua
Buat File Skrip Daemoen:
 ```
touch python-daemon.bat
 ```
Buka file script dan edit file menggunakan teks editor

Masukkan Skrip
Salin dan tempel skrip berikut ke dalam file:
 ```
@echo off
setlocal

set "APP_PATH=C:\Daemon\simple-python-website\venv\Scripts\pythonw.exe"
set "MAIN_SCRIPT=C:\Daemon\simple-python-website\main.py"
set "PID_FILE=python.pid"

:start
echo Starting the web application...
if exist %PID_FILE% (
    echo Web application is already running.
    exit /b
)
start "" "%APP_PATH%" "%MAIN_SCRIPT%"
echo %errorlevel% > %PID_FILE
echo Web application is now running in the background.
goto end

:stop
echo Stopping the web application...
if exist %PID_FILE% (
    set /p PID=<%PID_FILE%
    taskkill /F /PID %PID%
    del %PID_FILE%
    echo Web application has been stopped.
) else (
    echo PID file not found. Is the application running?
)
goto end

:end
endlocal
 ```
Simpan file dan tutup editor.

## Langkah Ketiga Menjalanlan Server
Untuk Memulai Server
Jalankan server dengan perintah:
```
.\python-daemon.bat start
 ```
Anda akan melihat pesan:
Web application is now running in the background.

## Langkah Keempat Menjalankan Web
```
http://localhost:9999
 ```
# Screenshoot                                                                                                                                
Tampilan Menjalankan
