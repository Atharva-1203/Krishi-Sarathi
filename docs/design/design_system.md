# Krishi Sarathi - Design System

This document outlines the centralized design token architecture, spacing scales, and visual presets.

## 1. Design Tokens

### Spacing Scale
- `px-4 / py-6`: Small mobile padding grids.
- `px-6 / py-8 / gap-6`: Medium tablet layout structures.
- `gap-16 / py-12 / py-8`: Large layout offsets.

### Color Palette (Theme Synchronized)
| Token Name | Light Mode Hex | Dark Mode Hex | Purpose |
|------------|----------------|---------------|---------|
| `--bg-app` | `#f4f6f4` | `#080f08` | Main page background |
| `--bg-card` | `#ffffff` | `#0e1a0e` | Container background |
| `--border-color` | `#d1dbd1` | `#1a331a` | Borders and dividers |
| `--text-main` | `#1b2e1b` | `#e2ede2` | Heading and body text |
| `--text-muted` | `#4e634e` | `#8fa08f` | Captions and captions |

### Glassmorphism & Elevation System
- **Elevation Shadow**: `shadow-md shadow-emerald-500/20` (emerald ambient glow).
- **Glassmorphic Preset**: `bg-[var(--bg-glass)] backdrop-blur-md` (70% alpha mask with 12px backdrop blur filter).
