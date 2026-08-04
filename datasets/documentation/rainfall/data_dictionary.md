# Rainfall Data Dictionary

This dictionary defines variables inside the compiled `district_season_rainfall.csv` database.

| Column Name | Description | Unit | Datatype | Allowed Values / Range | Importance in ML |
|-------------|-------------|------|----------|------------------------|------------------|
| **Division** | Administrative division of Maharashtra | - | String | Konkan, Nashik, Pune, Chhatrapati Sambhajinagar, Amravati, Nagpur | Groups geographic regions with similar weather patterns |
| **District** | Standard English name of the district | - | String | 34 agricultural districts of Maharashtra | Primary spatial key for joining with soil/crop databases |
| **Year** | The calendar year of the observation | - | Integer | 2015 to 2025 | Primary temporal key for historical trend analysis |
| **Season** | Climatic season representing the observation | - | String | Monsoon | Contextualizes crop growth phase (e.g. Kharif) |
| **Actual_Rainfall**| Total accumulated rainfall recorded | mm | Float | 0.0 to 5000.0 | Core numeric input feature for crop water requirement |
| **Normal_Rainfall**| Long-term historical average rainfall | mm | Float | 0.0 to 4000.0 | Baseline reference for drought or excess detection |
| **Departure** | Actual Rainfall minus Normal Rainfall | mm | Float | -2000.0 to 2000.0 | Quantifies absolute water surplus/deficit |
| **Departure_Percentage** | Percentage deviation from normal | % | Float | -100.0% to 500.0% | Normalizes departure across dry vs wet districts |
| **Classification** | IMD rainfall category | - | String | Large Excess, Excess, Normal, Deficit, Large Deficit, No Rain | Categorical feature representing hydrological state |
| **June_Normal** | Normal rainfall for June | mm | Float | >= 0.0 | Monthly crop planting weather baseline |
| **June_Actual** | Actual rainfall recorded in June | mm | Float | >= 0.0 | Indicated arrival strength of the monsoon |
| **June_Percentage**| Percentage of normal for June | % | Float | >= 0.0 | Early season moisture index |
| **July_Normal** | Normal rainfall for July | mm | Float | >= 0.0 | Peak vegetative growth weather baseline |
| **July_Actual** | Actual rainfall recorded in July | mm | Float | >= 0.0 | Determines mid-season waterlogging/irrigation need |
| **July_Percentage**| Percentage of normal for July | % | Float | >= 0.0 | Mid-season moisture index |
| **August_Normal** | Normal rainfall for August | mm | Float | >= 0.0 | Late vegetative/flowering weather baseline |
| **August_Actual** | Actual rainfall recorded in August | mm | Float | >= 0.0 | Critical for crop yield determination |
| **August_Percentage**| Percentage of normal for August | % | Float | >= 0.0 | Late-season moisture index |
| **September_Normal**| Normal rainfall for September | mm | Float | >= 0.0 | Harvest phase weather baseline |
| **September_Actual**| Actual rainfall recorded in September | mm | Float | >= 0.0 | Affects crop quality and soil moisture recharge |
| **September_Percentage**| Percentage of normal for September | % | Float | >= 0.0 | Late-monsoon moisture index |
| **Source** | Originating portal of the dataset | - | String | Maharain Portal | Verifiability and lineage tracking |
