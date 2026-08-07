import os
import json
import numpy as np
import pandas as pd

# Paths
dataset_path = r"d:\Techrush\ml\datasets\v3\dataset.csv"
model_dir = r"d:\Techrush\ml\models\v3"
backend_v3_dir = r"d:\Techrush\backend\app\ml\v3"

os.makedirs(model_dir, exist_ok=True)
os.makedirs(backend_v3_dir, exist_ok=True)

df = pd.read_csv(dataset_path)

# 1. Calculate Empirical Profiles
features = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]
crop_profiles = {}

crops = df["label"].unique()
for crop in crops:
    crop_df = df[df["label"] == crop]
    crop_profiles[crop] = {}
    for feat in features:
        series = crop_df[feat]
        q1 = float(np.percentile(series, 25))
        q3 = float(np.percentile(series, 75))
        iqr = q3 - q1
        p10 = float(np.percentile(series, 10))
        p90 = float(np.percentile(series, 90))
        
        crop_profiles[crop][feat] = {
            "min": float(series.min()),
            "max": float(series.max()),
            "mean": float(series.mean()),
            "median": float(series.median()),
            "std": float(series.std()),
            "q1": q1,
            "q3": q3,
            "iqr": iqr if iqr > 0 else 1e-5,
            "p10": p10,
            "p90": p90
        }

# Save Crop Profiles
for out_dir in [model_dir, backend_v3_dir]:
    with open(os.path.join(out_dir, "crop_profiles.json"), "w", encoding="utf-8") as f:
        json.dump(crop_profiles, f, indent=2)

