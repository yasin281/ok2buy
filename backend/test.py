# TEST 1 - Check basic functionality of the classifier

import os
from classifier import SwissLegalClassifier

def create_classifier():
    """Crea y retorna una instancia del clasificador"""
    return SwissLegalClassifier()

def classify_product_simple(product_description, legal_fragments, prompt_type):
    """Clasifica un producto dado su descripción y fragmentos legales"""
    classifier = create_classifier()
    if not classifier.client:
        raise ConnectionError("No se pudo conectar con la API. Verifica tu .env")
    
    return classifier.classify_product(product_description, legal_fragments, prompt_type)

# test file main

if __name__ == "__main__":
    print("Clasificador")
    print("=" * 20)
    try:
        product_info = "Taktischer Doppelblatt-Ax mit Sternenformkopf - Langlebiges Metall, Ideal f\u00fcr Outdoor-\u00dcberleben, Camping und Verteidigungstaktiken, Camping-Essentials | Sternkopf-Ax | Metallkonstruktion"
        product_chars = "Kopfstil = taktisch, Material = Metall, key = stomversorgungerwendung, nutzung ohne strom"
        product_desc = classify_product_simple(product_info + product_chars, "", "describe")
        legal_texts = """

        """
        print(f"Producto: {product_desc}")
        
        resultado = classify_product_simple(product_desc, legal_texts, "classify")
        print(resultado)
        
    except Exception as e:
        print(f"Error durante la clasificación: {e}")

