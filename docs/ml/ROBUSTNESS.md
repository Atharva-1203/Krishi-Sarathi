# 🛡️ Model Safety, OOD & Robustness

## 1. Input Boundary Safeguards
Requests are validated before inference against physical and biological bounds:
- $N \in [0, 300]$ kg/ha
- $P \in [0, 300]$ kg/ha
- $K \in [0, 300]$ kg/ha
- Temperature $\in [0, 60]$ °C
- Humidity $\in [0, 100]$ %
- pH $\in [2.0, 12.0]$
- Rainfall $\in [0, 4000]$ mm

## 2. Out-of-Distribution (OOD) Detection
- Inputs outside the 1st-99th percentile range of training distributions trigger **CAUTION** alerts.
- Inputs outside absolute training bounds trigger **OUT_OF_DISTRIBUTION** alerts with warning callouts.

## 3. Uncertainty Quantification (Prediction Entropy)
- Prediction entropy ($H = -\sum p_i \log_2 p_i$) measures decision uncertainty.
- $H < 1.0$ bit: Strong Model Consensus (High Confidence)
- $H \ge 2.0$ bits: Distributed Uncertainty (Low Confidence)
