# Krishi Sarathi - Deployment Guide

Step-by-step instructions to serve uvicorn backend and next.js frontend locally.

## 1. Launch FastAPI Backend
```bash
cd backend
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```

## 2. Launch Next.js Frontend
```bash
cd frontend
npm run dev
```

## 3. Production Build
```bash
cd frontend
npm run build
```
