from enum import Enum

from fastapi import HTTPException
from gather_product_info import get_product_info


class ProductStatus(str, Enum):
    LEGAL = "legal"
    ILLEGAL = "illegal"
    RESTRICTED = "restricted"
    UNKNOWN = "unknown"


def create_response(product_id: int) -> dict:
    return {
        "product_id": product_id,
        "status": ProductStatus.LEGAL.value,
        "laws": ["Example Law 1", "Example Law 2"]
    }


def validate_product(product: int) -> dict:
    try:
        return get_product_info(product)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
