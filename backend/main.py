from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from product_validation import validate_product

app = FastAPI(title="ok2buy Backend API")

origins = [
    "http://127.0.0.1:8000",
    "http://localhost:<your-frontend-port>",]

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
    return {"status": "ok", "code": 200}


@app.get("/checkproductsapi/product/{product_id}")
def check_product(product_id: int):
    if (product_id < 0):
        raise HTTPException(status_code=400, detail="Invalid product ID")
    return validate_product(product_id)
