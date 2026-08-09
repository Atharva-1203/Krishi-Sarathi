# Krishi Sarathi: Maharashtra Map & Regional Intelligence

This report details the regional Agricultural Intelligence Map layers.

---

## 1. Soil Quality Index (SQI) Formulation
We display district soil ratings on the SVG map using a weighted Soil Quality Index:
$$\text{SQI} = w_1 \cdot \text{pH}_{\text{score}} + w_2 \cdot \text{OC}_{\text{score}} + w_3 \cdot \text{EC}_{\text{score}} + w_4 \cdot \text{NPK}_{\text{score}}$$
- **Weights**: Balanced equally at $0.25$ each.
- **pH Score**: Evaluates absolute deviation from neutral pH ($7.0$).
- **OC Score**: Maps Organic Carbon presence.
- **NPK Score**: Evaluates Nitrogen, Phosphorus, and Potassium ratios.

---

## 2. Choropleth Map Visualizations
The frontend interactive SVG map exposes district filters for:
- **Macronutrients**: Average Nitrogen, Phosphorus, Potassium values.
- **Rainfall anomalies**: Compares annual rainfall to historical normals to flag deficit zones.
- **Crop Diversity**: Evaluates crop concentration using Shannon Entropy and HHI coefficients to highlight monoculture risks.

---

## 3. Strict Database Separation Proof
The map utilizes `district_soil_data.json` to populate SVGs. The prediction endpoint `/api/v3/predict` restricts inputs strictly to 7 parameters and has no variables for coordinates or location name.
