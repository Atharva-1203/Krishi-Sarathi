# Krishi Sarathi: Crop Label Feasibility Study

This document details the feasibility of joining crop outcomes to the unlabelled government soil database.

---

## 1. Primary Analysis Questions

### Does the 7.9L dataset contain crop labels?
**No.** The government Soil Health Card database contains only soil physical chemistry measurements and geographic identifiers.

### Can crop labels be joined from another source?
**Only at macro resolutions (District level).** District crop dominance tables can be merged, but individual farm-level crop outcomes are unavailable.

---

## 2. Ecological Fallacy & Location Leakage
If we assign crop labels based on district-level agricultural statistics (e.g. Pune grows sugarcane, so label all Pune soil cards as Sugarcane), we commit an **ecological fallacy**. 

In reality:
- Soil profiles vary significantly within a single district.
- Farmers cultivate diverse food crops (Wheat, Jowar) on different soil qualities.
- Forcing a default label causes the model to split nodes on geographic boundaries (e.g. Latitude $< 18.5$) to predict Sugarcane, which completely destroys general agronomic suitability checks.

---

## 3. Temporal Compatibility Limits
Soil parameters change dynamically over seasons and years due to fertilizer applications and crop nutrient extraction. 
- A soil test recorded in **Cycle 1 (2015-17)** cannot be paired with a crop harvested in **2024** because the soil chemistry is no longer the same.
- Pairings are only valid when soil testing and crop cultivation are documented on the **same farm plot during the same season**.
