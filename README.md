# ok2buy – SwissAI 🇨🇭

**Challenge: Don't walk into the trap.**

## Problem

Imagine purchasing a gadget online, only to discover it is illegal in Switzerland. For example, Swiss law only permits class 1 laser pointers; all others are banned from import, sale, or use.

This project demonstrates a proof of concept that uses AI to instantly classify products from e-commerce platforms according to Swiss law, helping shoppers and retailers stay compliant.

## Objective

Given a product ID from an e-commerce platform (e.g., Temu, Shein), the system determines whether the product is:

- ✅ Legal
- ⚠️ Requires permit/registration
- ❌ Illegal

The classification is based on publicly available product details and Swiss customs regulations without violating the e-commerce platforms’ Terms of Service.

Evaluation criteria: ease of use and classification performance.

## Propsed approach

Our proposed approach uses a vector database to store and retrieve relevant legal information. This method enhances the AI model's ability to classify products accurately by providing context-specific legal data.
![Proposed approach](/frontend/public/approach.png)
After testing the vectorDB approach, we found that the results were not satisfactory. The main reason is that the legal texts are too complex and not directly related to the product attributes. Therefore, we decided to use a more straightforward approach that directly feeds the relevant legal information to the LLM along with the product data.

## Current approach

Our conceptual and current implementation approach:

1. User Input:

   - Product ID is entered via the web interface or sent via API request.

2. Data Retrieval:

   - In the hackathon version, product information comes from a pre-built dataset (GitHub).
   - Future version: fetch real-time product details from e-commerce APIs (while respecting ToS).

3. Sanitization:

   - Keep only product attributes relevant to classification.

4. AI Processing:

   - The sanitized product data and category-specific Swiss laws are fed into Apertus (LLM) on the Swisscom inference platform.
   - The AI model outputs a classification (legal / illegal / requires permit) with reasoning.

5. Response Handling:
   - The structured result is sent back via API or shown in the web interface.

## Tech Stack

- Frontend: React, Tailwind CSS, Lucide-Icons
- Backend: FastAPI, Uvicorn
- AI Model: Apertus (LLM) on Swisscom Inference Platform
- Hosting: Render

## Technical Limitations

1. Limited access to product data (e-commerce APIs require pre-authorization).
2. Scraping restricted by ToS of platforms like Temu and Shein.
3. Vector DB experiments returned poor categorization results.
4. AI model responses sometimes inconsistent in format.

## Future Work

- Integrate real-time product data retrieval (while ToS-compliant)
- Improve AI model accuracy and speed with fine-tuning
- Add caching for faster repeat classifications
- Expand database of laws to cover more categories/jurisdictions

## How to run the project locally

### Prerequisites

- React
- Python 3.8+

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Optional: VectorDB experiments

```bash
pip install sentence_transformers chromadb
```

## Live Demo

The project is hosted on Render: [ok2buy.onrender.com](https://ok2buy-1.onrender.com/)

**Note:** The demo is disabled after the hackathon.

## License

MIT License
