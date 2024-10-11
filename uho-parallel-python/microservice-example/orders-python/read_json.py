from fastapi import FastAPI, HTTPException
import httpx
import json

app = FastAPI()

# Base URL for Sinatra service
SINATRA_URL = "http://sinatra-service:4567/users"


order_data = ''
with open('order.json', 'r') as file:
    order_data = json.load(file)

# Menampilkan data yang sudah dibaca
print(order_data)        