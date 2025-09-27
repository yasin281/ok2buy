# ok2buy - swissAI

**Challenge: Don't walk into the trap.**

### Problem

Imagine purchasing a gadget online, only to discover it is illegal in Switzerland. For example, Swiss law only permits class 1 laser pointers; all others are banned from import, sale, or use.

This hackathon project aims to create a smart, AI-powered end-to-end tool that instantly checks the legality of e-commerce products, ensuring that both travelers and online shoppers remain safe and compliant.

### Objective

Given a product identification number from a major e-commerce platform (e.g., Temu or Shein), the system determines whether the product is likely prohibited for sale or import into Switzerland. The classification relies on publicly available product details and Swiss legal guidelines, without violating the terms of service of the platforms.

Evaluation criteria: **ease of use** and **classification performance**.

---

# Our Conceptual Solution

Our solution uses a product ID from an e-commerce platform to fetch publicly available product data. This data is combined with legal information from the [Swiss Federal Customs Administration](https://www.bazg.admin.ch/bazg/en/home.html). An AI model processes this input, allowing a large language model (LLM) to classify whether the product is legal or illegal in Switzerland.

For more details, see our "About" section on the deployed web app [here](https://ok2buy-1.onrender.com/).

# How to Run for Development

### Prerequisites

- [React](https://react.dev/)
- [Node.js](https://nodejs.org/)
- [Python 3.9+](https://www.python.org/)

### Setup

Install frontend dependencies:

```bash
npm install
```

install the required python packages:

```bash
pip install -r requirements.txt
```

In case you need to develop the vectorDB_approach, you need this additional package:

```bash
pip install sentence_transformers
pip install chromadb
```

to run the backend server, go to /backend and run:

```bash
uvicorn main:app --reload --host
```

to run the frontend server, go to /frontend and run:

```bash
npm start
```
