# Soil Feature Relevance to ML Crop Recommendation

Every soil attribute from the BHOOMI Geoportal contributes directly to the crop recommendation system:

| Soil Attribute | Direct ML Feature | Impact on Crop Recommendation |
|----------------|-------------------|--------------------------------|
| **Soil pH** | Input Feature | Constrains nutrient availability. Strongly acidic soils (<5.0) restrict wheat and sugarcane but suit potato and tea. Alkaline soils (>8.0) lock down Phosphorus and iron. |
| **Soil Depth** | Input Feature (Constraint) | Determines root anchorage volume. Shallow soils (<25 cm) cannot support tap-rooted perennial crops (fruit orchards) but are suited for shallow-rooted pulses. |
| **Soil Texture** | Input Feature | Determines water holding capacity and porosity. Clayey soils (Vertisols) retain moisture, making them excellent for rainfed cotton and sorghum, but poor for potato (requires loose loamy soil). |
| **Soil Drainage** | Input Feature / Constraint | Poorly drained soils cause waterlogging, killing cotton and maize, but are ideal for wetland paddy. Well-drained soils are mandatory for citrus and grapes. |
| **Slope** | Input Feature (Spatial) | Steeper slopes (>8%) suffer high erosion and run-off; water demands increase. Terraced or contour crops (millet, grass) are recommended. |
| **Salinity / Sodicity**| Input Feature / Constraint | High sodicity disperses clay particles, creating massive structures that roots cannot penetrate. Limits crop options to sodic-tolerant species (Barley, Cotton). |
| **Calcareousness** | Input Feature / Constraint | Highly calcareous soils buffer pH to alkaline ranges, requiring iron chelates and Phosphorus-solubilizing microbes. Limits yields for acid-tolerant crops. |
