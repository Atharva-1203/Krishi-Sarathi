# Krishi Sarathi - Animation Guide

Motion presets, transition timing, and curves.

## 1. Framer Motion Variants
- **Fade Slide**:
  ```typescript
  const variants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0 }
  };
  ```
- **Timing**: Kept under `< 300 ms` for micro-interactions, avoiding screen lags.
- **Hover effects**: Scaling grids using `whileHover={{ scale: 1.03 }}` and `whileTap={{ scale: 0.98 }}`.
