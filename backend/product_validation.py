from enum import Enum


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
    return create_response(product)
