# Chapter 18: Agronomic Consistency Report

This report audits the biological and environmental boundary parameters of Krishi Sarathi's prediction recommendations to verify scientific consistency with established agricultural science.

---

## 1. Crop Biological & Climatic Thresholds

| Crop | Season | Rainfall Range | pH Range | N Range (kg/ha) | P Range (kg/ha) | K Range (kg/ha) |
|------|--------|----------------|----------|-----------------|-----------------|-----------------|
| **Sugarcane** | Kharif/Annual | 1000 - 2500 mm | 6.5 - 8.0 | 100 - 150 | 40 - 80 | 120 - 180 |
| **Wheat** | Rabi | 400 - 800 mm | 6.0 - 7.5 | 60 - 80 | 30 - 50 | 60 - 100 |
| **Cotton** | Kharif | 500 - 1000 mm | 6.0 - 7.8 | 60 - 90 | 30 - 60 | 60 - 100 |
| **Rice** | Kharif | 1200 - 2000 mm | 5.5 - 7.0 | 70 - 100 | 40 - 60 | 60 - 100 |
| **Sorghum** | Kharif/Rabi | 350 - 700 mm | 6.0 - 7.5 | 30 - 50 | 15 - 30 | 30 - 60 |
| **Moong** | Kharif | 300 - 600 mm | 6.0 - 7.2 | 15 - 25 | 20 - 40 | 20 - 40 |

---

## 2. Model Boundary Verification

We ran boundary test combinations to verify that the model does not recommend crops outside their biological thresholds:

### Test Case A: Drought Conditions (Rainfall < 400mm)
- **Model Output**: Recommends **Sorghum**, **Moong**, or **Groundnut**.
- **Assessment**: Correct. Sugarcane and Rice are excluded.

### Test Case B: Heavy Monsoon (Rainfall > 1500mm)
- **Model Output**: Recommends **Rice**, **Sugarcane**, or **Turmeric**.
- **Assessment**: Correct. Dryland crops like Sorghum and Moong are excluded due to waterlogging susceptibility.

### Test Case C: Low Nitrogen Input (N < 30 kg/ha)
- **Model Output**: Recommends **Moong**, **Pigeonpea**, or **Urad** (nitrogen-fixing legumes).
- **Assessment**: Correct. High-nitrogen feed crops are excluded.
