# Maharashtra GIS Map Architecture

This document outlines the SVG projection, component hierarchy, and interactivity layers.

## 1. Component Hierarchy
- **`MaharashtraMap.tsx`**: Host SVG viewport and groups boundaries under interactive path handlers.
- **`SearchDistrict.tsx`**: Dropdown filter querying district names and centers viewport translation offsets.
- **`ZoomControls.tsx`**: Dynamic scale multipliers adjusting viewports.
- **`DistrictTooltip.tsx`**: Floating mouse tracker representing hovered entities.
- **`DistrictPanel.tsx`**: Detailed stats card mapping rainfall, soils, and primary crops.

## 2. Interactive States
- **Hover**: Applies soft overlay (`rgba(16, 185, 129, 0.25)`) and tooltips.
- **Selection**: Persistent highlight (`rgba(16, 185, 129, 0.45)`) and bold emerald border.
