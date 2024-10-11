from fastapi import FastAPI, HTTPException
import httpx
import json

app = FastAPI()

# Base URL for Sinatra service
USER_URL = "http://user-service:4567/users"
async with httpx.AsyncClient() as client:
    response = await client.get(f"{USER_URL}/{user_id}")
    

@app.get("/order/{user_id}")
async def get_order(user_id: int):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{USER_URL}/{user_id}")
        # Membaca file order.json
        order_data = ''
        with open('order.json', 'r') as file:
            order_data = json.load('order.json')

        if response.status_code == 200:
            user_data = response.json()
            return {"order": {"user": user_data, "order_details": order_data}}
        else:
            raise HTTPException(status_code=response.status_code, detail="User not found in User Service")
