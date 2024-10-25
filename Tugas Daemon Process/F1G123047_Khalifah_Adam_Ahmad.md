
# Menggunakan FastAPI dengan Systemd

## Langkah-langkah

1. **Install FastAPI dan Uvicorn dalam Virtual Environment**:
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    pip install fastapi uvicorn
    ```

2. **Buat File `main.py`**:
    ```python
    from fastapi import FastAPI

    app = FastAPI()

    @app.get("/")
    async def read_root():
        return {"Hello": "World"}
    ```

3. **Buat File Service untuk Systemd**:
    - Buat file baru di `/etc/systemd/system/adam.service` dengan konten berikut:
    ```ini
    [Unit]
    Description=Contoh Daemon

    [Service]
    User=adam
    Group=adam
    WorkingDirectory=/home/adam/daemon
    Environment="PATH=/home/adam/daemon/venv/bin"
    ExecStart=/home/adam/daemon/venv/bin/uvicorn main:app --reload --port 7080

    [Install]
    WantedBy=multi-user.target
    ```

4. **Reload Systemd dan Start Service**:
    ```bash
    sudo systemctl daemon-reload
    sudo systemctl start adam.service
    sudo systemctl status adam.service
    ```

5. **Akses Aplikasi FastAPI**:
    - Buka browser dan akses `http://localhost:7080`

## Nama Pengguna
Khalifah Adam Ahmad
