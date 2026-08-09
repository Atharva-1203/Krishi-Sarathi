# Krishi Sarathi: Geographic Bias & Concentration

This report quantifies spatial imbalances in the 7.9 lakh government database.

---

## 1. Concentration Metrics
- **District Entropy**: 5.0188 bits (Max theoretical entropy is $\log_2(34) = 5.087$ bits).
- **Herfindahl-Hirschman Index (HHI)**: 322.02 (Low concentration rating, indicating that soil cards are relatively well-distributed across the 34 districts).
- **Gini Coefficient of Representation**: 0.1729.

---

## 2. District Representation Rankings

### Top 10 Districts
1.  **Nashik**: 41,286 records (5.30%)
2.  **Chandrapur**: 33,875 records (4.35%)
3.  **Satara**: 32,789 (4.21%)
4.  **Pune**: 31,408 (4.03%)
5.  **Ahmednagar**: 31,399 (4.03%)
6.  **Buldhana**: 31,062 (3.99%)
7.  **Gadchiroli**: 30,369 (3.90%)
8.  **Jalgaon**: 30,149 (3.87%)
9.  **Solapur**: 28,632 (3.67%)
10. **Nanded**: 28,419 (3.65%)

### Bottom 5 Districts
30. **Ratnagiri**: 13,982 (1.79%)
31. **Thane**: 12,712 (1.63%)
32. **Sindhudurg**: 11,361 (1.46%)
33. **Palghar**: 10,456 (1.34%)

---

## 3. Geographic Bias Implications
Although the record counts are distributed relatively evenly across districts (Gini = 0.1729), severe bias arises from **underlying regional cropping specialties**:
- Western districts (Pune, Satara, Kolhapur) are dominated by cash crops (sugarcane).
- Central districts (Nagpur, Amravati, Yavatmal) are dominated by cotton and soybean.
- Ingestion of geographic coordinates directly into the training pipeline would cause model tree structures to split on regional administrative bounds, memorizing location variables rather than learning crop chemistry.
