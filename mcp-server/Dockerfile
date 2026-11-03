# syntax=docker/dockerfile:1
FROM python:3.11-slim

# Set work directory
WORKDIR /app

# Prevent Python from writing .pyc files & buffer output
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Install dependencies first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application source code
COPY . .

# FastMCP streamable-http runs on port 8000 by default
EXPOSE 8000

# Run the FastMCP server
CMD ["python", "server.py"]