# 2. Build Crop Taxonomy Metadata
metadata_taxonomy = [
  {
    "crop": "rice",
    "category": "Cereals / Grains",
    "scientific_name": "Oryza sativa",
    "description": "Rice is a staple food grain grown in standing water, demanding high heat and moisture.",
    "primary_parameters": ["rainfall", "humidity"],
    "water_demand": "Very High",
    "soil_preference": "Clayey, alluvial soils",
    "temperature_preference": "20°C - 27°C",
    "rainfall_preference": "1500mm - 3000mm",
    "growing_notes": "Requires standing water during transplanting. High nitrogen input increases grain weight."
  },
  {
    "crop": "maize",
    "category": "Cereals / Grains",
    "scientific_name": "Zea mays",
    "description": "Maize (corn) is a versatile grain used as food, livestock feed, and industrial starch.",
    "primary_parameters": ["temperature", "N"],
    "water_demand": "Moderate",
    "soil_preference": "Loamy, well-drained soils",
    "temperature_preference": "21°C - 27°C",
    "rainfall_preference": "500mm - 1000mm",
    "growing_notes": "Very sensitive to waterlogging. Demands high nitrogen availability at early growth stages."
  },
  {
    "crop": "chickpea",
    "category": "Pulses",
    "scientific_name": "Cicer arietinum",
    "description": "Chickpea is a high-protein pulse crop grown primarily during cool, dry seasons.",
    "primary_parameters": ["K", "humidity", "temperature"],
    "water_demand": "Low",
    "soil_preference": "Silty clay loam, well-drained",
    "temperature_preference": "15°C - 25°C",
    "rainfall_preference": "600mm - 1000mm",
    "growing_notes": "Grown as a Rabi crop in India. Root nodules fix atmospheric nitrogen, reducing N fertilizer demand."
  },
  {
    "crop": "kidneybeans",
    "category": "Pulses",
    "scientific_name": "Phaseolus vulgaris",
    "description": "Kidney bean (Rajma) is a highly nutritious legume crop popular in northern agricultural climates.",
    "primary_parameters": ["P", "humidity"],
    "water_demand": "Moderate",
    "soil_preference": "Deep, loose, loamy soils",
    "temperature_preference": "15°C - 25°C",
    "rainfall_preference": "600mm - 1200mm",
    "growing_notes": "Requires steady phosphorus inputs for root establishment. Susceptible to frost."
  },
  {
    "crop": "pigeonpeas",
    "category": "Pulses",
    "scientific_name": "Cajanus cajan",
    "description": "Pigeon pea (Arhar/Tur) is a semi-arid pulse crop providing stable food and soil nitrogen.",
    "primary_parameters": ["ph", "temperature"],
    "water_demand": "Low",
    "soil_preference": "Sandy loam, well-drained",
    "temperature_preference": "20°C - 35°C",
    "rainfall_preference": "600mm - 1000mm",
    "growing_notes": "Highly drought-tolerant due to a deep taproot system. Vulnerable to waterlogging."
  },
  {
    "crop": "mothbeans",
    "category": "Pulses",
    "scientific_name": "Vigna aconitifolia",
    "description": "Moth bean is an extremely drought-resistant pulse crop grown in dryland agriculture.",
    "primary_parameters": ["humidity", "rainfall"],
    "water_demand": "Very Low",
    "soil_preference": "Light sandy soil",
    "temperature_preference": "25°C - 35°C",
    "rainfall_preference": "500mm - 750mm",
    "growing_notes": "Grown in low rainfall areas. Helps prevent soil erosion due to its spreading habit."
  },
  {
    "crop": "mungbean",
    "category": "Pulses",
    "scientific_name": "Vigna radiata",
    "description": "Mung bean (Green gram) is a short-duration pulse crop grown during warm weather cycles.",
    "primary_parameters": ["humidity", "temperature"],
    "water_demand": "Low",
    "soil_preference": "Well-aerated loamy soils",
    "temperature_preference": "25°C - 35°C",
    "rainfall_preference": "600mm - 900mm",
    "growing_notes": "Can be intercropped with sugarcane or cotton due to its quick 60-day lifecycle."
  },
  {
    "crop": "blackgram",
    "category": "Pulses",
    "scientific_name": "Vigna mungo",
    "description": "Black gram (Urad bean) is a staple pulse crop grown extensively in tropical monsoon regions.",
    "primary_parameters": ["N", "ph"],
    "water_demand": "Low to Moderate",
    "soil_preference": "Deep black cotton soil",
    "temperature_preference": "25°C - 35°C",
    "rainfall_preference": "600mm - 1000mm",
    "growing_notes": "Tolerates higher soil density and clay content than mung bean."
  },
  {
    "crop": "lentil",
    "category": "Pulses",
    "scientific_name": "Lens culinaris",
    "description": "Lentil is a cool-season pulse crop valued for its nutritional profile and soil-enriching traits.",
    "primary_parameters": ["P", "temperature"],
    "water_demand": "Low",
    "soil_preference": "Loamy to clayey soil, neutral pH",
    "temperature_preference": "15°C - 25°C",
    "rainfall_preference": "500mm - 800mm",
    "growing_notes": "Exhibits excellent cold tolerance. Heavy rain during flowering reduces pod setting."
  },
  {
    "crop": "pomegranate",
    "category": "Fruits",
    "scientific_name": "Punica granatum",
    "description": "Pomegranate is a high-value shrub crop producing premium antioxidant-rich fruits.",
    "primary_parameters": ["K", "rainfall"],
    "water_demand": "Moderate",
    "soil_preference": "Deep loamy soils, slightly alkaline",
    "temperature_preference": "25°C - 35°C",
    "rainfall_preference": "500mm - 800mm",
    "growing_notes": "Responsive to potassium fertigation for skin quality and size. Withstands dry dry spells."
  },
  {
    "crop": "banana",
    "category": "Fruits",
    "scientific_name": "Musa acuminata",
    "description": "Banana is a large herbaceous plant yielding staple fruit, requiring year-round warmth and water.",
    "primary_parameters": ["K", "rainfall", "humidity"],
    "water_demand": "High",
    "soil_preference": "Rich organic loams",
    "temperature_preference": "20°C - 30°C",
    "rainfall_preference": "1500mm - 2500mm",
    "growing_notes": "Requires heavy potassium application and wind shelters due to shallow root system."
  },
  {
    "crop": "mango",
    "category": "Fruits",
    "scientific_name": "Mangifera indica",
    "description": "Mango is a long-lived tropical evergreen tree producing the sweet commercial king of fruits.",
    "primary_parameters": ["ph", "temperature"],
    "water_demand": "Moderate",
    "soil_preference": "Deep, well-drained, sandy loam",
    "temperature_preference": "24°C - 35°C",
    "rainfall_preference": "750mm - 2500mm",
    "growing_notes": "Requires a dry hot spell before flowering. Waterlogging causes root decay and fruit drop."
  },
  {
    "crop": "grapes",
    "category": "Fruits",
    "scientific_name": "Vitis vinifera",
    "description": "Grape is a woody vine crop grown for table fruit, juice, raisins, and wine production.",
    "primary_parameters": ["K", "ph"],
    "water_demand": "Moderate",
    "soil_preference": "Gravelly or sandy clay loam",
    "temperature_preference": "15°C - 35°C",
    "rainfall_preference": "500mm - 900mm",
    "growing_notes": "Needs rigorous trellis support. Heavy rain during ripening splits grapes and causes fungal diseases."
  },
  {
    "crop": "watermelon",
    "category": "Fruits",
    "scientific_name": "Citrullus lanatus",
    "description": "Watermelon is a warm-season spreading vine crop yielding sweet, high-water content fruit.",
    "primary_parameters": ["humidity", "rainfall"],
    "water_demand": "Low to Moderate",
    "soil_preference": "Well-drained sandy soils",
    "temperature_preference": "22°C - 35°C",
    "rainfall_preference": "400mm - 800mm",
    "growing_notes": "Grown extensively on riverbeds. Dry, sunny days enhance fruit sugar accumulation."
  },
  {
    "crop": "muskmelon",
    "category": "Fruits",
    "scientific_name": "Cucumis melo",
    "description": "Muskmelon is a highly aromatic warm-season fruit vine suitable for warm riverbeds.",
    "primary_parameters": ["temperature", "humidity"],
    "water_demand": "Low to Moderate",
    "soil_preference": "Sandy loam, well-drained",
    "temperature_preference": "22°C - 32°C",
    "rainfall_preference": "500mm - 800mm",
    "growing_notes": "Sensitive to acidic soils. Excellent performance under drip irrigation systems."
  },
  {
    "crop": "apple",
    "category": "Fruits",
    "scientific_name": "Malus domestica",
    "description": "Apple is a temperate deciduous tree crop requiring winter chilling to set high-quality fruit.",
    "primary_parameters": ["temperature", "humidity"],
    "water_demand": "Moderate",
    "soil_preference": "Loamy soil, slightly acidic",
    "temperature_preference": "10°C - 24°C",
    "rainfall_preference": "800mm - 1200mm",
    "growing_notes": "Requires high chilling hours (below 7°C). Not suitable for plain tropical regions."
  },
  {
    "crop": "orange",
    "category": "Fruits",
    "scientific_name": "Citrus sinensis",
    "description": "Orange is a commercial citrus fruit tree demanding sub-tropical environments with dry spells.",
    "primary_parameters": ["K", "rainfall"],
    "water_demand": "Moderate",
    "soil_preference": "Sandy clay loam, well-drained",
    "temperature_preference": "15°C - 32°C",
    "rainfall_preference": "1000mm - 1500mm",
    "growing_notes": "Requires iron and zinc micronutrient sprays. Dry spell triggers flowering (Bahar treatment)."
  },
  {
    "crop": "papaya",
    "category": "Fruits",
    "scientific_name": "Carica papaya",
    "description": "Papaya is a fast-growing tropical herbaceous plant yielding latex and sweet melon-like fruit.",
    "primary_parameters": ["N", "P", "K"],
    "water_demand": "Moderate",
    "soil_preference": "Alluvial loams with perfect drainage",
    "temperature_preference": "21°C - 33°C",
    "rainfall_preference": "1000mm - 1800mm",
    "growing_notes": "Very susceptible to collar rot and root damage under waterlogging. Demands balanced NPK."
  },
  {
    "crop": "coconut",
    "category": "Cash / Plantation Crops",
    "scientific_name": "Cocos nucifera",
    "description": "Coconut is a tall monocot palm crop grown for its oil, fiber, edible kernel, and juice.",
    "primary_parameters": ["rainfall", "humidity"],
    "water_demand": "High",
    "soil_preference": "Coastal sandy soils, salt-tolerant",
    "temperature_preference": "22°C - 32°C",
    "rainfall_preference": "1500mm - 2500mm",
    "growing_notes": "Salt-tolerant and thrives in tropical coastlines with constant groundwater movement."
  },
  {
    "crop": "coffee",
    "category": "Cash / Plantation Crops",
    "scientific_name": "Coffea arabica",
    "description": "Coffee is an upland plantation crop producing beans for the global beverage market.",
    "primary_parameters": ["N", "ph", "rainfall"],
    "water_demand": "High",
    "soil_preference": "Deep, organic-rich forest loams",
    "temperature_preference": "15°C - 26°C",
    "rainfall_preference": "1200mm - 2000mm",
    "growing_notes": "Grown under shade trees to prevent leaf scorch. Needs wet warm periods and dry harvesting times."
  },
  {
    "crop": "jute",
    "category": "Fiber Crops",
    "scientific_name": "Corchorus olitorius",
    "description": "Jute is a tall, soft fiber crop grown in humid delta regions, yielding natural golden fibers.",
    "primary_parameters": ["rainfall", "humidity", "temperature"],
    "water_demand": "Very High",
    "soil_preference": "Clayey delta silts",
    "temperature_preference": "24°C - 37°C",
    "rainfall_preference": "1500mm - 2500mm",
    "growing_notes": "Requires standing water for fiber retting. Tolerates flood conditions at mature stages."
  },
  {
    "crop": "cotton",
    "category": "Fiber Crops",
    "scientific_name": "Gossypium hirsutum",
    "description": "Cotton is a major cash fiber crop that supplies the global textile spinning industry.",
    "primary_parameters": ["N", "ph", "K"],
    "water_demand": "Moderate",
    "soil_preference": "Deep black soils (Regur)",
    "temperature_preference": "21°C - 30°C",
    "rainfall_preference": "500mm - 1100mm",
    "growing_notes": "Demands dry weather during boll opening to prevent staining. Excellent performance in black clay."
  }
]

# Save Metadata Taxonomy
for out_dir in [model_dir, backend_v3_dir]:
    with open(os.path.join(out_dir, "crop_metadata.json"), "w", encoding="utf-8") as f:
        json.dump(metadata_taxonomy, f, indent=2)

print("Crop profiles and metadata generated successfully in both locations.")
