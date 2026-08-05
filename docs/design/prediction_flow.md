# Krishi Sarathi - Prediction Flow Diagram

This documents the crop recommendation user journey flow.

## 1. Flow Sequence
1. **Landing Hero Page**: Shows database stats.
2. **Analysis Form**: Validates inputs within Zod bounds.
3. **API Request**: Transmits payload to FastAPI.
4. **Shimmer Loader**: Displays custom analysis messages.
5. **Results Card**: Renders Top-3 crop choices, SHAP progress charts, and localized Marathi descriptions.
6. **Print Export**: Launches print certificate modal.
7. **Local History**: Appends item to `localStorage` history menu.
