# 💰 Profit-First Decision Engine Specification

## Decoupled Architecture
The Profit-First Engine (`economic_engine.py`) operates as an independent decision-support layer on top of ML crop recommendations:

$$\text{Expected Revenue (₹)} = \text{Yield (q/ha)} \times \text{Farm Area (ha)} \times \text{Market Price (₹/q)}$$
$$\text{Cultivation Cost (₹)} = \text{Cost per Hectare (₹/ha)} \times \text{Farm Area (ha)}$$
$$\text{Expected Net Profit (₹)} = \text{Expected Revenue} - \text{Cultivation Cost}$$
$$\text{Combined Risk Score} = 0.50 \times \text{Climate Risk} + 0.50 \times \text{Price Volatility}$$
$$\text{Risk-Adjusted Return (₹)} = \text{Expected Net Profit} \times (1.0 - \text{Combined Risk Score})$$

## Overall Economic Signal Badges
- **Strong 🟢**: Risk-adjusted profit $> 0$ and combined risk $\le 0.30$.
- **Moderate 🟡**: Combined risk $0.30 - 0.45$.
- **Risky 🟠**: High water demand under rainfed conditions or combined risk $> 0.45$.
