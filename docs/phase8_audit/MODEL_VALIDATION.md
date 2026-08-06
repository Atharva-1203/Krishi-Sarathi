# Model Validation

All figures below evaluate the deployed feature-construction path on stored
test labels, not direct stored-row preprocessing.

| Metric | Result |
|---|---:|
| Accuracy / micro F1 | 0.789357 |
| Macro F1 | 0.746303 |
| Balanced accuracy | 0.812500 |
| MCC | 0.783470 |
| Log loss | 0.860913 |
| Multiclass Brier | 0.273282 |
| ECE (10 bins) | 0.109712 |
| Top-3 accuracy | 0.869180 |
| Mean prediction entropy | 0.729780 bits |

The forest has 100 trees. Highest impurity importances are K (9.82%), N
(8.72%), Rainfall (5.62%), Humidity (5.55%), P/K ratio (5.14%), and N/K ratio
(5.02%). Rainfall appears at the root of 7 trees; pH importance is 1.60%.
