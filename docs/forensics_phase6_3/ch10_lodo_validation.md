# Chapter 10: Leave-One-District-Out Validation

We evaluated generalization by holding out one district at a time:
- **Kolhapur held out**: Test Accuracy = 47.69%
- **Solapur held out**: Test Accuracy = 33.66%
- **Satara held out**: Test Accuracy = 51.00%
- **Sangli held out**: Test Accuracy = 28.09%
- **Pune held out**: Test Accuracy = 71.19%

### Analysis:
Soil characteristics are highly clustered by district (Kolhapur is wet and organic-dense; Solapur is dry and low-carbon). The model cannot generalize to Kolhapur if it has never seen Kolhapur's specific soil chemistry range. This confirms feature distribution shift.
