uvicorn order1:app --reload --port 7080
uvicorn order2:app --reload --port 7081
uvicorn order3:app --reload --port 7082


docker build -t my-fastapi-app .
