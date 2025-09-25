# Manual for Developers

This document provides instructions on how to run the FastAPI application.

## Prerequisites

- Python 3.7 or higher
- pip (Python package installer)

## Steps to Run the Application

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install the required dependencies:

```bash
pip install -r requirements.txt
```

3. Start the FastAPI server using Uvicorn:

```bash
uvicorn main:app --reload
```

- your_main_file: name of your Python file containing the FastAPI instance
- app: the FastAPI instance inside the file
- --reload: makes the server restart automatically after code changes (only for development)
