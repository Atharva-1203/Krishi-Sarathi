FROM python:3.11-slim

WORKDIR /workspace

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . /workspace/backend
COPY ml/models/production /workspace/ml/models/production

EXPOSE 8000

ENV PYTHONPATH=/workspace
ENV MODEL_DIR=/workspace/ml/models/production

CMD ["uvicorn", "backend.app.main:app", "--host", "0.0.0.0", "--port", "8000"]
