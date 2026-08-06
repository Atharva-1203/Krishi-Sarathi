# Root Cause

## Certified finding

Sugarcane dominance is caused by a training-serving mismatch and out-of-
distribution serving domain, not by a hardcoded top-crop selection.

The stored-test model path has 99.78% accuracy. Applying the production
feature builder to those same labelled test inputs reduces accuracy to 78.94%.
The public frontend permits inputs well outside training support (for example,
K 0-500 versus training K 5-150; rainfall 100-3000 versus training 300-1700).

In deterministic 10,000-input simulations matching the frontend fields and
bounds, Sugarcane was top-1 for 74.67% of inputs. Under the wider API-valid
domain it was top-1 for 85.57%.

Confidence: 96%.
