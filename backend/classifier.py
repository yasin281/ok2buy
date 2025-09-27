
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

    def llm_query(self, product_description: str, legal_fragments: str, prompt_type: str) -> dict:
        if (prompt_type == "classify"):
            prompt_system = (
                "You are a Swiss border-control agent specializing in product import and classification under Swiss law."
                "Respond **only** in valid JSON with exactly two fields: (again, not Markdown style JSON, but JSON as itself) "
                "- `classification`: must be one of `legal`, `illegal`, or `permit_or_registration`.  "
                "- `reasoning`: a concise (max 2 short sentences) explanation that briefly cites the relevant Swiss law or regulation.  "
                "Do not include any extra text, formatting, or commentary outside the JSON object."
                "The laws are: {legal_fragments}"
            )

            prompt_user = f"""
           You are a Swiss border-control agent specializing in product import and classification under Swiss law.  
            Classify the product below strictly based on the provided legal fragments.

            Product description: {product_description}  
          

            Respond **only** in valid JSON with exactly two fields:  
            - "classification": must be one of "legal", "illegal", or "permit_or_registration".  
            - "reasoning": a concise explanation (maximum 2 short sentences) briefly citing the relevant Swiss law or regulation.  

            Do not include any other text, explanations, or formatting outside the JSON object.
            """
        elif (prompt_type == "describe"):
            prompt_system = (
                "You are a Swiss border-control agent fluent in English and German. "
                "Provide a concise English description of the product, focusing only on details relevant for its legal import classification under Swiss law. "
                "The description must be brief, accurate, and limited to a maximum of three well-structured sentences."
            )

            prompt_user = f"""
            You are a Swiss border-control agent describing products for legal import classification.  
            Provide a short but precise description of the following product, focusing only on characteristics that affect its classification under Swiss law.  

            Product description: {product_description}
            """

        elif prompt_type == "laws":
            prompt_system = (
                "You are a Swiss border-control agent specializing in product import and classification laws. "
                "Respond with a plain list of the relevant Swiss laws or regulations that apply to the product. "
                "List only the law titles from the following legal fragments only, with no explanations, commentary, or extra text. "
            )

            prompt_user = f"""
            You are a Swiss border-control agent tasked with identifying applicable Swiss laws for product import and classification.  
            List only the relevant Swiss laws that apply to the product below, based solely on the provided legal fragments.

            Product description: {product_description}  
            Legal fragments: {legal_fragments}
            """

        response = self.client.chat.completions.create(
            model="swiss-ai/Apertus-70B",
            messages=[
                {"role": "system", "content": prompt_system},
                {"role": "user", "content": prompt_user}
            ],
            temperature=0
        )

        return response.choices[0].message.content
 