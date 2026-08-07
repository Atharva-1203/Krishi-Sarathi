# Frontend Audit

This document inventories the UI assets, state stores, and page routers for the Next.js frontend application.

## 1. Key Component Registries

*   `LandingPage.tsx`: Hero visuals and high-level platform introduction.
*   `PredictionDashboard.tsx`: Collects soil inputs under the form schema, manages request state, and sends payloads to the FastAPI prediction router.
*   `ResultsDisplay.tsx`: Renders prediction scores, parameter fit gauges, and explainability text.
*   `ModelTransparency.tsx`: Renders the transparency sheet describing model training specs.
*   `AnalyticsPage.tsx`: Renders evaluation metrics and matrices.
*   `InsightsPage.tsx`: Manages the interactive Maharashtra map selection, comparisons, and district statistics panels.
*   `CropExplorer.tsx`: Explores details for each crop class.
*   `Header.tsx` & `Sidebar.tsx`: Navigation layout.

## 2. Localization System
*   State managed via Zustand in `frontend/src/store/language.ts`.
*   Translations configured in `frontend/src/store/translations.ts` supporting English and Marathi translations for all text components.
