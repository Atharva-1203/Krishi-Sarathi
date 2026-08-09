# Government Database Crop Label Feasibility (7.9L)

This document evaluates whether crop suitability labels can be joined or derived for the unlabelled government soil database.

---

## 1. Primary Analysis Questions

### Does the 7.9L database contain crop suitability targets?
**No.** The government Soil Health Card database records only soil chemistry parameters ($N, P, K$, pH, micronutrients) and geographic bounds. It contains zero labels regarding what crop was successfully grown or is suited for those soils.

### Can crop labels be joined from external databases?
**Only at administrative resolutions (District/Taluka).** District crop yield tables can be joined, but farm-level crop outcomes are unavailable.

---

## 2. Ecological Fallacy & Leakage Risks
Assigning labels based on district-level averages (e.g. labeling all soil records in Satara as Sugarcane because it is the dominant regional crop) commits an **ecological fallacy**. 

In reality:
- Soil parameters vary significantly across farms in a single taluka.
- A model trained on these labels will split nodes on administrative boundaries (e.g. Latitude) rather than agronomic limits, leading to geographic leakage.

---

## 3. Temporal Mismatches
Soil chemistry parameters are highly dynamic and shift due to seasonal fertilization and crop extraction. 
- Matching a soil card from **Cycle 1 (2015-17)** with crop production data from **2024** is temporally invalid because the soil parameters are no longer the same.
- Recommendations are valid only when soil parameters and crop outcomes are recorded on the **same farm plot during the same season**.
