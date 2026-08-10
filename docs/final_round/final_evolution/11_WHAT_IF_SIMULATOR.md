# What-If Agriculture Simulator (V5 Final Evolution)

This document details the design and testing of the interactive parameter sensitivity simulator.

---

## 1. Interactive Scenario Adjustments
The simulator allows farmers to perturb their baseline measurements (such as increasing rainfall by $20\%$ or lowering pH by $0.5$ units) and immediately re-evaluate the crop suitability list.

---

## 2. Sensitivity Highlighting
For every prediction, the simulator evaluates the gradient $\frac{\partial \text{Probability}}{\partial \text{Feature}}$ by running minor batch perturbations. It highlights the **most sensitive feature** (typically rainfall or pH) to alert the farmer that minor variations in this parameter will result in different crop recommendations.
