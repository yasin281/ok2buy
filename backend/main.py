from fastapi import FastAPI, HTTPException
from product_validation import validate_product

app = FastAPI(title="SafeBuy Checker")


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
