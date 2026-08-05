# Krishi Sarathi - Animation Guidelines

This document details the transition timing, curves, and motion patterns used inside Krishi Sarathi.

## 1. Motion Principles

### Timing & Curves
- **Standard Timing**: `< 300 ms` for all interface transitions (e.g., hover effects, sidebar selections).
- **Page Transitions**: `duration: 0.35s` with `easeInOut` curve for tab fade-in / slide effects.
- **Micro-Interactions**: Hover elevation scaling utilizes `whileHover={{ scale: 1.03 }}` and `whileTap={{ scale: 0.98 }}`.

### Accessibility Support
- Integrated Framer Motion's `AnimatePresence` to enable clean mount/unmount fades.
- Honors `prefers-reduced-motion` media queries by utilizing standard CSS transitions for base elements.
