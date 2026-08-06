# Scientific Multi-Factor Risk Engine


## Risk Penalty Deductions

Risk is computed dynamically based on the sum of penalty scores:
- **Rainfall Deviation**: $+0.15$
- **Temperature Deviation**: $+0.05$
- **pH Mismatch**: $+0.05$
- **NPK Deficit**: $+0.05$

### Risk Classes:
- $\le 0.0$: Very Low
- $\le 0.10$: Low
- $\le 0.20$: Moderate
- $\ge 0.30$: Critical
