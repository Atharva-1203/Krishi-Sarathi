# Krishi Sarathi - Frontend Design Review Document

This document summarizes the UX review and the resulting design decisions adapted for the Krishi Sarathi frontend application.

## 1. Study of Smart India Hackathon (SIH) Winners UX Patterns
- **Simplified Input Interfaces**: Successful agri-tech dashboards avoid complex jargon. Soil indicators (N, P, K) are matched with clear tooltips and sliders.
- **Explainable Results**: Non-technical users need immediately understandable text rather than raw probability distributions. Dynamic natural language explainability translates SHAP parameters directly into clear reasoning.
- **Clean Responsive Sidebars**: Essential dashboards prioritize visual focus on primary workflows. Sidebars collapse elegantly on mobile formats.

## 2. Visual Theme & agricultural Color System
We chose a curated color scheme representing plant-vitality green:
- **Dark Mode**: Premium deep forest-green base (`#080f08`) preventing page flashes, creating a professional analytical look.
- **Light Mode**: Warm clean organic ivory base (`#f4f6f4`) with high-contrast text.

## 3. UI Micro-interactions
- Framer Motion page routes fade-in/out to maintain navigation flow.
- Custom float animations simulating floating leaf seeds on radial gradients.
- Interactive SVG polygon maps representing the Western Maharashtra Pune Division districts (Pune, Satara, Kolhapur, Sangli, Solapur).
