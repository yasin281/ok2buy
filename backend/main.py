from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from product_validation import validate_product

app = FastAPI(title="ok2buy Backend API")

origins = [
    "http://127.0.0.1:8000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://0.0.0.0:5173",
    "https://ok2buy-1.onrender.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/health")
def health_check():
    return {"status": "ok", "code": 200}  # si recibe es que todo furula (func inutil)


@app.get("/checkproductsapi/product/{product_id}")
def check_product(product_id: int):
    if (product_id < 0):
        raise HTTPException(status_code=400, detail="Invalid product ID")
    return validate_product(product_id) # should return legal status and reasoning
