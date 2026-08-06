# Decision Path Analysis (Feature Dominance)

Traces of decision paths for queries with high NPK but low rainfall (500mm):
1.  **Top Node Splits**: Trees split on `K > 82.5` or `Soil_Health_Score > 7.5` because these features yield massive information gain (high purity nodes).
2.  **Bypassed Rainfall Splits**: Once split on `K > 82.5`, the leaf node consists almost 100% of Sugarcane (and Grapes) samples.
3.  **Result**: The decision tree has no incentive to split on `Rainfall` further down the path. The model outputs "Sugarcane" without ever checking if the rainfall condition is satisfied!
