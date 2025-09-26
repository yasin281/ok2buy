from enum import Enum

from fastapi import HTTPException
from gather_product_info import get_product_info


class ProductStatus(str, Enum):
    LEGAL = "legal"
    ILLEGAL = "illegal"
    RESTRICTED = "restricted"
    UNKNOWN = "unknown"


requiered_fields = ["product_code",
                    "product_name", "product_description", "shop"]


def create_response(product_info: dict, status: ProductStatus,
                    laws: list) -> dict:
    response = {}

    for field in requiered_fields:
        value = product_info.get(field, "N/A")
        if field == "product_description":
            value = [[v] if not isinstance(v, list) else v for v in value]

        response[field] = value

    response.update({
        "status": status.value,
        "laws": laws
    })

    return response


def validate_product(product: int) -> dict:
    try:
        product_info = get_product_info(product)
        return create_response(product_info, ProductStatus.LEGAL,
                               ["Law1", "Law2", "Law3"])
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
