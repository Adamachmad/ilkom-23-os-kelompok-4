FROM python:3.10

WORKDIR /app

RUN pip install fastapi uvicorn httpx

COPY main.py /app/main.py

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
