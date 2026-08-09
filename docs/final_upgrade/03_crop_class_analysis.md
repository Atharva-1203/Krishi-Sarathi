# Krishi Sarathi: Crop Class and Support Boundary Analysis

This report documents the detailed support boundaries, class frequencies, average predictions confidence, and confusion metrics for all 22 supported crop classes.

---

## 1. Class Distribution & Support Summary
The dataset is perfectly balanced with exactly **100 samples** for each of the 22 crops (representing 4.5% of the total 2,200 dataset size each). 
- **Min Support per class**: 100 samples.
- **Max Support per class**: 100 samples.
- **Imbalance Ratio**: 1.0 (Ideal balanced target state, ensuring no default crop bias is learned).
- **Class Entropy**: 4.4594 bits (theoretical maximum representing zero concentration bias).

---

## 2. Crop Classes Categorization (Conceptual Grouping)
While the ExtraTrees model maps predictions strictly to the 22 labels, we group them conceptually for presentation:
- **Cereals**: rice, maize
- **Pulses**: chickpea, kidneybeans, pigeonpeas, mothbeans, mungbean, blackgram, lentil
- **Fruits**: pomegranate, banana, mango, grapes, watermelon, muskmelon, apple, orange, papaya
- **Commercial/Plantation Crops**: coconut, cotton, jute, coffee

---

## 3. Per-Crop Agronomic Support & Confidence Metrics

| Crop | Samples | Percentage | pH Range | Rainfall Range | Avg Confidence | Top Confusions |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **apple** | 100 | 4.5% | 5.5 - 6.5 | 100 - 124mm | 99.10% | None |
| **banana** | 100 | 4.5% | 5.5 - 6.5 | 90 - 119mm | 97.05% | None |
| **blackgram** | 100 | 4.5% | 6.5 - 7.8 | 60 - 74mm | 86.65% | None |
| **chickpea** | 100 | 4.5% | 6.0 - 8.9 | 65 - 94mm | 98.55% | None |
| **coconut** | 100 | 4.5% | 5.5 - 6.5 | 131 - 225mm | 95.60% | None |
| **coffee** | 100 | 4.5% | 6.0 - 7.5 | 115 - 199mm | 93.95% | None |
| **cotton** | 100 | 4.5% | 5.8 - 8.0 | 60 - 99mm | 94.30% | None |
| **grapes** | 100 | 4.5% | 5.5 - 6.5 | 65 - 74mm | 98.70% | None |
| **jute** | 100 | 4.5% | 6.0 - 7.5 | 150 - 199mm | 78.70% | None |
| **kidneybeans** | 100 | 4.5% | 5.5 - 6.0 | 60 - 149mm | 94.80% | None |
| **lentil** | 100 | 4.5% | 5.9 - 7.8 | 35 - 54mm | 74.75% | mothbeans (1 case) |
| **maize** | 100 | 4.5% | 5.5 - 7.0 | 60 - 109mm | 84.30% | None |
| **mango** | 100 | 4.5% | 4.5 - 7.0 | 89 - 100mm | 95.20% | None |
| **mothbeans** | 100 | 4.5% | 3.5 - 9.9 | 30 - 74mm | 79.40% | None |
| **mungbean** | 100 | 4.5% | 6.2 - 7.2 | 36 - 59mm | 95.85% | None |
| **muskmelon** | 100 | 4.5% | 6.0 - 6.8 | 20 - 29mm | 98.45% | None |
| **orange** | 100 | 4.5% | 6.0 - 8.0 | 100 - 119mm | 94.20% | None |
| **papaya** | 100 | 4.5% | 6.5 - 7.0 | 40 - 248mm | 91.60% | None |
| **pigeonpeas** | 100 | 4.5% | 4.5 - 7.4 | 90 - 198mm | 86.30% | None |
| **pomegranate** | 100 | 4.5% | 5.6 - 7.2 | 102 - 112mm | 95.50% | None |
| **rice** | 100 | 4.5% | 5.0 - 7.9 | 182 - 298mm | 82.05% | jute (1 case) |
| **watermelon** | 100 | 4.5% | 6.0 - 7.0 | 40 - 59mm | 96.90% | None |

---

## 4. Interpretation & Error Analysis
Confusions are extremely rare on the test split. The only observed errors are:
1.  **Lentil confused as Mothbeans** (1 case): Both are dry-climate pulses requiring low water (35-74mm) and neutral-alkaline soil, placing them in close proximity in the feature space.
2.  **Rice confused as Jute** (1 case): Both are water-intensive monsoon crops requiring high humidity and overlapping pH values, creating borderline decision states.
