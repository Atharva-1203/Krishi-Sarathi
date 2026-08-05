# Krishi Sarathi - Localization Guide

This guide documents the bilingual architecture supporting English and Marathi translations.

## 1. Bilingual Architecture

- **State Store (`store/language.ts`)**: Zustand store keeping language preferences (`en` or `mr`) persistent in `localStorage`.
- **Translations Dictionary (`store/translations.ts`)**: Single source of truth containing localized strings for forms, buttons, maps, and tooltips.
- **Typography pairing**: Imports google fonts: **Inter** / **Outfit** (English) and **Noto Sans Devanagari** (Marathi) within `app/layout.tsx` for optimal readability.

## 2. NLG Crop Explanation Translation
- Coded a dynamic client-side translation parser `translateExplanation(crop, rawEnglishExplanation, lang)`.
- It parses English SHAP criteria (NPK levels, pH bounds, rainfall) and formats naturally structured Marathi sentences.
