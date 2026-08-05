# Krishi Sarathi - UI Architecture

Next.js App router routing logic and state management.

## 1. Client-Side State Stores
- **Zustand Theme Store (`store/theme.ts`)**: Controls `'dark' | 'light'` switches, caching choice in local storage.
- **Zustand Language Store (`store/language.ts`)**: Controls `'en' | 'mr'` switches, triggering automatic rerenders of bilingual UI components.

## 2. API Contract Interfaces
- Connects directly to backend `POST /api/v1/predict` returning inference probability scores, model performance, and TreeSHAP feature contributions.
