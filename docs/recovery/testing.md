# Automated Verification & Testing Report (Phase 7.0)

Certification of verification assertions and the 210 golden scenarios testing suite.

---

## 1. Golden Scenario Permutations
Automated tests inside `backend/app/tests/test_golden_scenarios.py` verify 210 distinct agronomic input permutations:
- Covers all five districts (Pune, Satara, Kolhapur, Sangli, Solapur).
- Covers all seasons (Kharif, Rabi).
- Covers soil colors (Black, Red).
- Covers extreme climate and chemical anomalies (droughts $<300\text{mm}$, floods $>2000\text{mm}$, soil pH extremes $<4.5$ and $>9.0$, high/low NPK nutrient balances).

---

## 2. Test Execution Output
Run on the local test runner:
- **Scenarios verified**: 210 / 210 passed.
- **Failures/Errors**: 0.
- **Verification execution duration**: 86.5 seconds.
- **Core Assertions verified**: Probability summation, recommended/rejected mutual exclusivity, score range boundaries $[0, 1]$, and risk calibrations.
