# Krishi Sarathi V5: The Final Pitch Story

This document maps out our final round presentation narrative, structured slide-by-slide.

---

## 1. Slide 1: The Challenger
- **Visual**: A slide showing "2,200 rows" versus "779,144 rows".
- **Script**: *"Judges will ask: 'How can we trust a crop suitability engine trained on only 2,200 observations?' Many teams simply merge everything and report 99% accuracy. We chose a different path: extreme data forensics."*

---

## 2. Slide 2: Forensics on the 7.9L Database
- **Visual**: Flowchart showing: 779k cards $\implies$ Unlabeled & Missing Weather $\implies$ ecological fallacy $\implies$ memorization leakage.
- **Script**: *"We re-audited approximately 7.9 lakh government Soil Health Cards. We found that the database is unlabelled, lacks climate parameters, and contains extreme anomalies. Joining crops using district-level averages represents spatial leakage, causing the model to split on boundaries instead of soil chemistry."*

---

## 3. Slide 3: The Decoupled Architecture
- **Visual**: Schematic of our two-layer intelligence engine:
  - Layer 1: Geography-blind Platt-calibrated ExtraTrees predictor.
  - Layer 2: Decoupled Maharashtra GIS Observatory.
- **Script**: *"We decoupled our platform. Our predictor remains trained on the clean, balanced dataset to guarantee location-blind suitability, while the 7.8 lakh records power our visual GIS map layers."*

---

## 4. Slide 4: Verification & Performance
- **Visual**: Benchmarking matrices showing our ExtraTrees accuracy (99.55%), Brier score (0.0162), and ECE (0.0708).
- **Script**: *"Our model was selected through multi-model benchmarking. Sigmoid Platt Scaling yields the lowest calibration error (0.0708), ensuring our suitabilities represent true agricultural suitability probabilities."*
