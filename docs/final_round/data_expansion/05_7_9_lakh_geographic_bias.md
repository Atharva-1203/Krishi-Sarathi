# Government Database Geographic Bias Report (7.9L)

This document profiles the spatial representation balances in the Soil Health Card database.

---

## 1. Geographic Entropy & Concentration
- **Shannon Entropy of Districts**: **5.0188 bits** (very close to maximum theoretical entropy of $5.087$ bits, representing relatively uniform spatial counts).
- **Herfindahl-Hirschman Index (HHI)**: **322.02** (indicates low regional concentration risk in terms of card count).
- **Gini Coefficient of Representation**: **0.1729** (confirms balanced geographical card registration volumes across Maharashtra).

---

## 2. District Counts and Percentages

### Top 10 Districts by Card Volume
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

### Bottom 5 Districts by Card Volume
30. **Ratnagiri**: 13,982 (1.79%)
31. **Thane**: 12,712 (1.63%)
32. **Sindhudurg**: 11,361 (1.46%)
33. **Palghar**: 10,456 (1.34%)

---

## 3. Findings
Although the physical count of registration cards is balanced (Gini = 0.1729), geographic bias is present due to **cropping specialization dominance**:
- The western region is heavily dominated by water-intensive cash crops like sugarcane.
- Central and eastern districts are dominated by cotton and soybean.
- Feeding location tags or coordinates into the prediction training set would cause decision tree splits to memorize geographic boundaries (e.g. Latitude splits), leaking location defaults instead of evaluating pure soil chemistry.
