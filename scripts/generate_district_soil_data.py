import os
import sys
import json
import pandas as pd
import numpy as np

print("=== STARTING DISTRICT DATA AGGREGATION ===")

# Paths
soil_csv = r"datasets/processed/soil_health/soil_health_database.csv"
output_json = r"frontend/public/maps/district_soil_data.json"

if not os.path.exists(soil_csv):
    print(f"Error: Soil health database not found at {soil_csv}")
    sys.exit(1)

# Read dataset
print("Loading 7.8 lakh records...")
df = pd.read_csv(soil_csv)

# Clean District names to match geojson names
# (e.g. AHILYANAGAR is Ahmednagar, DHARASHIV is Dharashiv, etc.)
district_mapping = {
    "AHILYANAGAR": "Ahmednagar",
    "AKOLA": "Akola",
    "AMRAVATI": "Amravati",
    "BEED": "Beed",
    "BHANDARA": "Bhandara",
    "BULDHANA": "Buldhana",
    "CHANDRAPUR": "Chandrapur",
    "CHHATRAPATI SAMBHAJINAGAR": "Chhatrapati Sambhajinagar",
    "DHARASHIV": "Dharashiv",
    "DHULE": "Dhule",
    "GADCHIROLI": "Gadchiroli",
    "GONDIA": "Gondia",
    "HINGOLI": "Hingoli",
    "JALGAON": "Jalgaon",
    "JALNA": "Jalna",
    "KOLHAPUR": "Kolhapur",
    "LATUR": "Latur",
    "NAGPUR": "Nagpur",
    "NANDED": "Nanded",
    "NANDURBAR": "Nandurbar",
    "NASHIK": "Nashik",
    "PALGHAR": "Palghar",
    "PUNE": "Pune",
    "RAIGAD": "Raigad",
    "RATNAGIRI": "Ratnagiri",
    "SANGLI": "Sangli",
    "SATARA": "Satara",
    "SINDHUDURG": "Sindhudurg",
    "SOLAPUR": "Solapur",
    "THANE": "Thane",
    "WARDHA": "Wardha",
    "WASHIM": "Washim",
    "YAVATMAL": "Yavatmal"
}

df["Clean_District"] = df["District"].str.strip().str.upper().map(district_mapping)

# Drop rows where district is not mapped
df = df.dropna(subset=["Clean_District"])

print("Aggregating metrics...")
# Group by Clean_District and compute means
agg = df.groupby("Clean_District")[["N", "P", "K", "pH", "OC", "EC"]].mean()

# Calculate a Soil Quality Score (0 to 100) based on standard agronomic targets:
# - pH near 6.5 is optimal
# - Organic Carbon (OC) >= 0.8% is optimal
# - N, P, K in adequate levels
pH_score = 100 - (abs(agg["pH"] - 6.5) * 15)
pH_score = np.clip(pH_score, 0, 100)

OC_score = (agg["OC"] / 1.5) * 100
OC_score = np.clip(OC_score, 0, 100)

N_score = (agg["N"] / 280) * 100
N_score = np.clip(N_score, 0, 100)

P_score = (agg["P"] / 22) * 100
P_score = np.clip(P_score, 0, 100)

K_score = (agg["K"] / 300) * 100
K_score = np.clip(K_score, 0, 100)

sqi = (pH_score * 0.25 + OC_score * 0.25 + N_score * 0.15 + P_score * 0.15 + K_score * 0.20)

agg["Soil_Quality_Index"] = sqi.round(1)

# Format as JSON dictionary
json_data = {}
for district, row in agg.iterrows():
    json_data[district] = {
        "N": round(float(row["N"]), 1),
        "P": round(float(row["P"]), 1),
        "K": round(float(row["K"]), 1),
        "pH": round(float(row["pH"]), 2),
        "OC": round(float(row["OC"]), 2),
        "EC": round(float(row["EC"]), 2),
        "soil_quality_index": round(float(row["Soil_Quality_Index"]), 1),
        "sample_count": int(df[df["Clean_District"] == district].shape[0])
    }

# Save file
os.makedirs(os.path.dirname(output_json), exist_ok=True)
with open(output_json, "w", encoding="utf-8") as f:
    json.dump(json_data, f, indent=2)

print(f"District soil data successfully exported to {output_json}")
print(f"Total districts aggregated: {len(json_data)}")
