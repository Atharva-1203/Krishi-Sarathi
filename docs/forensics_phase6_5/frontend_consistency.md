# Frontend Widget Consistency & Contract


## Rendering Alignment Rules

All UI components (circular gauges, checklists, disclaimers, action plans) fetch parameters strictly from the `top_recommendations` API response.
No calculations are done on the Next.js client side.
