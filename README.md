# Krishi Sarathi (कृषी सारथी)

> **Motto**: शाश्वत शेती – समृद्ध शेतकरी (Sustainable Farming – Prosperous Farmer)
> **Tagline**: ज्ञानसमन्विता कृषिः समृद्धये (Agriculture empowered by knowledge leads to prosperity.)

Krishi Sarathi is a machine learning-driven agricultural decision support platform designed to provide geolocated crop recommendations and explainable soil health feedback to farmers in Maharashtra, India.

---

## 1. Project Architecture

The workspace is organized as follows:

```text
Krishi-Sarathi/
├── datasets/             # Data repository (Raw, Processed, Final, Archive)
├── ml/                   # Machine learning engineering pipeline structure
├── backend/              # API server codebase (FastAPI)
├── frontend/             # User dashboard (React/Next.js)
├── docs/                 # Centralized master documentation and dictionary
├── reports/              # Quality and diagnostic reports
├── presentation/         # Project presentations and pitches
└── assets/               # Image assets and static diagrams
```

---

## 2. Datasets Inventory

We have compiled the highest quality agricultural data foundation for Maharashtra:
1. **Soil Health Points**: 779,144 geolocated points from the official GoI Soil Health Card GeoServer, tracking N, P, K, pH, and micronutrients.
2. **Season Rainfall**: Historical monsoon rainfall (2015-2025) for all 34 agricultural districts.
3. **BHOOMI Geoportal**: Taluka-level soil physical properties (Texture, Depth, Constraints, Land Capability).

---

## 3. Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourorganization/Krishi-Sarathi.git
   cd Krishi-Sarathi
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
