# Final Dataset Card (V5 Final Evolution)

This dataset card documents the final corpus dimensions, source registries, partitioning, and cleaning filters of the Krishi Sarathi V5 platform.

---

## 1. Dataset Dimensions & Inventory

| Data Asset | Path | File Format | Row Count | Target Status | License |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **Supervised Training Corpus**| [`data/processed/final_supervised_dataset.csv`](file:///d:/Techrush/data/processed/final_supervised_dataset.csv) | CSV | 2,200 | Labeled (22 Crops) | CC BY 4.0 |
| **Unlabelled GIS Database** | [`data/processed/final_unlabelled_dataset.csv`](file:///d:/Techrush/data/processed/final_unlabelled_dataset.csv) | CSV | 703,922 | Unlabeled | GODL India |
| **Data Manifest File** | [`data/processed/dataset_manifest.json`](file:///d:/Techrush/data/processed/dataset_manifest.json) | JSON | - | Metadata registry | CC BY 4.0 |

---

## 2. Supervised Partition Details
- **Balanced Class Distribution**: 22 crops (rice, maize, chickpea, kidneybeans, pigeonpeas, mothbeans, mungbean, blackgram, lentil, pomegranate, banana, mango, grapes, watermelon, muskmelon, apple, orange, papaya, coconut, cotton, jute, coffee).
- **Target Count**: Exactly 100 samples per crop class.
- **Shannon Entropy**: **4.4594 bits** (perfect theoretical maximum).
- **Imbalance Ratio**: **1.0** (zero concentration skew).
- **Missingness / Duplicates**: 0.00% missing values; 0.00% duplicates.

---

## 3. Unlabelled Database Cleaning Filters
Raw input health cards ($779,144$ records) were audited and filtered using physical constraints:
- **Anomalous Records Excluded (56,802 cases)**: Removed negative parameters, impossible pH, or extreme nutrient counts ($N > 200,000$, $K > 800,000$).
- **Exact Duplicates Removed (7,271 cases)**: Dropped duplicate submissions.
- **Final Unlabelled Count**: **703,922 records** representing the highest quality soil diagnostic database.
- **label_type designation**: All rows are explicitly labeled `label_type = unlabelled` to ensure no pseudo-labels are mixed with true observations.
