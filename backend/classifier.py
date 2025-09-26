
import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()


class SwissLegalClassifier:
    def __init__(self):
        self.client = OpenAI(
            api_key=os.getenv("SWISSCOM_API_KEY"),
            base_url=os.getenv("SWISSCOM_API_BASE_URL")
        )

    def classify_product(self, product_description: str, legal_fragments: str, prompt_type: str) -> dict:
        if (prompt_type == "classify"):
            prompt_system = (
            "You are a border agent specializing in Swiss laws regarding product import and classification. "
            "Answer ONLY in JSON format with exactly two fields: "
            "\"classification\" which can be only 'legal', 'illegal', or 'permit_or_registration' and "
            "\"reasoning\" with a brief explanation citing the relevant laws. Reasoning should be very concise and brief, no more than two short sentences, and shouldn't include non-related information."
            )

            prompt_user = f"""
            You are a border agent specializing in Swiss laws regarding product import and classification.
            Classify the following product description according to the provided legal fragments.

            Product description: {product_description}
            Legal fragments: {legal_fragments}
            """
        elif (prompt_type == "describe"):
            prompt_system = (
            "You are a border agent specializing in Swiss laws regarding product import and classification and you know good English and German. "
            "Answer with a brief description of the product in English, and only include relevant details for classification of the product to help with the classification." \
            "Description should be short and concise, no more than three long sentences."
            )
            prompt_user = f"""
            You are a border agent in charge of describing products for classification according to Swiss laws.
            Give a brief but complete description of the following product, focusing on details relevant for legal classification.
            Product description: {product_description}
            """
        
        response = self.client.chat.completions.create(
            model="swiss-ai/Apertus-70B",
            messages=[
                {"role": "system", "content": prompt_system},
                {"role": "user", "content": prompt_user}
            ]
        )

        return response.choices[0].message.content
 