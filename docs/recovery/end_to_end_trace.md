# End-to-End Prediction Pipeline Trace Report (Phase 7.0)

A step-by-step trace of a live recommendation request illustrating transaction states, feature changes, and scoring evaluations.

---

## 1. Raw User Input (stage1_validation.json)
- **District**: Solapur
- **Growing Season**: Rabi
- **Soil Color**: Red
- **Soil parameters**: $N=188.0$, $P=99.0$, $K=277.0$, $\text{pH}=5.5$, $\text{Temp}=30.0$, $\text{Rainfall}=1635.0$, $\text{OC}=0.8$

---

## 2. Preprocessing & Medians Imputation (stage2_preprocessing.json)
- Checks district boundary validity.
- Fetches Solapur defaults: $\text{OC}=0.45$, $\text{EC}=0.32$, $B=0.16$, $\text{Fe}=1.56$, $\text{Mn}=1.56$, $\text{Cu}=0.58$, $\text{Zn}=0.5$, $S=7.05$.
- Imputes missing micronutrients dynamically into the active query object.

---

## 3. Dynamic Feature Calculations (stage3_features.json)
- Calculates organic carbon class: **High** (since $\text{OC} = 0.8 \ge 0.6$).
- Calculates NPK ratios: $\text{N\_P\_Ratio} = 1.90$, $\text{N\_K\_Ratio} = 0.68$, $\text{P\_K\_Ratio} = 0.36$.
- Calculates normal rainfall deviation: $\text{Rainfall\_Deviation} = 2.40$ (rainfall $1635.0$ vs normal $481.1$).
- Calculates soil health score: **8.0 / 10.0** (pH acidic penalty applied).

---

## 4. ML Model Prediction (stage4_model.json)
- Transformed dataframe is passed to ExtraTrees.
- Class probabilities resolved:
  - **Wheat**: $P = 0.51$
  - **Sugarcane**: $P = 0.22$
  - **Rice**: $P = 0.12$

---

## 5. Agronomic & Regional validations (stage5, stage6)
- **Agronomic validator**: Wheat growth constraints evaluated (Ideal: Temp $12-25^{\circ}\text{C}$, Rain $600-1200\text{mm}$, pH $6.0-7.5$).
  - Rainfall check: **FAIL** (Rain $1635\text{mm} > 1200\text{mm}$).
  - Temperature check: **FAIL** (Temp $30^{\circ}\text{C} > 25^{\circ}\text{C}$).
  - Soil pH check: **FAIL** (pH $5.5 < 6.0$).
  - Nutrient N, P, K checks: **PASS**.
  - *Agronomic Score*: $0.35$ (weighted sum).
- **Regional validator**: Cross-checks Wheat against Solapur crop history expectations (includes Sorghum, Pigeonpea, Groundnut).
  - *Regional Suitability Score*: $0.60$ (non-native flag).

---

## 6. Risk Engine & Fusion Score Card (stage7, stage8)
- **Risk penalties**: Rainfall mismatch ($+0.15$), Temp mismatch ($+0.05$), pH mismatch ($+0.05$).
  - *Total Penalty*: $0.25$.
  - *Risk Level*: **High**.
- **Blended final score**:
  - $\text{Final Score} = 0.51 \times 0.40 + 0.35 \times 0.35 + 0.60 \times 0.25 - 0.25 = 0.23$ (clamped).
  - *Decision Type*: **Not Recommended** (stars: `★☆☆☆☆ Weak`).

---

## 7. Consistency Checks & Frontend serialization (stage9, stage10)
- Asserts recommended $\cap$ not recommended empty.
- Serializes complete payload to API JSON response. Next.js gauges, action lists, and disclaimers render these values directly.
