# Pipeline Parity

## Method

1,000 master-dataset rows were sampled with random seed `20260806`. Path A
used the stored row and serialized preprocessor. Path B converted the same row
to the public API fields and applied the exact serving feature construction
before using that same serialized preprocessor and model.

## Results

| Measure | Result |
|---|---:|
| Exact scaled-feature cell agreement | 94.4973% |
| Fully identical 37-feature vectors | 11 / 1,000 |
| Top-1 prediction agreement | 80.0% |
| Mean probability L1 difference | 0.4718 |
| Maximum single-class probability difference | 1.0 |

The only changed scaled features were Humidity, Soil_Health_Score,
Growing_Season_Kharif, and Growing_Season_Rabi. This certifies that training
and serving are not feature-parity equivalent.
