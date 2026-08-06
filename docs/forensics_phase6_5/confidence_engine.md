# Confidence Fusion Engine Specification


## Multi-Dimensional Score Fusion Math

The overall choice rank is determined using three independent scores:
1.  **Historical Similarity (ML)**: Weight `40%`.
2.  **Agronomic Suitability**: Weight `35%`. Calculates compliance across pH, Temperature, Rainfall, and NPK limits.
3.  **Regional Suitability**: Weight `25%`. Matches district crops lists (e.g. Sugarcane in Kolhapur, Sorghum in Solapur).

$$\text{Final Score} = \text{ML} \times 0.40 + \text{Agronomic} \times 0.35 + \text{Regional} \times 0.25 - \text{Risk Penalty}$$
